# Process_Template_Right

Horizontal counterpart of `Process_Template_Below`. A **Secondary-color caption tab** sits on the **left**, and an **image** sits on the **right**. The caption's `::before` tab tucks 10px under the image's left edge so the rectangle visually emerges from beneath the image. The visible top-left and bottom-left corners are rounded; the Primary-color border runs down the **left edge** of the rectangle.

Width ratio **caption : image = 1 : 3** (via `flex: 1 / flex: 3`). Wrap = **730px**, no flex gap → caption **182.5px**, image **547.5px**. Caption + image = 730px, matching `Process_Template_Below`'s total width (= Ideation's image width).

Text is **top-aligned** with **9px symmetric vertical padding** (top and bottom). The caption is not stretched to image height — its height auto-fits the text, so the rectangle's bottom edge follows the text and stays 9px below the last line.

The caption (text + rectangle) is offset **5px down** from the wrap top via `margin-top: 5px` on `.process-tr__caption` — so the rectangle's top sits 5px below the image's top edge, matching the spell card's lowered-tab pattern.

Examples in the page: Vanguard slide → Design Process → **Passive Ability** step.

---

## Usage

```html
<div class="process-tr">
  <div class="process-tr__caption">
    <p class="spellcard-a__caption-title">Title</p>
    <p class="spellcard-a__caption-body">
      One paragraph of body copy describing this process step.
    </p>
  </div>
  <img class="process-tr__image expandable-image"
       src="…/reference-image.jpg"
       alt="Reference image" />
</div>
```

The `expandable-image` class (optional) opens the image in the fullscreen lightbox on click. For dynamically-added images, call `ImageViewNav(imgEl)` instead — see `Functions/ImageViewNav.md`.

---

## Layout

```
┌────────┬────────────────────────────────────────┐  ─┐
│ Title  │                                        │   │
│ Body…  │              IMAGE                     │   │  image height
│ ◀ rect bottom = text bottom + 9px ─────────────►│   │  (independent of
│        │                                        │   │   caption height)
└────────┘                                        │  ─┘
         ↑          ↑
         │←──────── 547.5 ───────────────────────→│
↑        ↑
│←─182.5─│
        Caption right edge = image left edge
        (no flex gap — rectangle ends here)
```

| Part | Class | Size / role |
|---|---|---|
| Wrap | `.process-tr` | Flex row, **730px** wide, centered, `gap: 0`, `isolation: isolate`, `align-items: flex-start` (caption stays at natural height — rectangle bottom auto-follows the text). |
| Caption block | `.process-tr__caption` | `flex: 1 1 0` (1 part of 4 = 1:3 ratio). `min-width: 0`. Padding `9px 10px` (9 top/bottom symmetric, 10 left/right). Flex-column with `justify-content: flex-start` so text anchors to the top. |
| Caption tab background | `.process-tr__caption::before` | Secondary `#324158` @ 80% opacity. `top: 0; bottom: 0; left: 0; right: 0;` (matches caption block exactly — ends at image's left edge). `border-radius: 6px 0 0 6px` (both LEFT corners). `border-left: 3px solid #EDE9E1` (Primary). `z-index: -1`. |
| Image | `.process-tr__image` | `flex: 3 1 0` (3 parts of 4). `min-width: 0`. `height: auto` (preserves aspect). `align-self: flex-start`. 3px `#EDE9E1` border, 6px radius. |

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` for typography (cream, 14px underlined title; cream/85%, 12.5px line-height 1.625 left-aligned body).

---

## Inner gaps

| Gap | Value |
|---|---|
| Above text → visible rect top | **9px** |
| Below text → visible rect bottom | **9px** |
| Left of text → visible rect left | **10px** |
| Right of text → visible rect right (image left edge) | **10px** |

(All four come from the caption's `padding: 9px 10px` — there's no flex gap to fill, so the rectangle's right edge sits flush against the image.)

(Mirrors `Process_Template_Below`, where the 9 and 10 swap axes — `Below` has 9 L/R + 10 T/B.)

---

## Constraint: image height ≥ caption height

The rectangle's hidden right edge (10px tucked under the image's left edge) stays covered only where the image exists vertically. If the **caption text is so long that its rectangle is taller than the image**, the bottom 10px of the rectangle's right edge will protrude past the image's bottom and become a visible stub.

Practical rule: at the current image width (437px), an aspect ratio of ~2.5 : 1 or taller (height ≥ ~175) covers a typical 5–6-line caption. The Sunderfolk passive-ability image (2.65 : 1) renders ~165px tall at 437 width — comfortable for shorter captions but tight for long ones.

If your caption is longer or your image is wider/shallower, either shorten the caption copy, swap to a taller image, or override `.process-tr__image` with a fixed `height` and `object-fit: cover`.

---

## Stacking
Each instance is 730px wide and centered (`margin: 24px auto 0`). Stack instances vertically by placing them as siblings; override the top margin per-instance with an inline style or Tailwind utility (e.g., `mt-10`) if you need different spacing.
