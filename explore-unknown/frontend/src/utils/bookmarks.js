const STORAGE_KEY = "explore-unknown:bookmarks";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage unavailable (private browsing etc) - fail silently
  }
}

export function getBookmarks() {
  return readAll();
}

export function isBookmarked(slug) {
  return readAll().some((b) => b.slug === slug);
}

/**
 * Stores just enough of the article to render the Bookmarks page
 * without needing another API call.
 */
export function toggleBookmark(article) {
  const list = readAll();
  const exists = list.some((b) => b.slug === article.slug);

  const next = exists
    ? list.filter((b) => b.slug !== article.slug)
    : [
        {
          slug: article.slug,
          title: article.title,
          category: article.category,
          summary: article.summary,
          wikipediaImage: article.wikipediaImage,
          savedAt: Date.now(),
        },
        ...list,
      ];

  writeAll(next);
  return !exists; // returns new bookmarked state
}
