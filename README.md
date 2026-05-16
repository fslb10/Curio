# Curio

Interactive learning hub for tweens (ages 10–12) — built from a Claude Design handoff.

## Run

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # production build → dist/
```

## Screens

Eight screens, navigated via the bottom tab bar and in-screen actions:

| Tab     | Screen           | Source                            |
| ------- | ---------------- | --------------------------------- |
| —       | Onboarding       | `src/screens/Onboarding.jsx`      |
| Home    | Home / dashboard | `src/screens/Home.jsx`            |
| Journey | Constellation map| `src/screens/Journey.jsx`         |
| Explore | Library          | `src/screens/Library.jsx`         |
| You     | Profile          | `src/screens/Profile.jsx`         |
| —       | Lesson player    | `src/screens/LessonPlayer.jsx`    |
| —       | Quiz             | `src/screens/Quiz.jsx`            |
| —       | Parent dashboard | `src/screens/ParentDashboard.jsx` |

Routing is a small `useState` switch in `src/App.jsx`; each screen receives an
`onNav(target)` prop. The four bottom-tab targets are `home`, `map`, `library`,
`profile`; the rest are pushed by buttons inside the screens (e.g. the
"Continue" card on Home opens `lesson`, the settings cog on Profile opens
`parent`).

## Layout

The design is iPhone-sized (402 × 874). On desktop the app renders in a
phone-shaped container centered on a dark backdrop; below ~480 px wide
or ~880 px tall the container goes fullscreen. See `src/index.css`.

## Design tokens

`src/styles.css` is the original design-system stylesheet from the handoff:
CSS variables for colors / typography, plus the `curio-twinkle`, `curio-bob`,
`curio-spin-slow`, `curio-pulse-ring` keyframes used by the mascot and the
journey map. Both light and dark mode are defined; the app currently runs in
dark mode (default).
