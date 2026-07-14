import { Box, Typography, Chip, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SectionLabel from "./SectionLabel.jsx";

export function FunTrivia({ items = [] }) {
  if (!items.length) return null;
  return (
    <Box sx={{ mb: 6 }}>
      <SectionLabel icon={EmojiObjectsOutlinedIcon} color="primary.main">
        Did You Know?
      </SectionLabel>
      <Stack spacing={1.5}>
        {items.map((t, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{ p: 2, border: "1px solid var(--hairline)", backgroundColor: "background.paper" }}
          >
            {t}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export function RelatedTopics({ topics = [] }) {
  const navigate = useNavigate();
  if (!topics.length) return null;
  return (
    <Box sx={{ mb: 4 }}>
      <SectionLabel icon={TravelExploreIcon} color="secondary.main">
        Related Topics
      </SectionLabel>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", rowGap: 1.5 }}>
        {topics.map((t) => (
          <Chip
            key={t}
            label={t}
            onClick={() => navigate(`/article/${encodeURIComponent(t)}`)}
            sx={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: 0.5,
              px: 1,
              border: "1px solid var(--hairline)",
              backgroundColor: "background.paper",
              cursor: "pointer",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
