import { Box, Paper, Typography, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SectionLabel from "./SectionLabel.jsx";

export default function FactSection({ facts = [] }) {
  if (!facts.length) return null;
  return (
    <Box sx={{ mb: 6 }}>
      <SectionLabel icon={VerifiedIcon} color="secondary.main">
        What We Know For Sure
      </SectionLabel>
      <Stack spacing={1.5}>
        {facts.map((fact, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              p: 2,
              border: "1px solid var(--hairline)",
              backgroundColor: "background.paper",
              fontSize: "0.98rem",
            }}
          >
            {fact}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
