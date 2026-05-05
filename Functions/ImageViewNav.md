# ImageViewNav

Click-to-fullscreen image lightbox with cursor-anchored zoom and drag panning. Exposed as a global function so any image can be wired up with one call.

```js
ImageViewNav(target?)
```

The function is **idempotent** — calling it twice on the same image is safe (each binding marks the element with `data-imageviewnav-bound="1"`).

---

## Arguments

| `target` | Effect |
|---|---|
| *(omitted)* | Re-scans the document and binds every `.expandable-image` not yet bound. Auto-runs on page load. |
| `HTMLImageElement` | Binds that single image. |
| selector string (e.g. `'#hero-img'`, `'.gallery img'`) | Binds every match. |
| `NodeList` / array of elements | Binds each. |

Returns the number of newly-bound images.

---

## What it does to each image
1. Adds the `.expandable-image` class — gives the image a `cursor: zoom-in` (magnifying-glass-with-plus) hover cursor.
2. Adds a `click` listener that opens the lightbox with that image's `src` and `alt`.

---

## Lightbox behavior (already wired up — same lightbox handles all images)
- Opens with the clicked image at scale 1, centered, on an 80% black backdrop.
- **Scroll wheel**: zoom in/out, 10% per tick, clamped 0.5×–8×, anchored on cursor when over the image (otherwise zooms from center).
- **Drag**: click and drag the image to pan. Threshold is 5px so a normal click without movement still closes the lightbox; a drag past the threshold suppresses the close.
- **Click** (no drag): closes.
- **Esc**: closes.
- **Hint text**: "Scroll to zoom in/out. Drag to move the image. Click to exit viewing mode." — sits 5px below the image's *visible* bottom edge (re-positions automatically as you zoom or drag).
- **Touch / pen** also work (Pointer Events under the hood; `touch-action: none` on the lightbox prevents browser scroll/pinch from hijacking).

---

## Examples

```js
// Newly-injected image:
const img = document.createElement('img');
img.src = '/path/to/photo.jpg';
img.alt = 'Caption';
container.appendChild(img);
ImageViewNav(img);

// All images inside a freshly-loaded gallery:
ImageViewNav('#gallery img');

// After dynamically loading more images and adding them with the class:
ImageViewNav();   // rebinds any new .expandable-image
```

In static markup, just use the class — no JS call needed (the page auto-binds on load):

```html
<img class="expandable-image" src="…" alt="…" />
```
