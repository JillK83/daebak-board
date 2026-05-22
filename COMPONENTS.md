# Daebak Board — Component Specs
Version 2.0

Reference DESIGN_SYSTEM.md for all token values.
Reference GEMINI_CLI_PROMPT.md for build instructions.

---

## Card Component

### Anatomy (default state)

```
┌─────────────────────────────────────────┐
│                              [✎]  [×]  │  ← hover only
│  [Thumb]   Show Title                   │
│  72×96px   Playfair SemiBold 14px       │
│            2021 · 16 ep                 │
│            ████░░░░  Ep 8 / 16          │  ← watching column only
│            ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │  ← divider, always present
│            — / 10  (ghosted)            │  ← or  9 / 10  (gold)
│            Male Lead · Female Lead      │
│            [Netflix]  [Viki]            │
│            ⇄ move to                   │  ← expands on tap
└─────────────────────────────────────────┘
```

### States

| State | Border | Shadow | Edit/Remove |
|---|---|---|---|
| Default | `#E8E0D8` | none | hidden |
| Hover | `#D4A5A5` | `0 4px 16px rgba(0,0,0,0.07)` | visible |
| Expanded (move to open) | `#D4A5A5` | lifted | visible |

### Thumbnail
- Size: exactly `72×96px`, enforced with `min-width`, `max-width`, `height`
- Border-radius: 8px
- With poster: `object-fit: cover`, `object-position: center top`
- Without poster: `#EDE6DF` bg + centered placeholder SVG at 0.32 opacity

### Placeholder SVG (no poster)
```svg
<!-- Two figures under umbrella — adapt per column motif -->
<svg width="48" height="60" viewBox="0 0 48 60" opacity="0.32">
  <!-- Head circles -->
  <circle cx="18" cy="28" r="5" fill="none" stroke="#8B7B6E" stroke-width="1.5"/>
  <circle cx="30" cy="28" r="5" fill="none" stroke="#8B7B6E" stroke-width="1.5"/>
  <!-- Body lines -->
  <line x1="18" y1="33" x2="16" y2="46" stroke="#8B7B6E" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="30" y1="33" x2="32" y2="46" stroke="#8B7B6E" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Arms reaching toward each other -->
  <line x1="18" y1="38" x2="25" y2="36" stroke="#8B7B6E" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="30" y1="38" x2="23" y2="36" stroke="#8B7B6E" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```
Keep SVG as simple as this — do not increase complexity.

---

## Rating Component

### Unrated state
```
— / 10
```
- Both `—` and `/ 10`: Playfair Display SemiBold 15px `#DDD5CB`
- Cursor: pointer
- Hover: both elements warm slightly to `#C09A7A`
- On click: transitions to stepper

### Stepper state (inline, single row)
```
[−]  8  [+]  / 10
```
- `−` / `+` buttons: 22×22px, border-radius 6px, `#FAF7F2` bg, `#E8E0D8` border
- Button hover: bg `#FFF`, border `#C09A7A`
- Number: Playfair Display SemiBold 18px `#C47E18`
- `/ 10`: Nunito Regular 12px `#B0A398`
- All elements: `align-items: baseline` on flex row
- Min value: 1, Max value: 10, step: 1
- Confirm: click outside card or press Enter
- After confirm: transitions to rated state

### Rated state
```
9 / 10
```
- Number: Playfair Display SemiBold 16px `#C47E18`
- `/ 10`: Nunito Regular 12px `#B0A398`
- `align-items: baseline`
- Click to re-open stepper

---

## Edit / Remove Buttons

- Container: `position: absolute; top: 10px; right: 10px; display: flex; gap: 4px`
- Visibility: `opacity: 0` default, `opacity: 1` on parent card hover
- Transition: `opacity 0.15s ease`

### Individual button
- Size: 24×24px
- Border-radius: 6px
- Border: 1px solid `#E8E0D8`
- Background: `#FAF7F2`
- Icon size: 12px, color `#7A7060` default

### Pencil (edit) hover
- Border: `#C09A7A`
- Icon: `#C09A7A`
- Tooltip: "Edit"

### × (remove) hover
- Border: `#E87C7C`
- Icon: `#E87C7C`
- Tooltip: "Remove"

### Tooltip
- Background: `#2C2C2C`
- Text: `#FFFFFF`, Nunito Regular 10px
- Border-radius: 4px
- Padding: 3px 7px
- Position: above button, centered

### Critical rules
- × click → delete card (with optional confirm state)
- Pencil click → open edit modal or inline edit
- Click outside card → collapse only, NEVER delete
- These actions must be fully decoupled

---

## Move To Component

### Trigger (default)
- Icon: `ti-arrows-right-left` Tabler, 10px, `#C4B8AE`
- Label: "move to", Nunito Italic Regular 10px, `#C4B8AE`
- Hover: both → `#9A8A7A`
- Cursor: pointer

### Expanded state
Three pills appear inline, wrapping if needed:
- Shows all columns EXCEPT current column
- Pill: height 24px, border-radius 999px, padding 0 10px
- Default: `#FAF7F2` bg, `#E8E0D8` border, `#7A7060` text, Nunito SemiBold 10px

