# Process_Template_Left

Mirror of `Process_Template_Right`: an **image** sits on the **left** and a **Secondary-color caption tab** sits on the **right**. The caption's `::before` tab has its top-right and bottom-right corners rounded, and the Primary-color border runs down the **right edge**. The caption's left edge sits flush against the image's right edge.

Width ratio **image : caption = 2 : 1** (via `flex: 2 / flex: 1`). Wrap = **730px**, no flex gap → image **486.7px**, caption **243.3px**. Image + caption = 730px, matching `Process_Template_Below`'s total width (= Ideation's image width).

Text is **top-aligned** with **9px symmetric vertical padding** (top and bottom). The caption is not stretched to image height — its height auto-fits the text, so the rectangle's bottom edge follows the text and stays 9px below the last line.

The caption (text + rectangle) is offset **5px down** from the wrap top via `margin-top: 5px` on `.process-tl__caption` — so the rectangle's top sits 5px below the image's top edge, matching the spell card's lowered-tab pattern.

Examples in the page: Vanguard slide → Design Process → **Spell Cards** step.

---

## Usage

```html
<div class="process-tl">
  <img class="process-tl__image expandable-image"
       src="…/reference-image.jpg"
       alt="Reference image" />
  <div class="process-tl__caption">
    <p class="spellcard-a__caption-title">Title</p>
    <p class="spellcard-a__caption-body">
      One paragraph of body copy describing this process step.
    </p>
  </div>
</div>
```

The `expandable-image` class (optional) opens the image in the fullscreen lightbox on click. For dynamically-added images, call `ImageViewNav(imgEl)` instead — see `Functions/ImageViewNav.md`.

---

## Layout

```
┌──────────────────────────────────────┬────────┐  ─┐
│                                      │ Title  │   │
│              IMAGE                   │ Body…  │   │  image height
│ ◀ rect bottom = text bottom + 9px ──►│        │   │  (independent of
│                                      │        │   │   caption height)
│                                      └────────┘  ─┘
│                                              ↑
│←──────── 486.7 ─────────────────────→│←─243.3│
                                              ↑
                                         Caption left edge
                                         = image right edge
                                         (no flex gap)
```

| Part | Class | Size / role |
|---|---|---|
| Wrap | `.process-tl` | Flex row, **730px** wide, centered, `gap: 0`, `isolation: isolate`, `align-items: flex-start` (caption stays at natural height — rectangle bottom auto-follows the text). |
| Image | `.process-tl__image` | `flex: 2 1 0` (2 parts of 3 = 2:1 ratio). `min-width: 0`. `height: auto` (preserves aspect). `align-self: flex-start`. 3px `#EDE9E1` border, 6px radius. |
| Caption block | `.process-tl__caption` | `flex: 1 1 0` (1 part of 3). `min-width: 0`. Padding `9px 10px` (9 top/bottom symmetric, 10 left/right). Flex-column with `justify-content: flex-start` so text anchors to the top. |
| Caption tab background | `.process-tl__caption::before` | Secondary `#324158` @ 80% opacity. `top: 0; bottom: 0; left: 0; right: 0;` (matches caption block exactly — starts at image's right edge). `border-radius: 0 6px 6px 0` (both RIGHT corners). `border-right: 3px solid #EDE9E1` (Primary). `z-index: -1`. |

Reuses `.spellcard-a__caption-title` and `.spellcard-a__caption-body` for typography (scale 1: 16px underlined title; 14px, not bold, body — see `SpellCard_Template_A.md`).

---

## Inner gaps

| Gap | Value |
|---|---|
| Above text → visible rect top | **9px** |
| Below text → visible rect bottom | **9px** |
| Left of text → visible rect left (image right edge) | **10px** |
| Right of text → visible rect right | **10px** |

(All four come from the caption's `padding: 9px 10px` — there's no flex gap to fill, so the rectangle's left edge sits flush against the image.)

---

## Stacking
Each instance is 730px wide and centered (`margin: 24px auto 0`). Stack instances vertically by placing them as siblings; override the top margin per-instance with an inline style or Tailwind utility (e.g., `mt-10`) if you need different spacing.
