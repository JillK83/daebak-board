# Daebak Board — PRD MVP
Version 1.0

---

## Product Summary
Daebak Board is a personal K-drama tracking app presented as a 4-column kanban board.
Users track dramas they want to watch, are currently watching, have completed, and want
to rewatch. MVP is a local-state single-page app — no backend, no auth, no sync.

---

## The 4 Columns

| Column ID | Display Label | Purpose |
|---|---|---|
| `backlog` | Backlog / My Watchlist | Shows the user wants to watch but hasn't started |
| `watching` | Currently Watching | Shows actively in progress |
| `completed` | Completed / History | Shows finished, optionally scored |
| `rewatch` | Rewatch | Shows the user wants to or is rewatching |

No other columns. "Dropped" is explicitly out of MVP scope.

---

## Core User Actions

### Add a drama
- User clicks `+ Add show` in any column
- Enters title (required), year, episode count, lead actors, platforms
- Card is created in that column with no poster, no rating

### Move a drama between columns
- User expands "move to" on any card
- Selects destination column from inline pills
- Card moves immediately, column counts update

### Rate a drama
- User taps `— / 10` on any card
- Stepper appears inline: `− N +`
- User sets whole number 1–10
- Confirms by clicking outside or pressing Enter

### Edit a drama
- User hovers card, clicks pencil icon
- Opens edit state (inline or modal)
- Can update: title, year, episodes, current episode, actors, platforms, poster URL

### Remove a drama
- User hovers card, clicks × icon
- Card is deleted from the board
- Column count updates

### Track episode progress
- Only visible on cards in the `watching` column
- User can update current episode number via edit flow
- Progress bar renders automatically from current / total

---

## Data Constraints

- Rating: whole integers 1–10 only, or null (unrated)
- Episode current: integer, cannot exceed total episodes
- Platforms: array, supports Netflix / Viki / Wavve in MVP
  (additional platforms can be added as strings but may not have styled badges)
- Poster: URL string or null — null triggers placeholder illustration
- All data lives in React state — resets on page refresh in MVP

---

## Out of MVP Scope

- User authentication
- Backend / database persistence
- Drag and drop between columns
- "Dropped" column
- Social features (sharing, follows)
- Search/filter functionality (search bar is UI only in MVP)
- Episode-by-episode notes
- External API integration (TMDB, etc.)
- Mobile app
- Notifications or reminders
- Export / import

---

## MVP Success Criteria

- User can add a drama to any column
- User can move a drama between all 4 columns
- User can rate a drama 1–10
- User can edit drama details
- User can remove a drama
- Column counts always reflect actual card count
- Progress bar always reflects actual episode progress
- Empty states show when columns have no cards
- Design matches DESIGN_SYSTEM.md and COMPONENTS.md specifications
