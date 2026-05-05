# Page Structure & Templates

Two parts:
1. **Templates** — named, reusable layout/format patterns we built into the page
2. **Page outline** — every section and subsection in top-to-bottom reading order

---

## 1. Templates

| Template name | What it is | CSS class root | Used by |
|---|---|---|---|
| **ButtonFormat_Header** | Nav-style button: transparent fill, white outline + 4×4 hard white shadow, on the dark `#324158` header band. | `.nav-pill` | Top-nav links (FEATURE / PROTOTYPES / BLOGS / ABOUT + BONUS) |
| **ButtonFormat_Default** | Mirror of header button for cream sections: white fill, `#324158` outline, 5×5 hard navy shadow. | `.pill` | Section_Summary link row (OFFICIAL SITE / STEAM PAGE / FEATURED ARTICLE) |
| **SpellCard_Template_A** | Three-piece spell-card layout — spell image (left, no border) overlaps a video frame (center), with a caption block (title + body) on the right. Group is 730×271 and centers itself on the page. | `.spellcard-a-wrap` → `.spellcard-a` → `.spellcard-a__image` / `.spellcard-a__video` / `.spellcard-a__caption` (with `__caption-title` / `__caption-body`) | Vanguard slide → Into the Fray + Bladefall |
| **Process_Template_Below** | Vertical two-piece layout: Secondary-color caption tab (rounded top corners, Primary top border) stacked above a Primary-bordered image. Caption tucks under the image's top edge. Image scales by width to match the rectangle (730px). | `.process-tb` → `.process-tb__caption` (+ ::before tab) / `.process-tb__image` | Vanguard slide → Design Process → Ideation block |
| **Process_Template_Right** | Horizontal counterpart of Process_Template_Below: Secondary-color caption tab on the LEFT (rounded top-left + bottom-left corners, Primary left border) with an image on the RIGHT. Caption's right edge sits flush against the image. Width ratio caption : image = 1 : 3 within the 730px wrap (182.5 + 547.5). Text is top-aligned; rectangle bottom auto-follows the text. | `.process-tr` → `.process-tr__caption` (+ ::before tab) / `.process-tr__image` | Vanguard slide → Design Process → Passive Ability |
| **Process_Template_Left** | Mirror of Process_Template_Right: image on the LEFT with a Secondary-color caption tab on the RIGHT (rounded top-right + bottom-right corners, Primary right border). Caption's left edge sits flush against the image. Default ratio image : caption = 2 : 1 within the 730px wrap (486.7 + 243.3). Text top-aligned; rectangle bottom auto-follows the text. | `.process-tl` → `.process-tl__image` / `.process-tl__caption` (+ ::before tab) | Vanguard slide → Design Process → Spell Cards |

> Other reusable patterns exist (banner cards `.yellow-card` / `.lav-card` / `.wurm-card`, design-process boxes `.proc-box`, role-tag prev/next buttons, More-Bosses mini-card) but they are not formally named templates. See `ClassReference.md` for those classes.
>
> Callable JS: `window.ImageViewNav(target?)` enables the click-to-fullscreen lightbox on any image (cursor-anchored zoom, drag pan, hint tracks image bottom). See `Functions/ImageViewNav.md`.

---

## 2. Page outline (top → bottom)

### TOP NAV (header)
- Logo block: "NEO ZHANG" + "— GAME DESIGNER —"
- Desktop nav pills: FEATURE / PROTOTYPES / BLOGS / ABOUT + BONUS
- Mobile hamburger trigger + dropdown panel (≤950px)

### HERO — `#feature` (cinemascope parallax)
- Background: `Sunderfolk_PrimaryArt_16x9.png` (parallax)
- "Sunderfolk" display title
- Two NYX Award badges: PC Game Family + Best Innovation

### Section_Summary (cream band, double navy borders)
- Pill button row — OFFICIAL SITE / STEAM PAGE / FEATURED ARTICLE
- `.bordercard` article — "Sunderfolk + DLC (2023 - 2025)"
  - "Summarized Responsibilities" heading
  - 5-bullet responsibilities list (`.resp-list`)

