import axios from "axios";

const WIKI_API = "https://en.wikipedia.org/w/api.php";
const WIKI_REST = "https://en.wikipedia.org/api/rest_v1";

// Wikipedia's API requires a descriptive User-Agent identifying the app + contact,
// per https://w.wiki/4wJS — requests without one are now rejected with 403.
const WIKI_HEADERS = {
  "User-Agent":
    "ExploreTheUnknown/1.0 (https://github.com/your-username/explore-unknown; contact@example.com)",
};

/**
 * Finds the best-matching Wikipedia page title for a free-text topic.
 */
async function findPageTitle(topic) {
  const { data } = await axios.get(WIKI_API, {
    params: {
      action: "query",
      list: "search",
      srsearch: topic,
      format: "json",
      origin: "*",
    },
    headers: WIKI_HEADERS,
    timeout: 8000,
  });
  const hits = data?.query?.search;
  if (!hits || hits.length === 0) return null;
  return hits[0].title;
}

/**
 * Returns the page summary (for hero image + short extract + canonical url).
 */
async function getSummary(title) {
  try {
    const { data } = await axios.get(
      `${WIKI_REST}/page/summary/${encodeURIComponent(title)}`,
      { headers: WIKI_HEADERS, timeout: 8000 }
    );
    return {
      thumbnail: data?.thumbnail?.source || null,
      original: data?.originalimage?.source || null,
      extract: data?.extract || "",
      url: data?.content_urls?.desktop?.page || "",
    };
  } catch {
    return { thumbnail: null, original: null, extract: "", url: "" };
  }
}

/**
 * Returns a list of additional image URLs from the page's media list,
 * filtered down to real photographic/illustrative content (skips icons/svgs).
 */
async function getGalleryImages(title, limit = 6) {
  try {
    const { data } = await axios.get(
      `${WIKI_REST}/page/media-list/${encodeURIComponent(title)}`,
      { headers: WIKI_HEADERS, timeout: 8000 }
    );
    const items = data?.items || [];
    const urls = [];
    for (const item of items) {
      if (item.type !== "image") continue;
      const src =
        item.srcset?.[item.srcset.length - 1]?.src ||
        item.original?.source ||
        null;
      if (!src) continue;
      if (/\.svg($|\?)/i.test(src)) continue; // skip icons/logos
      const full = src.startsWith("//") ? `https:${src}` : src;
      if (!urls.includes(full)) urls.push(full);
      if (urls.length >= limit) break;
    }
    return urls;
  } catch {
    return [];
  }
}

/**
 * Main entry point used by the article pipeline.
 * Priority: thumbnail -> original/featured image -> category placeholder (handled by caller).
 */
export async function fetchWikipediaContext(topic) {
  const title = await findPageTitle(topic);
  if (!title) {
    return { heroImage: null, images: [], wikipediaUrl: "", extract: "" };
  }

  const [summary, gallery] = await Promise.all([
    getSummary(title),
    getGalleryImages(title),
  ]);

  const heroImage = summary.thumbnail || summary.original || gallery[0] || null;
  const images = [heroImage, ...gallery].filter(Boolean);
  const uniqueImages = [...new Set(images)];

  return {
    heroImage,
    images: uniqueImages,
    wikipediaUrl: summary.url,
    extract: summary.extract,
  };
}
