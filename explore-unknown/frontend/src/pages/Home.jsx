import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx";
import DiscoveryCard from "../components/DiscoveryCard.jsx";
import { getRandomArticle, searchArticle } from "../services/articleApi.js";

const FEATURED_TOPIC = "Atlantis";

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    searchArticle(FEATURED_TOPIC, "Ancient Civilizations")
      .then((article) => active && setFeatured(article))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  async function handleRandom() {
    try {
      const article = await getRandomArticle();
      navigate(`/article/${article.slug}`);
    } catch {
      navigate(`/article/${encodeURIComponent(FEATURED_TOPIC)}`);
    }
  }

  return (
    <Box>
      <Hero />

      <Box sx={{ maxWidth: 1080, mx: "auto", px: 2, mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ fontFamily: "'Cinzel', serif", letterSpacing: 3, color: "text.secondary" }}
        >
          Featured Discovery
        </Typography>
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Box
              sx={{
                height: 360,
                borderRadius: 3,
                border: "1px solid var(--hairline)",
                backgroundColor: "background.paper",
              }}
            />
          ) : (
            <DiscoveryCard article={featured} />
          )}
        </Box>
      </Box>

      <CategoryGrid />

      <Box sx={{ textAlign: "center", pb: 10 }}>
        <Button
          onClick={handleRandom}
          variant="outlined"
          size="large"
          startIcon={<CasinoOutlinedIcon />}
          sx={{ borderColor: "primary.main", color: "primary.main" }}
        >
          Discover Something New
        </Button>
      </Box>
    </Box>
  );
}
