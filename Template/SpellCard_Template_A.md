# SpellCard_Template_A

A three-piece spell-card layout: **spell image** (left, no border) overlaps a **video frame** (center), with a **caption block** (title + body) on the right. The whole group is 730×271 and centers itself horizontally on the page via `translateX(-50%)`.

Examples in the page: Vanguard slide → Into the Fray, Bladefall.

---

## Usage

```html
<div class="spellcard-a-wrap">
  <div class="spellcard-a">
    <img class="spellcard-a__image" src="…/SpellCard_Image.png" alt="Spell name spell card" />
    <div class="spellcard-a__video" style="padding: 0;">
      <video src="…/Spell_Video.mp4" autoplay loop muted playsinline
             style="width: 100%; height: 100%; object-fit: cover; display: block;"></video>
    </div>
    <div class="spellcard-a__caption">
      <p class="spellcard-a__caption-title">Spell Name</p>
      <p class="spellcard-a__caption-body">
        One short paragraph explaining the spell's role and design intent.
      </p>
    </div>
  </div>
</div>
```

For Vimeo embeds, swap the `<video>` tag for an `<iframe class="vimeo-player" …>` plus the `.video-click-overlay` for click-to-pause behavior (the page's `initVimeoPlayers()` JS will pick it up automatically).

---

## Layout

```
x:  0          152              576  585           730
    ┌──────────┐                                       ┐
    │          │                                        │
    │  IMAGE   ├─────────VIDEO────────┐  CAPTION        │   271px
    │ 168×271  │       424×238        │  136px wide     │
    │          │   (top: 17, h: 238)  │  (top: 32)      │
    │          └──────────────────────┘                 │
    └──────────┘                                       ─┘
                ↑ image overlaps video 16px         ↑ 9px gap from video
```

| Part | Class | Position (x, y) | Size | Notes |
|---|---|---|---|---|
| Wrapper | `.spellcard-a-wrap` | — | — | Just `position: relative;`. Apply `style="margin-top: …"` here when stacking. |
| Group | `.spellcard-a` | centered | **730 × 271** | `left: 50%; transform: translateX(-50%);` keeps it centered regardless of viewport. |
| Image | `.spellcard-a__image` | (0, 0) | 168 × 271 | `border-radius: 10px;` `z-index: 5` so it overlaps the video on the left by 16px. |
| Video frame | `.spellcard-a__video` | (152, 17) | 424 × 238 | 3px `#EDE9E1` border, `border-radius: 6px`, black bg. The image overlaps its left edge. |
| Caption block | `.spellcard-a__caption` | (585, 32) | 136 wide | 9px right of video's right edge. Has a `::before` "tab" background — Secondary `#324158` @ 80% opacity, **height auto-scales with text** (10px symmetric padding above/below, 9px symmetric padding left/right), flat left edge hidden behind the video, top-right + bottom-right corners rounded 6px, and a 3px Primary `#EDE9E1` border on the **right** edge. |
| Caption title | `.spellcard-a__caption-title` | inside caption | — | `#ece6df`, weight 700, **16px**, underlined (offset 4px). |
| Caption body | `.spellcard-a__caption-body` | inside caption | — | `rgba(236,230,223,0.85)`, **weight 400 (not bold)**, **14px** (shared with the Process templates), line-height 1.625, **left-aligned**, 8px above-margin. |

All numbers above are exact (defined in the `.spellcard-a*` CSS rules). Don't override them per-instance — extend the template if a new size is needed.

**Type sizes are quoted at scale 1** — title **16px**, body **14px (not bold)**. The live Combat/character carousel slides sit inside a `zoom: 1.21` container, so the CSS there carries the ÷1.21 equivalents (`caption-title` 13.22px, `caption-body`/`caption-list` 11.5px) so they render at these scale-1 sizes. In an un-zoomed context (e.g. the Encounter section's Tavern block) use the literal 16px / 14px.

---

## Stacking
Each instance can be stacked vertically by giving the wrapper a top margin:

```html
<div class="spellcard-a-wrap" style="margin-top: 15px;"> … </div>
<div class="spellcard-a-wrap" style="margin-top: 15px;"> … </div>
```

Default in the page is **15px** between consecutive cards.
