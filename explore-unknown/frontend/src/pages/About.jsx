import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", px: 2.5, py: 10 }}>
      <Typography className="font-display" variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
        About the Archive
      </Typography>
      <Typography sx={{ lineHeight: 1.8, mb: 2 }}>
        Explore the Unknown turns the internet's scattered mysteries, myths, and forgotten history
        into single, story-driven articles — narrated rather than summarized, with real photographs
        pulled straight from Wikipedia.
      </Typography>
      <Typography sx={{ lineHeight: 1.8, color: "text.secondary" }}>
        Every topic is written once, cached, and reused — so the archive gets faster and richer the
        more people explore it.
      </Typography>
    </Box>
  );
}
