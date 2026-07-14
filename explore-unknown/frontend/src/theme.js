import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FAF6EC",
      paper: "#FFFDF8",
    },
    primary: {
      main: "#B8912F",
      light: "#D4AF37",
      dark: "#8C6D1F",
      contrastText: "#FAF6EC",
    },
    secondary: {
      main: "#2F6F6B",
    },
    error: {
      main: "#8C3B3B",
    },
    text: {
      primary: "#2B2418",
      secondary: "#5A4F3D",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Cormorant Garamond', serif" },
    h2: { fontFamily: "'Cormorant Garamond', serif" },
    h3: { fontFamily: "'Cormorant Garamond', serif" },
    h4: { fontFamily: "'Cormorant Garamond', serif" },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.4 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 22, paddingRight: 22 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
