# ButtonFormat

The portfolio uses one button system with two variants. **Default** is the canonical form (use this in normal page sections). **Header** is the inverted variant for the dark `#324158` nav band.

---

## ButtonFormat_Default *(default)*

Class: **`.pill`**

```html
<a href="..." class="pill">LABEL</a>
```

Use for: any standalone CTA in a cream / paper / white section.
Examples in the page: Section_Summary link row (OFFICIAL SITE / STEAM PAGE / FEATURED ARTICLE).

### Specs
| Property | Value |
|---|---|
| Height | 42px |
| Padding | 0 26px |
| Border | 2px solid `#324158` |
| Border-radius | 8px |
| Background | `#ffffff` |
| Text color | `#324158` |
| Font | Arial / Helvetica, weight 700 |
| Font-size | 12px |
| Letter-spacing | 0.18em |
| Box-shadow | `5px 5px 0 0 #324158` (hard offset, no blur) |

### States
| State | Change |
|---|---|
| `:hover` | bg `#324158`, border `#3a3a3a`, text `#EDE9E1`, `translateY(-1px)` |
| `:active` | `translateY(0)` |
| `:focus-visible` | global ring: 3px solid `#b97a3a`, 3px offset |

---

## Variant — ButtonFormat_Header

Class: **`.nav-pill`**

```html
<a href="#feature" class="nav-pill">FEATURE</a>
```

Use for: links inside the dark `#324158` header band only.
Examples in the page: top-nav links FEATURE / PROTOTYPES / BLOGS / ABOUT + BONUS.

### Specs (only the diffs from Default)
| Property | Default | Header |
|---|---|---|
| Height | 42px | **32px** |
| Padding | 0 26px | **0 22px** |
| Border | 2px solid `#324158` | **1.5px solid `#ffffff`** |
| Background | `#ffffff` | **transparent** |
| Text color | `#324158` | **`#ffffff`** |
| Font-size | 12px | **11px** |
| Letter-spacing | 0.18em | **0.16em** |
| Box-shadow | `5px 5px 0 0 #324158` | **`4px 4px 0 0 #ffffff`** |

### States
| State | Change |
|---|---|
| `:hover` | bg `#EDE9E1`, border `#3a3a3a`, text `#000`, `translateY(-1px)` |
| `:active` | `translateY(0)` |

---

## Pairing logic
The two variants are **mirrors of each other**. Same shape, same shadow geometry — Default is "dark on light", Header is "light on dark". When in doubt, use Default.
