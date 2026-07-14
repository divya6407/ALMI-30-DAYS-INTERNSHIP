import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, CircularProgress, ImageList, ImageListItem } from "@mui/material";
import ReadingProgress from "../components/ReadingProgress.jsx";
import FactSection from "../components/FactSection.jsx";
import TheorySection from "../components/TheorySection.jsx";
import RumorSection from "../components/RumorSection.jsx";
import { ScientificView, AcceptedExplanation } from "../components/ScientificView.jsx";
import { FunTrivia, RelatedTopics } from "../components/RelatedTopics.jsx";
import CategoryPlaceholder from "../components/CategoryPlaceholder.jsx";
import Timeline from "../components/Timeline.jsx";
import QuoteHighlight from "../components/QuoteHighlight.jsx";
import BookmarkButton from "../components/BookmarkButton.jsx";
import { searchArticle } from "../services/articleApi.js";

function estimateReadingMinutes(article) {
  const words = [article.story, article.summary, article.historicalView]
    .filter(Boolean)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

export default function Article() {
  const { slugOrTopic } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    searchArticle(decodeURIComponent(slugOrTopic))
      .then(setArticle)
      .catch(() => setError("This story wouldn't surface. Try another topic."))
      .finally(() => setLoading(false));
  }, [slugOrTopic]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 16 }}>
        <CircularProgress sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box sx={{ textAlign: "center", py: 16, px: 2 }}>
        <Typography className="font-display" variant="h4" sx={{ mb: 1 }}>
          The archive has no record of this.
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{error}</Typography>
      </Box>
    );
  }

  const gallery = (article.wikipediaImages || []).slice(1, 5);

  return (
    <Box>
      <ReadingProgress />

      {/* Hero banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "48vh", md: "60vh" },
          backgroundImage: article.wikipediaImage ? `url(${article.wikipediaImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {!article.wikipediaImage && (
          <CategoryPlaceholder category={article.category} sx={{ position: "absolute", inset: 0 }} />
        )}
        {article.wikipediaImage && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(180deg, rgba(43,36,24,0.15) 0%, rgba(43,36,24,0.85) 100%)",
            }}
          />
        )}
        <Box
          sx={{
            position: "relative",
            maxWidth: 780,
            width: "100%",
            mx: "auto",
            px: 3,
            pb: 5,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 2,
            color: article.wikipediaImage ? "#FAF6EC" : "text.primary",
          }}
        >
          <Box>
            <Chip
              label={article.category}
              size="small"
              sx={{
                mb: 2,
                fontFamily: "'Cinzel', serif",
                letterSpacing: 1,
                backgroundColor: article.wikipediaImage ? "rgba(250,246,236,0.15)" : "rgba(184,145,47,0.15)",
                color: "inherit",
              }}
            />
            <Typography className="font-display" variant="h2" sx={{ fontWeight: 600, fontSize: { xs: "2.2rem", md: "3.4rem" } }}>
              {article.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75, mt: 1 }}>
              {estimateReadingMinutes(article)} min read
            </Typography>
          </Box>
          <BookmarkButton article={article} dark={Boolean(article.wikipediaImage)} />
        </Box>
      </Box>

      {/* Story container - 750px reading width per PRD */}
      <Box sx={{ maxWidth: 750, mx: "auto", px: 2.5, py: { xs: 5, md: 7 } }}>
        <Typography
          className="font-display"
          sx={{
            fontSize: { xs: "1.35rem", md: "1.6rem" },
            fontStyle: "italic",
            lineHeight: 1.5,
            mb: 4,
            borderLeft: "3px solid var(--gold)",
            pl: 2.5,
            color: "text.primary",
          }}
        >
          {article.hook}
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 5, fontSize: "1.05rem", lineHeight: 1.7 }}>
          {article.summary}
        </Typography>

        {article.story?.split("\n\n").map((para, i, arr) => {
          const midpoint = Math.floor(arr.length / 2);
          return (
            <Box key={i}>
              <Typography sx={{ mb: 2.5, fontSize: "1.05rem", lineHeight: 1.85 }}>
                {para}
              </Typography>
              {i === midpoint && article.pullQuote && (
                <QuoteHighlight text={article.pullQuote} />
              )}
            </Box>
          );
        })}

        {gallery.length > 0 && (
          <ImageList cols={gallery.length >= 3 ? 3 : gallery.length} gap={12} sx={{ my: 4 }}>
            {gallery.map((src) => (
              <ImageListItem key={src} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <img src={src} alt={article.title} loading="lazy" style={{ borderRadius: 8 }} />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        <Timeline events={article.timeline} />

        <FactSection facts={article.keyFacts} />
        <TheorySection theories={article.theories} />
        <ScientificView text={article.historicalView} />
        <RumorSection rumors={article.mythsAndRumors} />
        <AcceptedExplanation text={article.mostAcceptedExplanation} />
        <FunTrivia items={article.funTrivia} />
        <RelatedTopics topics={article.relatedTopics} />

        {article.wikipediaUrl && (
          <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 4 }}>
            Images sourced from Wikipedia —{" "}
            <a href={article.wikipediaUrl} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
              view original article
            </a>
          </Typography>
        )}
      </Box>
    </Box>
  );
}
