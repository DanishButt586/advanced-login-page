<div align="center">

# Animated Multi‑Theme Glass Login UI

<em>Polished. Adaptive. Accessible. Playful.</em>

**Author:** Danish Butt  •  **Stack:** HTML · CSS · JavaScript (no frameworks)

<br/>
</div>

> An eye‑catching login experience featuring glassmorphism, soft lighting, animated line backdrop, multi‑theme switching, adaptive performance fallback, and a mischievous evasive login button that refuses weak input.

## ✨ Highlights
| Category | What You Get |
|----------|--------------|
| Visual Style | Glass layers, halo glow, subtle depth + parallax tilt |
| Theming | 4 instant themes (Default, Midnight, Aurora, Sunset) via CSS variables |
| Motion | Animated lines canvas + breathable orb ambience (auto-throttled) |
| Playfulness | Evasive (runaway) login button until both fields are filled |
| Performance | FPS probe removes heavier effects on low-end devices |
| Accessibility | Visible labels, focus rings, aria-live errors, strong contrast |
| UX Details | Floating labels, password toggle, responsive layout |
| Simplicity | Pure HTML/CSS/JS – easy to drop into any project |

## 🖼 Preview (Add Screenshots)
Create a `screenshots/` folder and drop e.g.:
```
screenshots/
	default-theme.png
	midnight-theme.png
	aurora-theme.png
	sunset-theme.png
```
Then embed:
`![](screenshots/default-theme.png)`

## 🎨 Theme System
Themes are defined with `[data-theme="..."]` blocks setting CSS custom properties:
```
--accent, --accent-alt, --accent-hover, --accent-glow, --accent-link
```
Add a new theme by cloning one block in `style.css` and adjusting values.

## 🧠 Adaptive Performance Logic
An initial ~0.8s frame sample estimates FPS. If below the threshold, the script applies `low-perf` and removes heavier decorative layers (e.g. beam effects) while retaining core interactivity & clarity.

## ♿ Accessibility Commitments
- Semantic labels (no placeholder-only anti-pattern)
- `aria-live` region for dynamic messages (hidden until needed)
- High-contrast focus outlines preserved
- Motion stops (button returns) once input is valid
- Legible sizing & weight upgrades for readability

## 🧪 Folder Structure
```
login.html   # Markup + theme switcher + structure
style.css    # Variables, themes, visual depth, animations, responsive rules
script.js    # Theme logic, performance guard, evasive button + background lines
README.md    # Project documentation
```

## 🚀 Quick Start
Open the page directly:
```powershell
Set-Location "D:\Experiement on Web\Login Page"
Start-Process .\login.html
```
Or just double‑click `login.html` in your file explorer.

## 🔧 Common Customizations
| Goal | File | Tip |
|------|------|-----|
| Add a theme | style.css | Duplicate a theme block & tweak `--accent*` vars |
| Reduce motion | script.css + style.css | Add a `[data-reduced]` flag & gate animations |
| Change evasive logic | script.js | Edit `moveButtonRandom()` & proximity radius |
| Success message style | style.css | Add `.message.success { border-color:... }` |
| Turn off roaming | script.js | Bypass calls to `moveButtonRandom()` when empty |

## 🛤 Roadmap Ideas
- Success / warning message variants
- Reduced‑motion user toggle
- Optional WebGL background mode
- Light mode variant with dynamic contrast
- Credential validation integration / API hook

## 🧩 Architecture at a Glance
| Layer | Responsibility |
|-------|----------------|
| HTML | Structure, accessibility hooks, theme buttons |
| CSS | Themes (custom properties), visual depth, animations, layout |
| JS | Theme activation, performance probe, evasive button logic, canvas lines |

## 🧪 Performance Notes
- Short frame sampling instead of heavy continuous monitoring
- Canvas resolution capped by DPR strategy
- Expensive layers removed under `low-perf`
- Minimal reflows: transforms used for motion

## � Security Notice
This is a UI demo only. No real authentication logic or hashing is implemented. Integrate with your backend before production use.

## 🛡 License (MIT)
```
MIT License

Copyright (c) 2025 Danish Butt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👤 Author
**Danish Butt**  
Passionate about crafting visually rich yet performant interfaces. Feel free to open issues or suggestions.

## ⭐ Support
If this UI helped or inspired you, consider starring the repository so others can discover it.

---
Ready for GitHub Pages deployment instructions or a minified asset variant? Just ask.
