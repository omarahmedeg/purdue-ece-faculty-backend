# Purdue ECE Faculty Search

A full-stack app for searching for faculty in the [Elmore Family School of Electrical and Computer Engineering](https://engineering.purdue.edu/ECE/People/Faculty) at Purdue University. The backend scrapes faculty data and enriches it with publication info (OpenAlex + Google Scholar). The frontend includes a search UI that provides information about faculty research areas, websites, recent publications, and “see more” links to external publication profiles.

## Project structure

- **`backend/`** — Node.js (Express) API that scrapes Purdue ECE faculty pages and fetches publication data.
- **`frontend/`** — React (Vite) app for searching by name or research area and viewing results.

## Running locally

From the repo root:

1. **Install dependencies**
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
2. **Start the backend**
   - `cd backend`
   - `npm start` (or `node server.js` if you prefer)
   - The server listens on `http://localhost:8080`.
3. **Start the frontend**
   - `cd frontend`
   - `npm run dev`
   - The app will open on the usual Vite dev port (e.g. `http://localhost:5173`), configured to talk to the local backend.

## Frontend

- Search by **name** or **research area**.
- Results show name (linked to personal website when available), research areas, recent publications, and (when available) a **“See more publications”** button that links to an external profile (Google Scholar, OpenAlex, ResearchGate, etc.).
- Proxies `/api` to the backend (see `frontend/vite.config.js`).

## Backend

- **Scrapes** [Purdue ECE Faculty](https://engineering.purdue.edu/ECE/People/Faculty): name, profile URL, personal website, research areas.
- **Enriches** results with recent publications from [OpenAlex](https://openalex.org/) and, where configured, [Google Scholar](https://scholar.google.com/).
- **Endpoints:**
  - `GET /api/faculty/search/name?query=...` — Basic search by name.
  - `GET /api/faculty/search/research?query=...` — Basic search by research area (profile text only).
  - `GET /api/faculty/search/extensive/name?query=...` — Name search with publications (returns 503 until scholar data is ready).
  - `GET /api/faculty/search/extensive/research?query=...` — Research-area search that considers both profile research areas and publication titles.
  - `GET /api/faculty/status` — Returns cache / scrape status, including whether scholar data is ready.
  - `GET /api/faculty/refresh` — Rescrape faculty data and refresh the cache (background scholar fetch).
  - `POST /api/faculty/refresh` — Same as above, but using POST.

## Tech stack

- **Backend:** Node.js, Express, Cheerio (scraping), node-fetch, natural (stemming), OpenAlex API, Google Scholar HTML parsing
- **Frontend:** React, Vite