### Section_HeroBossEnemy — `#character-design` (Combat Design)
*Background: blurred RubbleMaze image, fixed.*

- **Title strip**
  - "— COMBAT DESIGN —" heading
  - Toggle row: HERO CLASS / BOSS / ENEMY (`.combat-btn` tabs)
- **Carousel arrows** (sticky, mid-viewport): ◀ prev / ▶ next
- **Slide 1 — Vanguard (Hero, yellow)** — `#vanguard`
  - Yellow banner card: portrait + "Hero / VANGUARD" title + description
  - Passive Ability — *Fighting Spirit* (description card image + retaliate video, caption tab)
  - SpellCard_Template_A — Into the Fray
  - SpellCard_Template_A — Bladefall
  - Design Process line divider — "[ DESIGN PROCESS ]" cut into the 730px rule
  - Process_Template_Below — Ideation
  - Process_Template_Right — Passive Ability (design-process step)
  - Process_Template_Left — Spell Cards (design-process step)
  - *(Implementation, Playtest, and Iteration: text saved in `brand_assets/_scratch_design_process.md`, block not yet rebuilt)*
  - Slide nav: prev (Wurm) / dots / next (Champion)
- **Slide 2 — Champion (Boss, lavender)** — `#champion`
  - Lavender banner card: portrait + "Boss Monster / CHAMPION" + description
  - Passive: *Absolute Muscle* stat card + video
  - Spell Cards — three card images: Bombs Away / Galvanize / Rally Up + bullet notes
  - More Bosses — three mini-cards:
    1. Unstable Redcap
    2. Archer Warrior
    3. Spear Warrior
  - Slide nav: prev (Vanguard) / dots / next (Wurm)
- **Slide 3 — Wurm (Monster, pink)** — `#wurm`
  - Coral banner card: portrait + "Monster / WURM" + description
  - Passive: *Burrow* stat card + in-game image
  - Slide nav: prev (Champion) / dots / next (Vanguard)
- **Carousel dots** (3 dots beneath the carousel)

### MISSION & ENCOUNTER DESIGN — `#mission-design`
*Background: ink black with radial color halos + grain.*

- "MISSION & ENCOUNTER DESIGN" section title
- "Initial Research" intro paragraph
- **Mission grid** (4 cards, 2×2):
  1. Tavern Trouble (Tutorial)
  2. Sacred Thrown (Boss Battle)
  3. Rubble Maze (Puzzle & Battle)
  4. Brightstone Cleanup (Exploration)
- "AND MORE!" callout
- **Example: Visitor from Afar (Defense & Extraction)**
  - Description paragraph
  - Hero screenshot
  - Two-column note pair (Sandstone wall / Mummy ability)
  - Three `.proc-box` columns:
    1. Ideation
    2. Paper Playtest and Implementation
    3. Iteration and Debugging

### CINEMATICS AND CUTSCENE — `#cinematics`
*Background: ink black with radial color halos + grain.*

- "CINEMATICS AND CUTSCENE" section title
- **Tier strip** — 8-color budget gradient band
- **Three budget tiers** (1×3 grid, each = video + label + description):
  1. Low Budget — 100% gameplay assets
  2. Medium Budget — 50% gameplay / 50% custom animation
  3. High Budget — 100% custom animation
- **Storyboard Samples** — heading, intro paragraph, wide storyboard image
- **Ideation** — 5/7 split:
  - Left: ideation bullets
  - Right: "Encounter — Tower Defense" + "Identify Key Story Beats" — 4-column shot/proc-box grid (2 rows)
- **Research and Storyboard** — heading, bullets, wide storyboard image
- **Prototype + Result** — two columns:
  1. Prototype (video + bullets)
  2. Result (video + bullets)

### FOOTER
- "© NEO ZHANG — GAME DESIGNER"
- Footer link row: FEATURE / PROTOTYPES / BLOGS / ABOUT + BONUS
