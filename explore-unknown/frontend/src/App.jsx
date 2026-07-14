import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Article from "./pages/Article.jsx";
import About from "./pages/About.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/article/:slugOrTopic" element={<Article />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Box>
  );
}
