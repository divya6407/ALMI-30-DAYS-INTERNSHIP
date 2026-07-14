import { Box, Typography } from "@mui/material";
import SectionLabel from "./SectionLabel.jsx";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function Timeline({ events = [] }) {
  if (!events?.length) return null;

  return (
    <Box sx={{ mb: 6 }}>
      <SectionLabel icon={TimelineIcon} color="primary.main">
        Timeline
      </SectionLabel>

      <Box sx={{ position: "relative", pl: 3 }}>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: 7,
            top: 6,
            bottom: 6,
            width: "2px",
            backgroundColor: "var(--hairline)",
          }}
        />
        {events.map((e, i) => (
          <Box key={i} sx={{ position: "relative", pb: i === events.length - 1 ? 0 : 3.5 }}>
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: -24,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                border: "2px solid var(--parchment)",
                boxShadow: "0 0 0 1px var(--hairline)",
              }}
            />
            <Typography
              className="font-label"
              variant="subtitle2"
              sx={{ color: "primary.main", letterSpacing: 1, mb: 0.25 }}
            >
              {e.date}
            </Typography>
            <Typography sx={{ color: "text.primary" }}>{e.event}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
