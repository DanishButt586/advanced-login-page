<div align="center">

# ✨ Animated Multi‑Theme Glass Login UI ✨

<sup>Built because I got bored and wanted to flex some front‑end muscles 😅</sup>

**Author:** Danish Butt

</div>

## 🧪 Why This Exists
Honestly? I was bored. Didn’t know what to do. So I opened a blank file and started stacking glass, gradients, halos, moving lines and a mischievous button that runs away if you haven’t typed your stuff yet. Turned into a fun little playground for themes, accessibility, and performance tricks.

## 🔍 Overview
Glassy, animated, multi‑theme login built with pure HTML + CSS + JS. Four themes (Default, Midnight, Aurora, Sunset). Dynamic animated line background, soft orb / halo depth, adaptive performance fallback (auto trims heavier visuals on weak FPS), accessible focus + error handling, and that evasive button that refuses commitment until both fields are filled.

## 🧬 Features (aka: "Stuff I hacked in while vibing")
| 💎 Area | ✅ Included |
|--------|-------------|
| Visual Depth | Glass layers, gradients, glow ring, subtle parallax tilt |
| Themes | 4 palettes via CSS custom properties — easy to extend |
| Motion | Canvas animated lines + ambient orbs (throttled if slow) |
| Playfulness | Runaway login button until inputs are valid |
| Performance | FPS probe -> removes heavier effects when needed |
| Accessibility | Real labels, focus rings, aria‑live error region |
| Usability | Floating labels, show/hide password toggle |
| Simplicity | Zero dependencies (vanilla only) |

## 🗂 Files
| File | Purpose |
|------|---------|
| `login.html` | Markup + theme switch buttons |
| `style.css` | Themes, glass styling, animations, layout |
| `script.js` | Theme logic, FPS check, evasive button, canvas lines |

## 🎛 Tech Notes
- CSS custom properties drive all theming.
- FPS sampling (~0.8s) decides if we drop heavier visual layers.
- Button movement relies on viewport clamping + proximity detection.
- Layout & animations favor transforms to keep reflows low.

## ♿ Accessibility Bits
- No placeholder‑only form fields (labels stay visible)
- Focus rings preserved (not removed “for aesthetics”)
- `aria-live` region for dynamic messages (hidden when empty)
- Larger readable text and contrast‑aware theme accents

## ⚠ Security
Front‑end demo only. No auth logic, hashing or network calls. Wire to a backend before using for anything real.

## 📜 License
MIT © 2025 Danish Butt

---
If you skimmed this far: yes, the button really does run away. Fill the fields first 😉
