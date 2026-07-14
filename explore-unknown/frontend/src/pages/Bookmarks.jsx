import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CategoryPlaceholder from "../components/CategoryPlaceholder.jsx";
import { getBookmarks } from "../utils/bookmarks.js";

export default function Bookmarks() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setSaved(getBookmarks());
  }, []);

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto", px: 2, py: 6 }}>
      <Typography variant="overline" sx={{ fontFamily: "'Cinzel', serif", letterSpacing: 3, color: "text.secondary" }}>
        Your Archive
      </Typography>
      <Typography className="font-display" variant="h3" sx={{ fontWeight: 600, mb: 4 }}>
        Bookmarks
      </Typography>

      {saved.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <BookmarkBorderIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
          <Typography sx={{ color: "text.secondary" }}>
            Nothing saved yet. Tap the bookmark icon on any article to keep it here.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {saved.map((a) => (
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
                <Box sx={{ height: 160 }}>
                  {a.wikipediaImage ? (
                    <Box
                      sx={{
                        height: "100%",
                        backgroundImage: `url(${a.wikipediaImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <CategoryPlaceholder category={a.category} />
                  )}
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
