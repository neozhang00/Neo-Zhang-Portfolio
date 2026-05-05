# Class & Grouping Reference

Quick-reference for everything you can call by name in `index.html`. Grouped by purpose. Tailwind utility classes are not listed — these are only the custom CSS classes defined in the page's `<style>` block, plus the page-level identifiers (anchor IDs, theme color tokens) you use for navigation and styling.

---

## Section anchors (IDs)
Used for the sticky-nav jump-to-section links.

| ID | Section |
|---|---|
| `#top` | Main entry (top of `<main>`) |
| `#feature` | Hero / cinemascope intro |
| `#character-design` | Combat Design (Hero / Boss / Enemy carousel) |
| `#mission-design` | Mission & Encounter |
| `#vanguard` | Vanguard slide content |
| `#champion` | Champion slide content |
| `#wurm` | Wurm slide content |
| `#prototypes`, `#blogs`, `#about` | Reserved (linked from nav, not yet built) |

---

## Tailwind theme color tokens
Defined in the inline `tailwind.config`. Use as `bg-ink`, `text-cream`, `border-paper`, etc.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0c0c0d` | Primary dark text / surfaces |
| `cream` | `#ece6df` | Light text on dark sections |
| `paper` | `#f4efe8` | Light page background |
| `beat1` | `#fbc8c2` | Accent (peach) |
| `beat2` | `#f7d599` | Accent (gold) |
| `beat3` | `#f5c0db` | Accent (pink) |
| `beat4` | `#bfd9ec` | Accent (sky) |

Brand colors per `Guideline.md`: Main `#EDE9E1`, Secondary `#324158`, Vanguard `#FFEF90`, Champion `#B797FF`, Wurm `#FF8888`.

---

## Layout utilities

| Class | Purpose |
|---|---|
| `.container-x` | Centered content wrapper. `max-width: 1180px`, horizontal padding 24px. |
| `.anchor` | Adds `scroll-margin-top: 110px` so anchor jumps don't hide under sticky nav. |
| `.stitch` | Small dark hairline divider (1px × 56px), centered. |
| `.h-display` | Big display heading style (Inter, weight 800, tracking -0.02em). |

---

## Buttons

### Header / nav
| Class | Purpose |
|---|---|
| `.nav-pill` | Header nav link pill (white outline + 4×4 hard shadow) on `#324158` band. |
| `.nav-mobile-trigger` | Hamburger button shown ≤950px. |
| `.nav-mobile-panel` | Mobile nav dropdown container. Add `.is-open` to show. |

### Body
| Class | Purpose |
|---|---|
| `.pill` | Light button on cream sections — white fill, `#324158` outline, 5×5 hard shadow. |

### Combat Design carousel toggles
| Class | Color |
|---|---|
| `.combat-btn` | Base style: black outline, 3×3 hard shadow. |
| `.combat-btn-hero` | Yellow (`#FFEF90`) — Hero Class tab |
| `.combat-btn-boss` | Lavender (`#B797FF`) — Boss tab |
| `.combat-btn-enemy` | Pink (`#FF8888`) — Enemy tab |

### Role tags (prev/next labels inside slides)
| Class | Color |
|---|---|
| `.role-tag` | Base style. Use `.small` on the inner "Hero / Monster" caption. |
| `.role-tag.yellow` | Vanguard yellow |
| `.role-tag.pink` | Wurm pink |
| `.role-tag.purple` | Champion lavender |

---

## Cards & containers

| Class | Purpose |
|---|---|
| `.bordercard` | White card with 2.5px `#324158` outline. Used for the responsibilities article. |
| `.yellow-card` | Vanguard banner — yellow fill, hard shadow. |
| `.lav-card` | Champion banner — lavender fill. |
| `.wurm-card` | Wurm banner — coral fill. |
| `.stat-card` | Dark passive-ability card (`#1a1820` fill, cream border + ring). |
| `.proc-box` | Design-process box (black outline, ~13.5px text). Pair with `<h5>` for caption. |
| `.frame` | Image/video frame — thin cream border, soft outer shadow, rounded 14px. |

---

## SpellCard_Template_A
Reusable layout: image (left, no border) overlaps a video frame (center), with a caption block (right). Total group is 730×271, centered.

```html
<div class="spellcard-a-wrap">
  <div class="spellcard-a">
    <img class="spellcard-a__image" src="..." />
    <div class="spellcard-a__video">VIDEO</div>
    <div class="spellcard-a__caption">
      <p class="spellcard-a__caption-title">Title</p>
      <p class="spellcard-a__caption-body">Body…</p>
    </div>
  </div>
</div>
```

