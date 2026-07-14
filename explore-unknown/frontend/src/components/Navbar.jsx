import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(250,246,236,0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", color: "inherit", flex: 1 }}
        >
          <AutoAwesomeIcon sx={{ color: "primary.main" }} />
          <Typography className="font-label" sx={{ fontWeight: 600, letterSpacing: 1 }}>
            EXPLORE THE UNKNOWN
          </Typography>
        </Box>
        <Button component={Link} to="/bookmarks" startIcon={<BookmarkBorderIcon />} sx={{ color: "text.primary" }}>
          Bookmarks
        </Button>
        <Button component={Link} to="/about" sx={{ color: "text.primary" }}>
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
