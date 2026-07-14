import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { isBookmarked, toggleBookmark } from "../utils/bookmarks.js";

export default function BookmarkButton({ article, dark = false }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (article?.slug) setSaved(isBookmarked(article.slug));
  }, [article?.slug]);

  function handleClick() {
    const nowSaved = toggleBookmark(article);
    setSaved(nowSaved);
  }

  return (
    <Tooltip title={saved ? "Remove bookmark" : "Save for later"}>
      <IconButton
        onClick={handleClick}
        aria-label={saved ? "Remove bookmark" : "Save for later"}
        sx={{
          color: saved ? "primary.main" : dark ? "#FAF6EC" : "text.secondary",
          backgroundColor: dark ? "rgba(0,0,0,0.25)" : "rgba(184,145,47,0.08)",
          "&:hover": { backgroundColor: dark ? "rgba(0,0,0,0.4)" : "rgba(184,145,47,0.16)" },
          flexShrink: 0,
        }}
      >
        {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
