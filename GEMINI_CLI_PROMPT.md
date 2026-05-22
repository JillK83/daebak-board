# Gemini CLI — Daebak Board Build Prompt

## Project Overview
Build a K-drama kanban tracking web app called **daebak board**.
Stack: React + Tailwind CSS (or plain CSS with CSS variables).
All design tokens, component specs, and interaction rules are defined in the
accompanying MD files — reference them for every visual and behavioral decision.

Reference files to load before building:
- `DESIGN_SYSTEM.md` — tokens, typography, color, spacing
- `COMPONENTS.md` — card anatomy, states, interactions, column specs
- `PRD_MVP.md` — product scope, column definitions, MVP constraints

Reference image to load:
- `sticker_sheet.jpg` — K-drama illustration style reference for placeholder SVGs

---

## Tech Stack
- React (functional components, hooks)
- CSS Modules or styled-components — no Tailwind (preserve exact token values)
- Google Fonts: Playfair Display + Nunito (import in index.html or global CSS)
- Tabler Icons via CDN for column header icons
- No drag and drop
- No backend — local state only for MVP (useState / useReducer)
- No localStorage or sessionStorage

---

## App Structure

```
App
├── TopBar
│   ├── Logo
│   ├── SearchBar
│   └── StatsCounter
└── KanbanBoard
    ├── Column (×4)
    │   ├── ColumnHeader
    │   ├── AddShowButton
    │   ├── Card (×N)
    │   └── EmptyState (when 0 cards)
    └── (no drag and drop)
```

---

## Data Model

```javascript
// Drama object
{
  id: string,           // uuid
  title: string,        // show title
  year: number,
  totalEpisodes: number,
  currentEpisode: number | null,  // null if not watching
  rating: number | null,          // null if unrated, 1–10 integer
  maleLead: string,               // full name
  femaleLead: string,             // full name
  platforms: string[],            // e.g. ["Netflix", "Viki"]
  posterUrl: string | null,       // null triggers placeholder illustration
  column: "backlog" | "watching" | "completed" | "rewatch"
}
```

---

## Column Definitions

| ID | Label | Icon |
|---|---|---|
| `backlog` | BACKLOG / MY WATCHLIST | `ti-device-cassette` |
| `watching` | CURRENTLY WATCHING | `ti-heart-play` |
| `completed` | COMPLETED / HISTORY | `ti-star` |
| `rewatch` | REWATCH | `ti-repeat` |

---

## Top Bar
- Left: Logo — "daebak" Playfair Display Semi-Bold + "board" Playfair Display
  Semi-Bold Italic, `#C09A7A`
- Centre: pill search bar, Nunito italic placeholder "What do you want to watch?",
  `#E8E0D8` border, `#FFFFFF` bg, border-radius 999px, padding 6px 16px
- Right: stat counters — `N tracked · N active · N done`, Nunito 11px `#7A7060`,
  numbers in Nunito Bold `#2C2C2C`, separated by 1px `#DDD5CB` dividers
- Background `#FAF7F2`, bottom border 1px `#E8E0D8`

---

## Card Component — Full Spec

See `COMPONENTS.md` for complete anatomy. Key rules:

### Layout
- Background `#FFFFFF`, border 1px `#E8E0D8`, border-radius 12px, padding 18px,
  gap 14px between thumbnail and content
- Hover: border `#D4A5A5`, box-shadow `0 4px 16px rgba(0,0,0,0.07)`

### Thumbnail
- Fixed `72×96px`, border-radius 8px, `object-fit: cover`
- No poster: warm neutral `#EDE6DF` bg + simple SVG placeholder (see below)

### Placeholder SVG illustration
- Two small circles (heads), minimal monoline body lines
- Stroke: 1.5px, `#8B7B6E`, rounded caps, no fill
- Opacity: 0.32 on `#EDE6DF` background
- Do NOT use detailed sketches, realistic figures, or icon libraries for this

### Content area
- Title: Playfair Display Semi-Bold 14px `#2C2C2C`, no italic, padding-right 48px
  (clearance for edit/remove buttons)
- Year + episodes: Nunito Regular 11px `#B0A398`, single line e.g. "2021 · 16 ep"
- Progress bar (watching column only): height 3px, fill `#C09A7A`, track `#EDE6DF`,
  border-radius 2px, width = `(currentEpisode / totalEpisodes) * 100%`,
  with "Ep N / N" label Nunito 10px `#B0A398` right-aligned
- Divider: 1px `#EDE6DF` horizontal, present on EVERY card in EVERY state
- Rating: see rating spec below
- Actors: "Male Lead · Female Lead", Nunito Medium 11px `#5A5248`,
  separator `·` in `#C4B8AE`
- Platforms: tiling pill row, wraps naturally, see platform spec below
- Move to: expandable pill row, see interaction spec below

### Edit / Remove buttons
- Appear on card hover ONLY, opacity 0 → 1 transition (0.15s)
- Position: absolute, top 10px, right 10px, flex row gap 4px
- Each button: 24×24px, border-radius 6px, border 1px `#E8E0D8`, bg `#FAF7F2`
- Pencil (edit) hover: border + icon → `#C09A7A`
- × (remove) hover: border + icon → `#E87C7C`
- Tooltip on hover: "Edit" / "Remove", Nunito 10px, bg `#2C2C2C`, text `#FFFFFF`,
  border-radius 4px, padding 3px 7px, appears above button
