import { Box, Typography } from "@mui/material";

/**
 * A small brass-plaque style label used before each article section,
 * echoing museum object tags rather than generic headings.
 */
export default function SectionLabel({ icon: Icon, children, color = "primary.main" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
      {Icon && <Icon sx={{ fontSize: 18, color }} />}
      <Typography
        variant="overline"
        sx={{ fontFamily: "'Cinzel', serif", letterSpacing: 2.5, color, fontWeight: 600 }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", backgroundColor: "var(--hairline)" }} />
    </Box>
  );
}
