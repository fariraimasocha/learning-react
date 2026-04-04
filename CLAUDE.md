# Project Rules

## 10x Skills Scope

When running 10x design skills (/spacing, /responsive, /depth, /color, /typography, /motion, etc.):

- **Only modify the component files being worked on** (e.g., `components/Tenx.js`). Do NOT modify global files like `app/globals.css`, `app/layout.js`, `tailwind.config.*`, or any shared config.
- Apply all fixes using Tailwind utility classes directly on the component, not by changing CSS variables or global tokens.
- If a fix requires a global change, report it in the plan but do NOT apply it. Let the user decide.
