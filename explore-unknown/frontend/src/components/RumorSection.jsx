import { Box, Typography, Stack, Paper } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SectionLabel from "./SectionLabel.jsx";

export default function RumorSection({ rumors = [] }) {
  if (!rumors.length) return null;
  return (
    <Box sx={{ mb: 6 }}>
      <SectionLabel icon={AutoStoriesOutlinedIcon} color="error.main">
        Myths & Rumors
      </SectionLabel>
      <Stack spacing={1.5}>
        {rumors.map((r, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: "rgba(140,59,59,0.06)",
              border: "1px solid rgba(140,59,59,0.2)",
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            {r}
          </Paper>
        ))}
      </Stack>
      <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
        None of the above is verified fact — treat it as folklore.
      </Typography>
    </Box>
  );
}
