# Encounter_Template_A

A vertical **title → image → caption** card. It's a variant of `Process_Template_Below`: the caption is split off from the title and moved **below** the image, and its **bottom edge mirrors the title's top-edge tab treatment**. So the image is framed by two Secondary-color tabs — a title tab emerging from above it, and a caption tab emerging from below it — each with a 3px Primary border on its outer edge and matching rounded outer corners.

Example in the page: Encounter & Quest Design → the two "Tavern Trouble" cards (shown side by side).

---

## Usage

```html
<div class="encounter-a">
  <div class="encounter-a__title">
    <p class="spellcard-a__caption-title">Encounter Name</p>
  </div>
  <img class="encounter-a__image expandable-image"
       src="…/encounter-screenshot.jpg" alt="Encounter Name screenshot" />
  <div class="encounter-a__caption">
    <p class="spellcard-a__caption-body"><strong style="font-weight:700;">Type:</strong> Tutorial</p>
    <p class="spellcard-a__caption-body">One or two sentences describing the encounter.</p>
  </div>
</div>
```

`expandable-image` (optional) makes the image click-to-fullscreen via the lightbox.

---

## Layout

```
┌──────────────────────────────────┐  ─┐  ← title tab: 3px Primary top border,
│  Title                            │   │     top corners rounded, Secondary fill,
├══════════════════════════════════┤  ─┤     tucks 10px under the image top
│                                  │   │
│              IMAGE               │   │  scales to 100% of wrap width
│      (3px Primary border,        │   │  height: auto (preserves aspect)
│         6px radius)              │   │
├══════════════════════════════════┤  ─┤  ← caption tab: MIRRORED — 3px Primary
│  Type: … / body copy             │   │     BOTTOM border, bottom corners rounded,
└──────────────────────────────────┘  ─┘     Secondary fill, tucks 10px under image bottom
↑                                  ↑
│←────── 730px wrap width ────────→│
```

Both tabs sit at `z-index: -1` behind the image (the wrap has `isolation: isolate`), so the overlap is hidden — visually each tab meets the image at its edge. The title tab's `::before` is lowered 5px (`margin-top: 5px`); the caption tab's is raised 5px (`margin-bottom: 5px`) — the mirror of that offset.

| Part | Class | Size / role |
|---|---|---|
| Wrap | `.encounter-a` | Flex column, **730 × auto**, centered (`margin: 8px auto 0`), `gap: 10px`, `isolation: isolate`. |
| Title block | `.encounter-a__title` | `position: relative; padding: 0 9px; margin-top: 5px`. |
| Title tab bg | `.encounter-a__title::before` | Secondary `#324158` @ 80%. `top: -10px; bottom: -20px` (tucks 10px under image top). `border-radius: 6px 6px 0 0`. `border-top: 3px solid #EDE9E1`. `z-index: -1`. |
| Image | `.encounter-a__image` | `width: 100%`, fixed `aspect-ratio: 3 / 1.9` (a 3:2 frame with the height trimmed 5%), `object-fit: cover` + `object-position: center` so every card's image is the same height regardless of source aspect. 3px `#EDE9E1` border, 6px radius. |
| Caption block | `.encounter-a__caption` | `position: relative; padding: 0 9px; margin-bottom: 5px`. |
| Caption tab bg | `.encounter-a__caption::before` | Mirror of the title tab: `top: -20px; bottom: -10px` (tucks 10px under image bottom). `border-radius: 0 0 6px 6px`. `border-bottom: 3px solid #EDE9E1`. `z-index: -1`. |

---

## Typography

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` — quoted at **scale 1**: 16px underlined title; 14px, weight 400 (not bold), body. This template's section is **not** zoomed, so those classes render at their literal px here (see `SpellCard_Template_A.md`).

The Tavern Trouble instance overrides the title inline for a bolder header: **Tungsten, 35px, uppercase, no underline**. Its caption's first line labels the encounter type with a bold `Type:` and no parentheses (`<strong>Type:</strong> Tutorial`).

---

## Stacking / arrangement

Each `.encounter-a` is a self-contained 730px block. To place two side by side (as on the page), wrap them in a flex row and let each flex to share the width:

```html
<div class="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-7"
     style="margin-left:35px; margin-right:35px;">
  <div class="encounter-a" style="width: auto; flex: 1 1 0; min-width: 0; margin: 0;"> … </div>
  <div class="encounter-a" style="width: auto; flex: 1 1 0; min-width: 0; margin: 0;"> … </div>
</div>
```

The `35px` side margins inset the pair 35px from the edges of the section-title's flanking lines.
