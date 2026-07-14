import { Box, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function QuoteHighlight({ text }) {
  if (!text) return null;

  return (
    <Box
      sx={{
        my: 5,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <FormatQuoteIcon sx={{ color: "primary.main", fontSize: 22, mb: 1, transform: "scaleX(-1)" }} />
      <Typography
        className="font-display"
        sx={{
          fontSize: { xs: "1.4rem", md: "1.7rem" },
          fontWeight: 600,
          fontStyle: "italic",
          lineHeight: 1.4,
          maxWidth: 560,
          mx: "auto",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