| Class | Role |
|---|---|
| `.spellcard-a-wrap` | Outer positioning context. |
| `.spellcard-a` | 730×271 group, centered via `left:50%; translateX(-50%)`. |
| `.spellcard-a__image` | Spell card art, 168×271, top-left of group. |
| `.spellcard-a__video` | Video frame, 424×238, slightly inset. |
| `.spellcard-a__caption` | 145px caption column on the right (9px gap from video). |
| `.spellcard-a__caption-title` | Cream, underlined, 14px. |
| `.spellcard-a__caption-body` | Cream/85%, left-aligned, 12.5px, line-height 1.625. |

Companion: `.spellcard-img` — generic spell-card image with black outline + soft shadow (used outside the template).

See full spec: `Template/SpellCard_Template_A.md`.

---

## Process_Template_Below
Vertical two-piece layout: Secondary-color caption tab stacked above a Primary-bordered image. Caption's `::before` tab tucks 10px under the image's top edge (image at z-index auto, tab at z-index −1, wrap has `isolation: isolate`). Image scales by width to match the rectangle's width (730px).

```html
<div class="process-tb">
  <div class="process-tb__caption">
    <p class="spellcard-a__caption-title">Title</p>
    <p class="spellcard-a__caption-body">Body…</p>
  </div>
  <img class="process-tb__image expandable-image" src="…" alt="…" />
</div>
```

| Class | Role |
|---|---|
| `.process-tb` | Outer wrap. Flex column, 730px wide, `gap: 10px`, `isolation: isolate`. |
| `.process-tb__caption` | Caption block. `position: relative`, `padding: 0 9px` for inner L/R spacing. |
| `.process-tb__caption::before` | Tab background (Secondary `#324158` @ 80%). Top corners rounded 6px, 3px Primary `#EDE9E1` top border. Auto-scales with caption text and tucks 10px under the image. |
| `.process-tb__image` | Image. `width: 100%` (= rectangle width), `height: auto`, 3px Primary border, 6px radius. |

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` for typography.

See full spec: `Template/Process_Template_Below.md`.

### Add expand-to-lightbox to the image
Add the `.expandable-image` class on the `<img>`, or call `ImageViewNav(imgEl)` for dynamically-added images. See `Functions/ImageViewNav.md`.

---

## Process_Template_Right
Horizontal counterpart to Process_Template_Below: caption tab on the LEFT, image on the RIGHT. The caption's right edge sits flush against the image (no flex gap). Top-left + bottom-left corners rounded; 3px Primary border on the left edge. Width ratio **caption : image = 1 : 3** (via `flex: 1` / `flex: 3`) within the 730px wrap (182.5 + 547.5). Text is top-aligned with 9px symmetric vertical padding; rectangle bottom auto-follows the text (caption is not stretched to image height).

```html
<div class="process-tr">
  <div class="process-tr__caption">
    <p class="spellcard-a__caption-title">Title</p>
    <p class="spellcard-a__caption-body">Body…</p>
  </div>
  <img class="process-tr__image expandable-image" src="…" alt="…" />
</div>
```

| Class | Role |
|---|---|
| `.process-tr` | Outer wrap. Flex row, 730px wide, `gap: 0`, `isolation: isolate`, `align-items: flex-start`. |
| `.process-tr__caption` | Caption block. `flex: 1 1 0` (1 part of 1:3 ratio), `min-width: 0`. Padding `9px 10px` (symmetric vertical). Flex-column with `justify-content: flex-start` to anchor text to the top. |
| `.process-tr__caption::before` | Tab background. Secondary `#324158` @ 80%. Element exactly matches caption block. Top-left + bottom-left rounded 6px, 3px Primary `#EDE9E1` left border. Auto-follows the caption height (= text + 18px). |
| `.process-tr__image` | Image. `flex: 3 1 0` (3 parts), `min-width: 0`, `align-self: flex-start`. 3px Primary border, 6px radius. |

---

## Process_Template_Left
Mirror of Process_Template_Right: image on the LEFT, caption tab on the RIGHT. The caption's left edge sits flush against the image (no flex gap). Top-right + bottom-right corners rounded; 3px Primary border on the right edge. Default width ratio **image : caption = 2 : 1** (via `flex: 2` / `flex: 1`) within the 730px wrap (486.7 + 243.3). Text is top-aligned with 9px symmetric vertical padding; rectangle bottom auto-follows the text (caption is not stretched to image height).

