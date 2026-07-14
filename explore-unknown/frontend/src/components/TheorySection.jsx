import { Box, Typography, Stack, Paper } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SectionLabel from "./SectionLabel.jsx";

export default function TheorySection({ theories = [] }) {
  if (!theories.length) return null;
  return (
    <Box sx={{ mb: 6 }}>
      <SectionLabel icon={LightbulbOutlinedIcon} color="primary.main">
        Popular Theories
      </SectionLabel>
      <Stack spacing={2}>
        {theories.map((theory, i) => {
          const [name, ...rest] = String(theory).split(":");
          const explanation = rest.join(":").trim();
          return (
            <Paper
              key={i}
              elevation={0}
              sx={{
                p: 2.5,
                borderLeft: "3px solid var(--gold)",
                backgroundColor: "background.paper",
              }}
            >
              {explanation ? (
                <>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{name.trim()}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {explanation}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">{theory}</Typography>
              )}
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
