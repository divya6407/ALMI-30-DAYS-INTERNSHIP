import { Box, Typography } from "@mui/material";
import { categories } from "../data/categories.js";

const FALLBACK_ICON = categories[0].icon;

/**
 * Museum-plate style fallback for when Wikipedia has no usable image.
 * Renders a soft gold gradient with the category's icon and name,
 * instead of a broken <img>.
 */
export default function CategoryPlaceholder({ category, sx = {} }) {
  const match = categories.find(
    (c) => c.name.toLowerCase() === String(category).toLowerCase()
  );
  const Icon = match?.icon || FALLBACK_ICON;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.25), transparent 55%), linear-gradient(160deg, #F1E9D8 0%, #E7DCC2 100%)",
        ...sx,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(184,145,47,0.3) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          opacity: 0.6,
        }}
      />
      <Icon sx={{ fontSize: 40, color: "primary.main", position: "relative" }} />
      <Typography
        variant="overline"
        sx={{
          position: "relative",
          fontFamily: "'Cinzel', serif",
          letterSpacing: 2,
          color: "text.secondary",
          textAlign: "center",
          px: 2,
        }}
      >
        {category}
      </Typography>
    </Box>
  );
}
