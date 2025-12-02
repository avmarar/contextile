# Contextile

Contextile is a responsive, private-first note canvas that blends text, imagery, and future audio snippets into a living mosaic. The current milestone focuses on establishing a Chakra UI foundation plus theming primitives so future UX work can iterate quickly.

## Stack
- **Vite + React 19 + TypeScript 5** for a fast, typed SPA workflow.
- **Redux Toolkit** powers all async data flows (`posts` slice today, `notes` soon).
- **React Router 7** routes between dashboard and data views.
- **Chakra UI** provides layout primitives, color-mode handling, and the design token system defined in `src/theme`.

## Getting Started
1. Install dependencies: `npm install`.
2. Start the dev server: `npm start` then visit `http://localhost:5173`.
3. Build for production: `npm run build` (output goes to `dist/`).
4. Preview a production build locally: `npm run preview`.

### Current Routes
- `/notes` – Notes dashboard fed by the placeholder JSONPlaceholder API.
- `/notes/:noteId` – Detail view with read/edit affordance placeholders.
- `/reminder`, `/todo` – Future surfaces with simple “coming soon” copy.

## Design Foundations
- Custom theme tokens live in `src/theme/index.ts` and are applied via `ChakraProvider` + `ColorModeScript` in `src/main.tsx`.
- Branding (documented in `docs/DOCUMENTATION.md`):
  - **Colors:** `brand.500 = #7740ff` with light/dark ramps defined for components.
  - **Fonts:** `Work Sans` for headings, `Inter` for body and UI text.
  - **Radii & Shadows:** `xl = 24px` for cards and a branded focus outline.
- Legacy CSS resets were removed in favor of Chakra global styles to prevent specificity battles as the redesign progresses.

## Project Layout
```
src/
 ├─ actions/             # Redux action creators and async thunks
 ├─ components/          # Presentational components (NavBar, NoteCard)
 ├─ pages/               # Router-level screens (Notes, Note Detail, Reminder placeholder, etc.)
 ├─ reducers/            # posts reducer + root reducer
 ├─ store.ts             # Redux store configuration
 ├─ theme/               # Chakra theme tokens + global styles
 ├─ App.tsx              # Router shell
 └─ main.tsx             # Entry point w/ providers
```

## Roadmap Snapshot
- Phase 1: Rename posts → notes domain, add data services, and introduce a `ui` slice for filters.
- Phase 2: Ship the Chakra-based App Shell (header, nav tabs, filters, stats, theming toggle).
- Phase 3: Build the rich Notes Grid + NoteCard variants with loading/error/empty states.
- Phase 4+: Detail + creation flows, Supabase integration, motion polish, and testing.

See `docs/UX_Redesign_Implementation_Plan.md` for the full phased plan.
