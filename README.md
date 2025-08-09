## Animated Multi‑Theme Glass Login UI

Author: Danish Butt

### Overview
A glassmorphic, animated, multi‑theme login interface built with pure HTML, CSS and JavaScript. It includes four selectable themes (Default, Midnight, Aurora, Sunset), a dynamic animated line background, soft halo/lighting effects, adaptive performance (automatically reduces heavier visuals on low‑FPS devices), accessible focus and error handling, and a playful evasive login button that moves until both input fields are filled.

### Key Characteristics
- Glass layering with gradients and subtle depth
- Four theme palettes via CSS custom properties
- Canvas animated lines and ambient orb/halo effects
- Performance probe that removes costlier layers when needed
- Evasive (runaway) button behavior for incomplete credentials
- Accessible labels (no placeholder‑only), focus indicators, aria‑live message region
- Password visibility toggle and floating form labels
- No external dependencies (vanilla stack)

### File Summary
- `login.html` – Markup and theme switch controls
- `style.css` – Visual design, theming, animations, layout
- `script.js` – Theme switching, performance check, evasive button, background animation

### Security Note
This project demonstrates front‑end UI only; no authentication, hashing or backend integration is included.

### License
Released under the MIT License. Copyright (c) 2025 Danish Butt.
