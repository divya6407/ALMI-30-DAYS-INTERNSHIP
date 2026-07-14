import { Box, Typography, Stack } from "@mui/material";
import SearchBar from "./SearchBar.jsx";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 10 },
        px: 2,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* faint constellation of dots, evokes a star chart / archive ceiling */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(184,145,47,0.35) 1px, transparent 1.4px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.5), transparent 70%)",
        }}
      />

      <Stack spacing={3} sx={{ position: "relative", maxWidth: 780, mx: "auto" }}>
        <Typography
          variant="overline"
          sx={{
            fontFamily: "'Cinzel', serif",
            letterSpacing: 4,
            color: "primary.main",
          }}
        >
          A Digital Archive of the Unexplained
        </Typography>

        <Typography
          className="font-display reveal"
          variant="h1"
          sx={{ fontWeight: 600, fontSize: { xs: "2.6rem", md: "4rem" }, lineHeight: 1.05 }}
        >
          Explore the Unknown
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "1.05rem", md: "1.2rem" },
            maxWidth: 560,
            mx: "auto",
          }}
        >
          Mysteries, myths, forgotten civilizations, and stories that still puzzle the world —
          told the way they deserve to be told.
        </Typography>

        <Box sx={{ pt: 1 }}>
          <SearchBar />
        </Box>
      </Stack>
    </Box>
  );
}
