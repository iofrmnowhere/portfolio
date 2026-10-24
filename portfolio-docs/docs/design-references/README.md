# Design references

Screenshots of the visual style Gio wants. The target look is **neo-brutalist / retro**. Use these as direction, not as something to copy exactly.

## What to take from each

| File | Take | Do not take |
|---|---|---|
| `04-komi-store-cards.png` | Cream background, thick black borders, hard offset shadows, bold condensed uppercase headings, tilted/angled tab labels, red accent, clean card layout with a metadata row | The bottom tab bar (mobile app UI) |
| `02-joshua-grid-layout.png` | Boxy grid layout with thick borders, mono-font labels, "View my work" and "Download resume" button pairing, project card with tags, offset-shadow buttons, a clear header bar | The pink/lime/purple palette (too many colors), the fake certification blocks, the animated-looking starburst |
| `01-robin-pixel-name-hero.png` | **The pixel-font name in the hero** (this is the one retro touch), the simple one-line headline under it, a single clear contact button | Tape, stickers, handwriting, emoji, polaroid photos, colored sticky labels |
| `03-retro-pixel-styleguide.png` | Square-bracket button and tab labels like `[ BUTTON ]`, dotted section dividers, monospace UI text, a clear focus-ring concept | Neon green (`#00FF00`) as a color, which fails contrast on light backgrounds. Also skip the isometric elevation graphic and the system-alert window chrome. |

## Palette for this project

Cream background, near-black text, **two accents only**: red-orange and yellow, used as fills behind black text, never as text on cream. Confirm exact hex values with a contrast check (see `docs/techspec.md` section 9).

## Typography for this project

Anton (headings), Space Mono (labels, tags, buttons), Inter (body), Pixelify Sans (the name in the hero only).
