# Animated Multi-Theme Glass Login UI

Short description: Animated multi-theme glass login with adaptive effects & playful evasive button.

Extended description:
A polished, animated, glassmorphic login interface built with vanilla HTML/CSS/JS. Features four switchable color themes (default, midnight, aurora, sunset), adaptive performance (auto-reduces heavy visuals on low FPS), accessible focus/error states, subtle 3D/halo depth, dynamic line background, and a mischievous login button that dodges incomplete attempts.

## ✨ Features
- Multi-theme system (buttons to switch instantly)
- Glassmorphism + gradients + halo + soft orb lighting
- Animated dynamic line background (auto-throttled for perf)
- Adaptive performance: disables heavier layers on low FPS devices
- Evasive ("runaway") login button until both fields have content
- Accessible: focus-visible styles, aria-live error region, readable contrasts
- Floating labels with smooth transitions
- Password show/hide toggle
- Minimal, dependency-free (pure HTML/CSS/JS)

## 📂 Structure
```
login.html   # Main page markup
style.css    # Themes, layout, visuals, animations, responsiveness, accessibility
script.js    # Theme switching, performance guard, button logic, animations control
```

## 🎨 Themes
- Default (cool blue accent)
- Midnight (deep, high-contrast blues)
- Aurora (teal / mint energy)
- Sunset (warm orange/pink glow)

Each theme swaps CSS custom properties (`--accent`, `--accent-glow`, etc.) so extending is simple: duplicate a theme block and adjust variables.

## 🧠 Adaptive Performance
A quick FPS sampling runs after load; if under threshold, heavy layers (like beam effects) are removed and a `low-perf` class is applied—ensuring smooth interaction on weaker devices.

## ♿ Accessibility Notes
- Labels remain visible (not placeholders only)
- Error message region uses `aria-live="polite"`
- Focus styles are high contrast and not removed
- Button motion stops once fields are valid to avoid obstruction

## 🚀 Getting Started
Open `login.html` directly in a modern browser:
```
# Windows (PowerShell)
Start-Process "D:\Experiement on Web\Login Page\login.html"
```
No build step required.

## 🔧 Customization
| Goal | Where | Hint |
|------|-------|------|
| Add theme | `style.css` | Copy a `[data-theme="..."]` block & adjust vars |
| Change evasive behavior | `script.js` | See `moveButtonRandom()` & proximity logic |
| Tweak performance threshold | `script.js` | In perfCheck (FPS comparison) |
| Add success states | `style.css` + `script.js` | Add `.message.success { ... }` & toggle class |

## 🧪 Ideas for Enhancement
- Add success / warning message color variants
- Integrate real auth API (replace playful logic)
- Provide user-controlled reduced motion toggle
- Export background to a WebGL variant for richer effects

## 🛡️ License
MIT (recommended). Add a `LICENSE` file:
```
MIT License

Copyright (c) YEAR YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
... (standard MIT text) ...
```

## 🙌 Attribution / Credits
All code authored locally (vanilla). No external JS libs. Fonts: Google Fonts (Inter).

## 📄 Repo Description Suggestion
Animated, glassy, multi-theme login UI with adaptive performance, accessible focus/error states, and a playful evasive login button.

---
Feel free to request a minified production variant or GitHub Pages deployment instructions next.
