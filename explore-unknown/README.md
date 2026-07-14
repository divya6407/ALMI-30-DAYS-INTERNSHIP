# Explore the Unknown

AI-powered discovery platform: search a mysterious/historical/mythological topic, get a
story-driven article written by Gemini, illustrated with real Wikipedia photos, and cached
in MongoDB so it's never generated twice.

## Structure

```
explore-unknown/
├── backend/     Express API (ES modules), Gemini + Wikipedia services, Mongoose cache
└── frontend/    React + Vite + Tailwind v4 + MUI
```

## 1. Backend setup

```bash
cd backend
npm install
```

Your `.env` is already filled in with the key/URI you gave me:

```
PORT=5000
MONGODB_URI=...
GEMINI_API_KEY=...
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev
```

You should see:
```
MongoDB connected
Explore the Unknown API running on http://localhost:5000
```

Quick smoke test once it's running:
```bash
curl "http://localhost:5000/api/health"
curl "http://localhost:5000/api/articles/search?topic=Atlantis&category=Ancient%20Civilizations"
```
The first search for a topic takes a few seconds (Gemini generation + Wikipedia lookup).
Searching the same topic again returns instantly from the MongoDB cache.

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). The Vite dev server proxies
`/api/*` requests to the backend on port 5000 (see `vite.config.js`), so nothing else to
configure.

## Notes / things worth knowing

- **API keys**: rotate both the Gemini key and the MongoDB password once you're done testing,
  since they were shared in plaintext chat. Google AI Studio → regenerate key. MongoDB Atlas →
  Database Access → edit user password (and update `MONGODB_URI` afterward).
- **Gemini model**: using `gemini-2.0-flash` in `backend/services/gemini.js` — swap the model
  string there if you want a different one.
- **Wikipedia**: no key required — it uses Wikipedia's public REST/Action API. Requests send a
  descriptive `User-Agent` header, which Wikipedia now requires (403 without one).
- **Caching**: `GET /api/articles/search?topic=...` checks MongoDB by slug first; only calls
  Gemini on a genuine cache miss, exactly per the PRD.
- **Random Discovery**: `GET /api/articles/random` picks any previously cached article.
- **Category placeholders**: if Wikipedia has no image, the UI shows a styled gold/ivory
  "museum plate" fallback (icon + category name) instead of a broken image — see
  `frontend/src/components/CategoryPlaceholder.jsx`.
- **Timeline**: Gemini returns a `timeline` array (date + event) when a topic genuinely has a
  chronology (history, disappearances, ancient civilizations, etc). It renders automatically
  when present, and is simply omitted otherwise.
- **Pull quote**: Gemini also returns a short `pullQuote`, shown as a mid-story highlighted
  quote (see `QuoteHighlight.jsx`).
- **Bookmarks**: stored in the browser's `localStorage` (no backend/DB needed) — the bookmark
  icon on any article page toggles it, and `/bookmarks` lists everything saved.
- **Heads up on old cached articles**: if you already searched "Atlantis" etc. before this
  update, that cached Mongo document won't have `timeline`/`pullQuote` filled in (old cache
  entries are served as-is, not regenerated). Search a brand-new topic to see those features,
  or manually delete the old document from Atlas to force a fresh generation.
- I could not test live Gemini/MongoDB calls from my sandbox (its network is restricted to a
  fixed allowlist that doesn't include `googleapis.com` or `mongodb.net`), so please run the
  smoke test above once locally to confirm end-to-end before building further on top.
