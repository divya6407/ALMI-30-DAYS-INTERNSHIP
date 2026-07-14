import { Router } from "express";
import Article from "../models/Article.js";
import { generateArticle } from "../services/gemini.js";
import { fetchWikipediaContext } from "../services/wikipedia.js";

const router = Router();

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * GET /api/articles/search?topic=Atlantis&category=Mythology
 * Core flow from PRD section 5.5 / section 7:
 *   1. Check MongoDB cache by slug
 *   2. If found -> return cached article, bump searchCount
 *   3. If not found -> Gemini generates it, Wikipedia supplies images, save to Mongo
 */
router.get("/search", async (req, res) => {
  const { topic, category } = req.query;
  if (!topic || !topic.trim()) {
    return res.status(400).json({ error: "A 'topic' query parameter is required." });
  }

  const slug = slugify(topic);

  try {
    const cached = await Article.findOne({ slug });
    if (cached) {
      cached.searchCount += 1;
      await cached.save();
      return res.json({ article: cached, source: "cache" });
    }

    // Not cached: generate fresh, in parallel with the Wikipedia lookup.
    const [generated, wikiContext] = await Promise.all([
      generateArticle(topic, category),
      fetchWikipediaContext(topic),
    ]);

    const article = await Article.create({
      title: generated.title || topic,
      slug,
      category: generated.category || category || "Unsolved Mysteries",
      hook: generated.hook,
      summary: generated.summary,
      story: generated.story,
      keyFacts: generated.keyFacts || [],
      theories: generated.theories || [],
      historicalView: generated.historicalView || "",
      mythsAndRumors: generated.mythsAndRumors || [],
      mostAcceptedExplanation: generated.mostAcceptedExplanation || "",
      funTrivia: generated.funTrivia || [],
      relatedTopics: generated.relatedTopics || [],
      timeline: Array.isArray(generated.timeline) ? generated.timeline : [],
      pullQuote: generated.pullQuote || "",
      wikipediaImage: wikiContext.heroImage || "",
      wikipediaImages: wikiContext.images,
      wikipediaUrl: wikiContext.wikipediaUrl,
      generatedBy: "gemini",
    });

    return res.json({ article, source: "generated" });
  } catch (err) {
    console.error("Article search/generate error:", err);
    return res.status(500).json({ error: "Failed to fetch or generate the article." });
  }
});

// GET /api/articles/random  -> "Discover Something New"
router.get("/random", async (req, res) => {
  try {
    const count = await Article.countDocuments();
    if (count === 0) {
      return res.status(404).json({ error: "No articles cached yet. Search for a topic first." });
    }
    const random = Math.floor(Math.random() * count);
    const article = await Article.findOne().skip(random);
    return res.json({ article });
  } catch (err) {
    console.error("Random discovery error:", err);
    return res.status(500).json({ error: "Failed to fetch a random article." });
  }
});

// GET /api/articles/category/:category
router.get("/category/:category", async (req, res) => {
  try {
    const articles = await Article.find({
      category: new RegExp(`^${req.params.category}$`, "i"),
    }).sort({ createdAt: -1 });
    return res.json({ articles });
  } catch (err) {
    console.error("Category fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch category articles." });
  }
});

// GET /api/articles/:slug
router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found." });
    return res.json({ article });
  } catch (err) {
    console.error("Article fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch article." });
  }
});

export default router;
