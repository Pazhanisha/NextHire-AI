# NextHire AI — Frontend

A premium AI SaaS career dashboard built with React + Vite + Tailwind CSS v4 + Framer Motion.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4** (via `@tailwindcss/vite` — no tailwind.config.js needed)
- **Framer Motion 11** — animations
- **Lucide React** — icons
- **React Router DOM v6** — client-side routing

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

The app opens at **http://localhost:5173**

### 3. Build for production

```bash
npm run build
```

Output goes to `dist/`.

## Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        — Fixed left nav with logo, menu, Pro card, user profile
│   │   ├── Navbar.jsx         — Top bar with search, notifications, avatar
│   │   ├── ProgressCard.jsx   — Career progress with animated SVG ring
│   │   ├── AnalyticsCard.jsx  — Score cards (Resume, ATS, Interview, Career)
│   │   ├── FeatureCard.jsx    — AI tool cards (Resume Analyzer, Interview Sim)
│   │   └── Timeline.jsx       — Career roadmap + recent activity
│   ├── layouts/
│   │   └── MainLayout.jsx     — Sidebar + Navbar shell with ambient blobs
│   ├── pages/
│   │   └── Dashboard.jsx      — Main dashboard page
│   ├── App.jsx                — Router setup
│   ├── main.jsx               — React entry point
│   └── index.css              — Global styles + Tailwind v4 + utilities
├── index.html
├── vite.config.js
├── postcss.config.js
└── package.json
```

## Design System

- **Background**: `#050816` (deep dark navy)
- **Accent**: Purple `#7c3aed` → Blue `#2563eb` gradients
- **Glass cards**: `rgba(255,255,255,0.03–0.07)` + `backdrop-filter: blur`
- **Neon borders**: colored with `box-shadow` glow
- **Animations**: Framer Motion enter animations, progress ring transitions, hover effects

## Notes

- Tailwind v4 uses CSS-first config — no `tailwind.config.js` required.
  All theme tokens live inside `src/index.css` under `@theme inline {}`.
- The `@/` path alias resolves to `src/` (configured in `vite.config.js`).
- To customise the user name or data, edit `src/pages/Dashboard.jsx` and `src/components/Sidebar.jsx`.
