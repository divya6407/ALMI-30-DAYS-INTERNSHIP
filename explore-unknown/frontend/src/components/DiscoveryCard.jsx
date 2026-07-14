import { Box, Typography, Button, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import CategoryPlaceholder from "./CategoryPlaceholder.jsx";

export default function DiscoveryCard({ article }) {
  if (!article) return null;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        minHeight: 360,
        display: "flex",
        alignItems: "flex-end",
        border: "1px solid var(--hairline)",
        backgroundImage: article.wikipediaImage
          ? `linear-gradient(180deg, rgba(43,36,24,0.05) 0%, rgba(43,36,24,0.75) 100%), url(${article.wikipediaImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!article.wikipediaImage && (
        <CategoryPlaceholder category={article.category} sx={{ position: "absolute", inset: 0 }} />
      )}
      <Box sx={{ p: { xs: 3, md: 5 }, color: article.wikipediaImage ? "#FAF6EC" : "text.primary", position: "relative" }}>
        <Chip
          label={article.category}
          size="small"
          sx={{
            mb: 1.5,
            fontFamily: "'Cinzel', serif",
            letterSpacing: 1,
            backgroundColor: "rgba(250,246,236,0.15)",
            color: "#FAF6EC",
          }}
        />
        <Typography className="font-display" variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
          {article.title}
        </Typography>
        <Typography sx={{ maxWidth: 520, opacity: 0.9, mb: 2.5 }}>{article.summary}</Typography>
        <Button
          component={Link}
          to={`/article/${article.slug}`}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{ backgroundColor: "primary.main", "&:hover": { backgroundColor: "primary.dark" } }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
}
