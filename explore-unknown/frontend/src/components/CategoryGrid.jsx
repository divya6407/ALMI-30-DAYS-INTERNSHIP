import { Box, Typography, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { categories } from "../data/categories.js";

export default function CategoryGrid() {
  return (
    <Box component="section" sx={{ px: 2, py: { xs: 6, md: 8 }, maxWidth: 1080, mx: "auto" }}>
      <Typography
        variant="overline"
        sx={{ fontFamily: "'Cinzel', serif", letterSpacing: 3, color: "text.secondary" }}
      >
        Browse the Archive
      </Typography>
      <Typography className="font-display" variant="h3" sx={{ fontWeight: 600, mb: 4 }}>
        Choose your descent
      </Typography>

      <Grid container spacing={2.5}>
        {categories.map(({ name, icon: Icon, blurb }) => (
          <Grid item xs={6} sm={4} md={3} key={name}>
            <Paper
              component={Link}
              to={`/category/${encodeURIComponent(name)}`}
              elevation={0}
              sx={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                p: 2.5,
                height: "100%",
                border: "1px solid var(--hairline)",
                backgroundColor: "background.paper",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(184,145,47,0.18)",
                },
              }}
            >
              <Icon sx={{ color: "primary.main", fontSize: 30, mb: 1.5 }} />
              <Typography className="font-display" variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                {blurb}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
