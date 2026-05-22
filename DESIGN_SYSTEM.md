# Daebak Board — Design System
Version 2.0 · K-drama kanban tracker

Mood: Warm · Considered · Nostalgic · Quietly Playful · Legible · Intimate
Reference aesthetic: Kinfolk magazine meets K-drama fan culture

---

## Typography

### Fonts
- **Display / Titles**: Playfair Display (Google Fonts)
- **UI / Body / Labels**: Nunito (Google Fonts)

Import:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400;1,600&family=Nunito:wght@400;500;600;700&display=swap');
```

### Type Scale

| Role | Font | Style | Weight | Size | Color |
|---|---|---|---|---|---|
| Logo "daebak" | Playfair Display | Normal | SemiBold | 17px | `#2C2C2C` |
| Logo "board" | Playfair Display | Italic | SemiBold | 17px | `#C09A7A` |
| Show title | Playfair Display | Normal | SemiBold | 14–16px | `#2C2C2C` |
| Rating set | Playfair Display | Normal | SemiBold | 16px | `#C47E18` |
| Rating stepper number | Playfair Display | Normal | SemiBold | 18px | `#C47E18` |
| Rating unset | Playfair Display | Normal | SemiBold | 15px | `#DDD5CB` |
| Empty state caption | Playfair Display | Italic | Regular | 11px | `#C4B8AE` |
| Column header label | Nunito | Normal | Bold | 9.5px | column dark tint |
| Year · episode count | Nunito | Normal | Regular | 11px | `#B0A398` |
| Actor names | Nunito | Normal | Medium | 11px | `#5A5248` |
| Platform badge text | Nunito | Normal | Bold | 10px | per platform |
| Move to microcopy | Nunito | Italic | Regular | 10px | `#C4B8AE` |
| Move to pills | Nunito | Normal | SemiBold | 10px | `#7A7060` |
| Stat counters label | Nunito | Normal | Regular | 11px | `#7A7060` |
| Stat counters number | Nunito | Normal | Bold | 13px | `#2C2C2C` |
| Search placeholder | Nunito | Italic | Regular | 12px | `#B0A398` |
| Add show button | Nunito | Normal | Regular | 11px | `#B0A398` |
| Tooltip | Nunito | Normal | Regular | 10px | `#FFFFFF` |
| Rating /10 | Nunito | Normal | Regular | 12px | `#B0A398` |

### Rules
- Column header labels: `text-transform: uppercase; letter-spacing: 0.12em`
- Show titles: never italic in cards
- All body text: anti-aliased, min contrast ratio 4.5:1 against card bg (WCAG 2A)

---

## Color Palette

### Base
| Token | Name | Hex |
|---|---|---|
| `--color-base` | Warm Cream | `#FAF7F2` |
| `--color-card` | White | `#FFFFFF` |
| `--color-thumb-bg` | Linen | `#EDE6DF` |
| `--color-divider` | Warm Divider | `#EDE6DF` |
| `--color-border` | Warm Gray | `#E8E0D8` |
| `--color-border-hover` | Dusty Rose | `#D4A5A5` |
| `--color-border-dashed` | Dashed Gray | `#D8CFC7` |

### Text
| Token | Name | Hex |
|---|---|---|
| `--color-text-primary` | Charcoal | `#2C2C2C` |
| `--color-text-secondary` | Warm Muted | `#7A7060` |
| `--color-text-ghost` | Pale Taupe | `#B0A398` |
| `--color-text-actors` | Soft Charcoal | `#5A5248` |
| `--color-text-placeholder` | Pale Gray | `#DDD5CB` |

### Column Headers
| Token | Column | Hex |
|---|---|---|
| `--color-backlog-bg` | Blush | `#F2D9D9` |
| `--color-backlog-text` | Deep Rose | `#8B3A3A` |
| `--color-backlog-border` | Rose | `#D4A5A5` |
| `--color-watching-bg` | Sage | `#D6E8D6` |
| `--color-watching-text` | Forest | `#2A6647` |
| `--color-watching-border` | Green | `#7BBD9B` |
| `--color-completed-bg` | Lavender | `#E0D6EE` |
| `--color-completed-text` | Plum | `#4A3880` |
| `--color-completed-border` | Violet | `#A98FD4` |
| `--color-rewatch-bg` | Peach | `#FCE8D8` |
| `--color-rewatch-text` | Burnt Orange | `#8B4A20` |
| `--color-rewatch-border` | Warm Orange | `#E0AA80` |

### Interactive
| Token | Name | Hex |
|---|---|---|
| `--color-rating-gold` | Honey | `#C47E18` |
| `--color-rating-unset` | Pale Gray | `#DDD5CB` |
| `--color-progress-fill` | Warm Brown | `#C09A7A` |
| `--color-progress-track` | Linen | `#EDE6DF` |
| `--color-edit-hover` | Warm Tan | `#C09A7A` |
| `--color-remove-hover` | Soft Red | `#E87C7C` |
| `--color-logo-accent` | Warm Tan | `#C09A7A` |

### Platform Badges
| Platform | Left Border | Background | Text |
|---|---|---|---|
| Netflix | `#E87C7C` | `#FDF0EE` | `#B94040` |
| Viki | `#A98FD4` | `#F0EDF8` | `#6148A8` |
| Wavve | `#5B9FE0` | `#EEF4FD` | `#1A5FA8` |

---

## Spacing & Shape Tokens

| Token | Value |
|---|---|
| `--radius-card` | 12px |
| `--radius-column-header` | 7px |
| `--radius-platform-pill` | 4px |
| `--radius-move-pill` | 999px |
| `--radius-action-btn` | 6px |
| `--radius-stepper-btn` | 6px |
| `--radius-search` | 999px |
| `--radius-empty` | 10px |
| `--padding-card` | 18px |
| `--gap-card-inner` | 14px |
| `--thumb-width` | 72px |
| `--thumb-height` | 96px |
| `--action-btn-size` | 24px |
| `--stepper-btn-size` | 22px |
| `--badge-size` | 18px |
| `--progress-height` | 3px |
| `--card-shadow-hover` | `0 4px 16px rgba(0,0,0,0.07)` |
| `--column-divider` | `1px solid #E8E0D8` |
| `--card-divider` | `1px solid #EDE6DF` |
| `--topbar-border` | `1px solid #E8E0D8` |

---

## Illustration Style

Used in: card thumbnail placeholders, column empty states.

### Rules
- Style: monoline, gestural, minimal
- Stroke: 1.5px, `#8B7B6E`, `stroke-linecap: round`, `stroke-linejoin: round`
- Fill: single warm accent at 15–20% opacity maximum, or no fill
- Figures: faceless or softly featured, two-person compositions preferred
- Overall opacity: 0.30–0.35 on `#EDE6DF` background
- Implementation: inline SVG only — no image files, no icon libraries
- Complexity: as simple as possible — two circles for heads, minimal line bodies
- Reference style: K-drama sticker illustration sheet (see `sticker_sheet.jpg`)

### Motif suggestions by column
| Column | Card placeholder | Empty state |
|---|---|---|
| Backlog | Cassette tape | Cassette tape |
| Watching | Two figures sharing a drink | Two figures, one pointing at screen |
| Completed | Open letter or book | Open letter |
| Rewatch | Umbrella couple | Umbrella couple walking |

---

## What This Is NOT
- Not bubbly or childish — no rounded cartoon fonts, no bright primary colors
- Not cold or corporate — no pure grays, no tight spacing, no data-table density
- Not maximalist — illustrations are whispers not statements
- Not photo-dependent — design holds without real poster images
- Not emoji-decorated — no emoji in UI chrome
