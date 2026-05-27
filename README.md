# Daebak Board

A desktop-first K-Drama tracking app that organizes shows by watching lifecycle — 
Backlog, Currently Watching, Completed & Scored, and The Rewatch Pile.

## Live Demo

[daebak-board.vercel.app](https://daebak-board.vercel.app)

Demo mode is active on the public URL. You can add, rate, move, and delete 
cards freely — changes are temporary and reset on refresh.

## Features

- Four-column lifecycle board with compact horizontal media cards
- Manual show creation (title required, all other fields optional)
- TMDB search and enrichment — auto-fills poster, cast, platforms, and year
- Duplicate detection prevents adding the same show twice
- Optimistic UI updates with full rollback on failure
- 1–10 rating dropdown per show
- Inline two-step delete confirmation
- Demo mode protects seeded data on public deployment

## Tech Stack

- Vite + React (JavaScript)
- Tailwind CSS
- Supabase (Postgres, client-side SDK)
- TMDB API (TV search, credits, watch providers)
- Vercel (hosting, environment variables)

## Local Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Create `.env.local` in the project root and add the following environment variables: # Daebak Board

A desktop-first K-Drama tracking app that organizes shows by watching lifecycle — 
Backlog, Currently Watching, Completed & Scored, and The Rewatch Pile.

## Live Demo

[daebak-board.vercel.app](https://daebak-board.vercel.app)

Demo mode is active on the public URL. You can add, rate, move, and delete 
cards freely — changes are temporary and reset on refresh.

## Features

- Four-column lifecycle board with compact horizontal media cards
- Manual show creation (title required, all other fields optional)
- TMDB search and enrichment — auto-fills poster, cast, platforms, and year
- Duplicate detection prevents adding the same show twice
- Optimistic UI updates with full rollback on failure
- 1–10 rating dropdown per show
- Inline two-step delete confirmation
- Demo mode protects seeded data on public deployment

## Tech Stack

- Vite + React (JavaScript)
- Tailwind CSS
- Supabase (Postgres, client-side SDK)
- TMDB API (TV search, credits, watch providers)
- Vercel (hosting, environment variables)

## Local Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Create `.env.local` in the project root and add the following environment variables:VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_TMDB_API_KEY=your-tmdb-api-key
VITE_DEMO_MODE=false **Where to find each value:**

- `VITE_SUPABASE_URL` — Your Supabase project URL. Found in Supabase dashboard →
  Project Settings → API → Project URL.

- `VITE_SUPABASE_ANON_KEY` — Your Supabase public anon key. Found in the same
  place as the URL, under API Keys. Use the `anon public` key, not the service role key.

- `VITE_TMDB_API_KEY` — Your TMDB API key. Found at themoviedb.org → Settings →
  API → API Key (v3 auth).

- `VITE_DEMO_MODE` — Set to `false` for local development so changes persist to
  Supabase. Set to `true` on public deployments to prevent mutations to the database.

4. Run locally: `npm run dev`

## Demo Mode

Set `VITE_DEMO_MODE=true` for public deployments. In demo mode the app reads
from Supabase on load but all add, update, rating, and delete interactions
update local React state only — nothing is written to the database.

## Attribution

Data and images provided by TMDB. This product uses the TMDB API but is not
endorsed or certified by TMDB.

## Not in MVP

Authentication, drag-and-drop, episode tracking, multi-user support,
and TMDB recommendations are out of scope for this version.