### Pill hover states
| Destination | Background | Border | Text |
|---|---|---|---|
| Backlog | `#F2D9D9` | `#D4A5A5` | `#8B3A3A` |
| Currently Watching | `#D6E8D6` | `#7BBD9B` | `#2A6647` |
| Completed | `#E0D6EE` | `#A98FD4` | `#4A3880` |
| Rewatch | `#FCE8D8` | `#E0AA80` | `#8B4A20` |

### After selection
- Pills collapse immediately
- Card moves to selected column
- Column count badges update

---

## Platform Badge Component

```
[Netflix]  [Viki]  [Wavve]
```
- Container: flex row, flex-wrap, gap 4px
- Each badge: `border-left: 3px solid [accent]`, border-radius 4px,
  padding 2px 8px, Nunito Bold 10px
- No hover state — static display only

---

## Progress Bar Component (Watching column only)

```
████████░░░░░░░  Ep 8 / 16
```
- Bar container: `flex: 1`, height 3px, background `#EDE6DF`, border-radius 2px
- Fill: background `#C09A7A`, border-radius 2px
- Width: `calc((currentEpisode / totalEpisodes) * 100%)`
- Label: "Ep N / N", Nunito Regular 10px `#B0A398`, right-aligned, white-space nowrap
- Layout: flex row, align-items center, gap 8px

---

## Column Component

### Header
```
[icon]  COLUMN LABEL             [N]
```
- Container: border-radius 7px, padding 9px 12px, flex row, justify-content space-between, align-items center
- Background: column tint (see DESIGN_SYSTEM.md)
- Icon: Tabler 12px, column dark text color
- Label: Nunito Bold 9.5px, uppercase, letter-spacing 0.12em, column dark text color
- Gap between icon and label: 6px

### Count Badge
- Size: 18×18px circle
- Background: column tint bg
- Border: 1.5px solid column border color
- Text: Nunito Bold 10px, column dark text color
- Value: DYNAMIC — reflects actual card count in column
- Updates on: card add, card remove, card move

### Add Show Button
- Identical across ALL four columns — no exceptions
- Full width, border 1px dashed `#D8CFC7`, border-radius 8px
- Label: `+ Add show`, Nunito Regular 11px `#B0A398`
- Background: transparent
- Padding: 7px 12px
- Hover: border → `#C09A7A`, text → `#7A7060`
- Position: pinned directly below column header, above card list
- On click: opens inline input or search — consistent behavior all columns

---

## Empty State Component

Shown when a column has 0 cards.

```
┌ - - - - - - - - - - - - - - ┐
│                              │
│    [SVG illustration]        │
│                              │
│  "Nothing here yet. Time     │
│   to start a new journey."  │
│                              │
└ - - - - - - - - - - - - - - ┘
```

- Border: 1px dashed `#D8CFC7`
- Background: `#FAF7F2`
- Border-radius: 10px
- Padding: 24px
- Flex column, align-items center, gap 8px, text-align center

### Illustration
- Simple SVG, gestural, monoline 1.5px `#8B7B6E`, opacity 0.32
- Size: ~80px tall
- See motif suggestions in DESIGN_SYSTEM.md

### Caption
- Playfair Display Italic Regular 11px `#C4B8AE`
- Per column:
  - Backlog: *"Nothing here yet. Add your first drama."*
  - Watching: *"Nothing playing. Time to press play."*
  - Completed: *"No finished dramas yet. Keep watching."*
  - Rewatch: *"Nothing here yet. Time to start a new journey."*

---

## Top Bar Component

```
daebakboard    [  What do you want to watch?  ]    8 tracked · 2 active · 2 done
```

- Background: `#FAF7F2`
- Border-bottom: 1px solid `#E8E0D8`
- Padding: 12px 20px
- Flex row, align-items center, gap 14px

### Logo
- "daebak": Playfair Display SemiBold 17px `#2C2C2C`
- "board": Playfair Display SemiBold Italic 17px `#C09A7A`
- No space between words in rendering

### Search bar
- Flex: 1 (grows to fill space)
- Background: `#FFFFFF`
- Border: 1px solid `#E8E0D8`
- Border-radius: 999px
- Padding: 6px 16px
- Placeholder: Nunito Italic 12px `#B0A398`
- Search icon: left-aligned inside bar, `#C4B8AE`

### Stats
- Pattern: `N tracked · N active · N done`
- Numbers: Nunito Bold 13px `#2C2C2C`
- Labels: Nunito Regular 11px `#7A7060`
- Separators: 1px `#DDD5CB` vertical dividers, height 14px
- Gap between stat groups: 10px
- All values dynamic

---

## Interaction Summary

| Interaction | Trigger | Result |
|---|---|---|
| Card hover | Mouse enter card | Border → dusty rose, shadow lifts, edit/remove appear |
| Card click-outside | Click outside expanded card | Collapse move-to pills only |
| Edit click | Click pencil button | Open edit flow |
| Remove click | Click × button | Delete card (confirm optional) |
| Rating tap (unrated) | Click `— / 10` | Open stepper inline |
| Rating stepper `+` | Click + | Increment by 1, max 10 |
| Rating stepper `−` | Click − | Decrement by 1, min 1 |
| Rating confirm | Click outside or Enter | Close stepper, save value |
| Move to tap | Click `⇄ move to` | Expand column pills |
| Move to pill click | Click destination pill | Move card, collapse pills, update badges |
| Add show click | Click `+ Add show` | Open inline search/input |
| Column badge | Automatic | Always reflects live card count |
