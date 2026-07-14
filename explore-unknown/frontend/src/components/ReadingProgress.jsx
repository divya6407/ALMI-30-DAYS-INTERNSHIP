import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1300, backgroundColor: "rgba(184,145,47,0.15)" }}>
      <Box
        sx={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "primary.main",
          transition: "width 0.1s linear",
        }}
      />
    </Box>
  );
}
