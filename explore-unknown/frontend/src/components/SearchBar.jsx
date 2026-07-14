import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ placeholder = "Search Atlantis, Medusa, Area 51..." }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const topic = value.trim();
    if (!topic) return;
    navigate(`/article/${encodeURIComponent(topic)}`);
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 0.5,
        borderRadius: 999,
        border: "1px solid var(--hairline)",
        backgroundColor: "#FFFDF8",
        maxWidth: 560,
        width: "100%",
        mx: "auto",
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        sx={{ flex: 1, fontSize: "1.05rem", py: 1 }}
      />
      <IconButton type="submit" sx={{ color: "primary.main" }} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
