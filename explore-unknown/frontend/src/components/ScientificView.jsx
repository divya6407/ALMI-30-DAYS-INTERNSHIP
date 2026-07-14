import { Box, Typography, Paper } from "@mui/material";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import StarOutlineIcon from "@mui/icons-material/StarBorder";
import SectionLabel from "./SectionLabel.jsx";

export function ScientificView({ text }) {
  if (!text) return null;
  return (
    <Box sx={{ mb: 6 }}>
      <SectionLabel icon={ScienceOutlinedIcon} color="secondary.main">
        What Experts Think
      </SectionLabel>
      <Typography sx={{ color: "text.primary", lineHeight: 1.75 }}>{text}</Typography>
    </Box>
  );
}

export function AcceptedExplanation({ text }) {
  if (!text) return null;
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        mb: 6,
        border: "1px solid var(--hairline)",
        backgroundColor: "background.paper",
        boxShadow: "0 10px 30px rgba(184,145,47,0.12)",
      }}
    >
      <SectionLabel icon={StarOutlineIcon} color="primary.main">
        Most Accepted Explanation
      </SectionLabel>
      <Typography className="font-display" sx={{ fontSize: "1.3rem", lineHeight: 1.6 }}>
        {text}
      </Typography>
    </Paper>
  );
}