- CRITICAL: × button triggers a confirmation state or direct remove —
  it must NEVER be triggered by clicking outside the card

### Rating — unrated state
- Display: `— / 10`
- Both dash and `/10` in `#DDD5CB`, Playfair Display Semi-Bold 15px
- Clearly ghosted — must look notably lighter than a set score
- On tap/click: opens stepper (see below)

### Rating — stepper
- Renders inline, single line: `−` `N` `+` `/ 10`
- `−` and `+` buttons: 22×22px, border-radius 6px, `#FAF7F2` bg, `#E8E0D8` border
- Current number: Playfair Display Semi-Bold 18px `#C47E18`
- `/ 10`: Nunito 12px `#B0A398`
- All baseline aligned on one row
- Whole integers only, clamp 1–10
- Click outside or press Enter to confirm and collapse stepper

### Rating — rated state
- Number: Playfair Display Semi-Bold 16px `#C47E18`
- `/10`: Nunito 12px `#B0A398`
- Baseline aligned

### Platform pills
- Each pill: border-left 3px solid accent, bg tint, colored text, border-radius 4px,
  padding 2px 8px, Nunito Bold 10px
- Netflix: left `#E87C7C`, bg `#FDF0EE`, text `#B94040`
- Viki: left `#A98FD4`, bg `#F0EDF8`, text `#6148A8`
- Wavve: left `#5B9FE0`, bg `#EEF4FD`, text `#1A5FA8`
- Row wraps naturally, gap 4px

### Move to — expandable
- Default: `⇄ move to` — Tabler icon `ti-arrows-right-left` 10px + italic Nunito
  10px `#C4B8AE`
- Hover on trigger: color → `#9A8A7A`
- On tap: 3 column pills expand inline (all columns except current)
- Pills: height 24px, border-radius 999px, Nunito SemiBold 10px, `#FAF7F2` bg,
  `#E8E0D8` border, `#7A7060` text
- Pill hover per destination:
  - Backlog: bg `#F2D9D9`, border `#D4A5A5`, text `#8B3A3A`
  - Watching: bg `#D6E8D6`, border `#7BBD9B`, text `#2A6647`
  - Completed: bg `#E0D6EE`, border `#A98FD4`, text `#4A3880`
  - Rewatch: bg `#FCE8D8`, border `#E0AA80`, text `#8B4A20`
- After selection: pills collapse, card moves to selected column
- CRITICAL: clicking outside expanded card collapses move-to pills only —
  it does NOT delete or edit the card

---

## Column Component

### Header
- Border-radius 7px, padding 9px 12px, flex row space-between
- Left: Tabler icon (12px, column tint dark) + uppercase Nunito Bold label
  (9.5px, letter-spacing 0.12em)
- Right: count badge — 18×18px circle, column tint bg, 1.5px border, Nunito Bold
  10px — must reflect DYNAMIC card count, updates on add/move/remove

### Add show button
- Identical dashed pill across ALL four columns — no exceptions
- Full column width, border 1px dashed `#D8CFC7`, border-radius 8px,
  `+ Add show` Nunito 11px `#B0A398`, bg transparent, padding 7px 12px
- Hover: border → `#C09A7A`, text → `#7A7060`
- On click: opens inline input or search field within the column
- Pinned below column header, above cards

### Empty state
- Dashed border card `#D8CFC7`, bg `#FAF7F2`, border-radius 10px, padding 24px,
  centered content, flex column, gap 8px
- SVG illustration: gestural couple or object, monoline 1.5px `#8B7B6E`,
  single warm accent fill at 20% opacity, opacity 0.32 overall
- Caption: Playfair Display Italic 11px `#C4B8AE`
  - Backlog: *"Nothing here yet. Add your first drama."*
  - Watching: *"Nothing playing. Time to press play."*
  - Completed: *"No finished dramas yet. Keep watching."*
  - Rewatch: *"Nothing here yet. Time to start a new journey."*

---

## Critical Interaction Rules

1. **Clicking outside an expanded card = collapse only. Never delete.**
2. **Delete fires ONLY from explicit × button click.**
3. **Edit fires ONLY from explicit pencil button click.**
4. **Column count badge is always dynamic — never hardcoded.**
5. **Progress bar width is always calculated — never hardcoded.**
6. **Add show pattern is identical across all 4 columns.**
7. **No drag and drop — move to pills are the only reorder mechanism.**
8. **Rating stepper clamps at 1 minimum, 10 maximum.**

---

## Do Not
- Do not use Tailwind utility classes — use CSS with exact token values
- Do not use browser localStorage or sessionStorage
- Do not add columns beyond the 4 defined
- Do not add a "Dropped" column — out of MVP scope
- Do not use stock icon libraries for placeholder illustrations — use inline SVG
- Do not add features not described in PRD_MVP.md
- Do not use bright primary colors, cartoon fonts, or emoji in UI chrome
- Do not make thumbnails any size other than 72×96px
