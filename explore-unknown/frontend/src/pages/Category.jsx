import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import SearchBar from "../components/SearchBar.jsx";
import CategoryPlaceholder from "../components/CategoryPlaceholder.jsx";
import { getArticlesByCategory } from "../services/articleApi.js";

export default function Category() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArticlesByCategory(category)
      .then(setArticles)
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto", px: 2, py: 6 }}>
      <Typography variant="overline" sx={{ fontFamily: "'Cinzel', serif", letterSpacing: 3, color: "text.secondary" }}>
        Category
      </Typography>
      <Typography className="font-display" variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
        {category}
      </Typography>
      <Box sx={{ mb: 5 }}>
        <SearchBar placeholder={`Search within ${category}...`} />
      </Box>

      {loading ? (
        <CircularProgress sx={{ color: "primary.main" }} />
      ) : articles.length === 0 ? (
        <Typography sx={{ color: "text.secondary" }}>
          Nothing explored here yet — search a topic above to be the first to uncover it.
        </Typography>
      ) : (
        <Grid container spacing={2.5}>
          {articles.map((a) => (
            <Grid item xs={12} sm={6} md={4} key={a.slug}>
              <Paper
                component={Link}
                to={`/article/${a.slug}`}
                elevation={0}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  overflow: "hidden",
                  border: "1px solid var(--hairline)",
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    height: 160,
                    backgroundImage: a.wikipediaImage ? `url(${a.wikipediaImage})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!a.wikipediaImage && <CategoryPlaceholder category={a.category} />}
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography className="font-display" variant="h6" sx={{ fontWeight: 600 }}>
                    {a.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {a.summary?.slice(0, 90)}...
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
