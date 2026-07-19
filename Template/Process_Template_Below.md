# Process_Template_Below

A reusable vertical two-piece layout: a **Secondary-color caption tab** stacked above a **Primary-bordered image**. The caption's `::before` tab tucks 10px under the image's top edge so it visually emerges from beneath the image. The image scales by **width** so it always matches the rectangle's width.

The caption (text + rectangle) is offset **5px down** from the wrap's top via `margin-top: 5px` on `.process-tb__caption` — matches the spell card's lowered-tab pattern.

Total wrap width: **730px** (matches `SpellCard_Template_A` so blocks stack consistently). Image: `width: 100%` of the wrap → always = rectangle width.

Examples in the page: Vanguard slide → Design Process → Ideation block.

---

## Usage

```html
<div class="process-tb">
  <div class="process-tb__caption">
    <p class="spellcard-a__caption-title">Ideation</p>
    <p class="spellcard-a__caption-body">
      One or more sentences describing this process step.
    </p>
  </div>
  <img class="process-tb__image expandable-image"
       src="…/process-image.jpg"
       alt="Reference image" />
</div>
```

The `expandable-image` class (optional) makes the image click-to-fullscreen via the lightbox. For images added dynamically, call `ImageViewNav(imgEl)` instead — see `Functions/ImageViewNav.md`.

---

## Layout

```
┌──────────────────────────────────┐  ─┐
│  ┌─ caption tab (rounded top) ─┐ │   │  10px above text
│  │  Title                      │ │   │
│  │  Body paragraph…            │ │   │  (caption text, 9px L/R padding)
│  └─────────────────────────────┘ │   │  10px below text
├══════════════════════════════════┤  ─┤  10px gap (flex)
│                                  │   │
│            IMAGE                 │   │  scales to 100% of wrap width
│      (3px Primary border,        │   │  height: auto (preserves aspect)
│         6px radius)              │   │
│                                  │   │
└──────────────────────────────────┘  ─┘
↑                                  ↑
│←────── 730px wrap width ────────→│
```

The caption tab's `::before` actually extends 10px *beneath* the visible image-top edge — image at default z-index, `::before` at `z-index: -1`, wrap has `isolation: isolate` to scope the stacking context. Visually the tab and image meet at the image's top edge.

| Part | Class | Size / role |
|---|---|---|
| Wrap | `.process-tb` | Flex column, **730 × auto**, centered (`margin: 24px auto 0`), `gap: 10px`, `isolation: isolate`. |
| Caption block | `.process-tb__caption` | `position: relative`; `padding: 0 9px` so the inner text gets 9px L/R inside the rectangle. |
| Caption tab background | `.process-tb__caption::before` | Secondary `#324158` @ 80% opacity. `top: -10px` (visible top, 10px above text). `bottom: -20px` (extends through 10px flex gap + 10px under image). `border-radius: 6px 6px 0 0` (both top corners). `border-top: 3px solid #EDE9E1` (Primary). `z-index: -1`. |
| Image | `.process-tb__image` | `width: 100%; height: auto; display: block;` — scales to wrap width, preserves aspect. 3px `#EDE9E1` border, 6px radius. |

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` for typography — quoted at **scale 1**: cream 16px underlined title; cream/85% 14px, weight 400 (not bold), line-height 1.625, left-aligned body — same Inter sans across both templates. (Inside the `zoom: 1.21` carousel slides the CSS uses the ÷1.21 values, 13.22px / 11.5px, to render at these sizes.)

---

## Inner gaps (mirrors SpellCard_Template_A)

| Gap | Value |
|---|---|
| Above text → visible rect top | **10px** |
| Below text → visible rect bottom (image top edge) | **10px** (= the flex `gap: 10px`) |
| Left / right of text → rect left / right | **9px** each |

---

## Stacking
Each instance is a self-contained 730px-wide block. Stack vertically by placing them as siblings (the `margin: 24px auto 0` gives top spacing); set `margin-top: …` inline for tighter or wider stacks.