```html
<div class="process-tl">
  <img class="process-tl__image expandable-image" src="…" alt="…" />
  <div class="process-tl__caption">
    <p class="spellcard-a__caption-title">Title</p>
    <p class="spellcard-a__caption-body">Body…</p>
  </div>
</div>
```

| Class | Role |
|---|---|
| `.process-tl` | Outer wrap. Flex row, 730px wide, `gap: 0`, `isolation: isolate`, `align-items: flex-start`. |
| `.process-tl__image` | Image. `flex: 2 1 0` (2 parts of 2:1 ratio), `min-width: 0`, `align-self: flex-start`. 3px Primary border, 6px radius. |
| `.process-tl__caption` | Caption block. `flex: 1 1 0` (1 part of 2:1 ratio), `min-width: 0`. Padding `9px 10px` (symmetric vertical). Flex-column with `justify-content: flex-start` to anchor text to the top. |
| `.process-tl__caption::before` | Tab background. Secondary `#324158` @ 80%. Element exactly matches caption block. Top-right + bottom-right rounded 6px, 3px Primary `#EDE9E1` right border. Auto-follows the caption height (= text + 18px). |

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` for typography.

See full spec: `Template/Process_Template_Left.md`.

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` for typography. Constraint: image height should be ≥ caption text height — see `Template/Process_Template_Right.md` for details.

See full spec: `Template/Process_Template_Right.md`.

---

## Image & video treatments

| Class | Purpose |
|---|---|
| `.grain` | SVG noise overlay (mix-blend overlay, 32% opacity). Add to a `position:relative` element. |
| `.img-treat` | `::after` gradient overlay (black 35% → transparent 55%, top-up). Adds depth to images. |
| `.portrait-clip` | Container for character portraits — top can escape the parent, bottom clips inside the border. |
| `.video-slot` | Placeholder text styling for empty video frames. |
| `.video-click-overlay` | Clickable layer over a video. Add `.is-paused` to reveal the pause icon. |
| `.video-pause-icon` | Pause SVG centered inside `.video-click-overlay`; opacity 0 by default. |

---

## Stat-card keyword highlights
Inside `.stat-card` text, wrap keywords in `<span class="kw …">`:

| Class | Color |
|---|---|
| `.kw` | Base bold weight. |
| `.kw.attack` | `#f0985e` |
| `.kw.grit` | `#e1b045` |
| `.kw.exposed` | `#f6c563` |
| `.kw.shield` | `#7ec0f0` |
| `.kw.execute` | `#e95f5f` |
| `.kw.deal` | `#f08a5e` |
| `.kw.gain` | `#d8c45a` |
| `.kw.move` | `#6ec0e8` |
| `.kw.knockback` | `#8ed688` |
| `.kw.subdivide` | `#efe9df` |
| `.kw.title` | `#efe9df` |

---

## Character carousel (Section_HeroBossEnemy)

| Class | Role |
|---|---|
| `.char-carousel` | Outer carousel wrapper. |
| `.char-viewport` | Clipping window (overflow-x: clip). |
| `.char-track` | Flex track that translateX-es between slides. |
| `.char-slide` | Single slide, `flex: 0 0 100%`. |
| `.arrow-rail` | Sticky rail (top: 50vh) for prev/next arrows. |
| `.carousel-arrow` | Square 52×52 arrow button; modifiers `.prev` / `.next`. |
| `.carousel-dots` | Dot row beneath the carousel. |
| `.carousel-dot` | Single dot; add `.active` for the current slide. |

---

## Section backgrounds & hero

| Class | Purpose |
|---|---|
| `.section-rubble-bg` | Section wrapper with fixed/blurred RubbleMaze image as `::before`. Children are auto z-indexed above it. |
| `.hero-cine` | Cinemascope wrapper (aspect 2.77:1, dark backdrop). |
| `.hero-cine-bg` | Parallax background layer inside `.hero-cine`. |

---

## Lists & strips

| Class | Purpose |
|---|---|
| `.resp-list` | Responsibilities `<ul>` — 10px row spacing, line-height 1.3. |
| `.tier-strip` | Color-band gradient strip (8 segments). |

---

## Page-level

| Class | Purpose |
|---|---|
| `body.page-scaled` | Applied by JS at narrow viewports; `zoom: var(--page-scale)` to keep min-width layout. |
| `:focus-visible` | Global focus ring: 3px solid `#b97a3a`, 3px offset, 4px radius. |
