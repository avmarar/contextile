# Contextile — Private Multimodal Notes

![Contextile](https://img.shields.io/badge/Status-In%20Progress-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Chakra%20UI](https://img.shields.io/badge/Chakra_UI-319795?logo=chakraui&logoColor=white)
![Redux%20Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

Contextile is a responsive, private-first note canvas that blends text, imagery, and (soon) audio into a living mosaic. The redesign introduces a Chakra-based shell, multimodal card grid, optimistic create/edit flows, and the branding system behind the new logo.

---

## Features

- **Multimodal Notes** – Text, image, and placeholder audio cards with tags, quick actions, and motion-driven hover states.
- **Optimistic Create/Edit** – Tabbed `CreateNoteModal` and a responsive drawer/modal for editing, powered by Redux state.
- **Filters & Stats** – Search, type chips, sort control, and a stats panel summarizing counts per note type.
- **Theme Toggle** – Light/dark modes synchronized with Chakra UI and persisted via the `ui` slice.
- **Foundation for Supabase** – Mock API layer mimics Supabase responses; stubs are in place for future persistence.
- **Testing & Tooling** – Vitest + React Testing Library cover filters, cards, and modal interactions.

---

## Tech Stack

- **Language:** TypeScript.
- **Frameworks:** React 19, Vite 7, React Router 7.
- **UI:** Chakra UI with custom tokens aligned to the Contextile palette.
- **State:** Redux Toolkit (notes + ui slices).
- **Animations:** Framer Motion for card entrance/hover.
- **Testing:** Vitest, @testing-library/react, jsdom.

---

## Quick Start

### Prerequisites

- Node.js 20+

### Installation

```bash
git clone https://github.com/<your-handle>/contextile.git
cd contextile
npm install
npm start          # dev server → http://localhost:5173
```

### Scripts

```bash
npm test           # Vitest suite
npm run build      # Production bundle in /build
npm run preview    # Serve production bundle locally
```

---

## Project Structure

```
src/
 ├─ actions/          # Async thunks (fetchNotes)
 ├─ components/       # NavBar, AppShell, NoteCard, ThemeToggle, etc.
 ├─ pages/            # Notes grid, Note detail drawer, Reminder/Todo placeholders
 ├─ reducers/         # notes + ui slices
 ├─ services/         # notesApi mock service
 ├─ store.ts          # Redux store configuration
 ├─ theme/            # Chakra theme tokens
 ├─ testUtils.tsx     # RTL helpers
 └─ main.tsx          # Entry point with providers
```

---

## Architecture Overview

| Layer        | Description                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| **UI Shell** | AppShell + NavBar wrap each route with the Contextile logo, actions, and optional sidebar.                 |
| **State**    | `notes` slice holds data with optimistic updates; `ui` slice stores filters and theme preference.          |
| **Data**     | `services/notesApi.ts` transforms JSONPlaceholder posts into the richer note model.                        |
| **UX Flow**  | Masonry/grid hybrid ensures responsive card layout; detail drawer reuses the same data and syncs to Redux. |
| **Testing**  | Vitest covers filters, card quick actions, and modal submissions.                                          |

---

## Environment Variables

Today’s milestone uses mock data, so no env vars are required. Future Supabase integration will introduce:

| Variable                 | Purpose                               |
| ------------------------ | ------------------------------------- |
| `VITE_SUPABASE_URL`      | Supabase project URL                  |
| `VITE_SUPABASE_ANON_KEY` | Public anon key for client operations |

---

## Roadmap Snapshot

| Phase   | Status | Highlights                                                                  |
| ------- | ------ | --------------------------------------------------------------------------- |
| Phase 1 | ✅     | Notes domain, services abstraction, `ui` slice for filters/theme.           |
| Phase 2 | ✅     | App shell, filters bar, stats panel, logo nav, theme toggle.                |
| Phase 3 | ✅     | Masonry grid, NoteCard variants, skeletons, hover actions.                  |
| Phase 4 | ✅     | Create modal, detail drawer/modal with optimistic updates.                  |
| Phase 5 | ✅     | Responsive polish, Framer Motion, Vitest coverage, brand palette alignment. |
| Phase 6 | ⏳     | Supabase persistence, media upload, drag-and-drop, collaboration.           |

See `docs/UX_Redesign_Implementation_Plan.md` for the full plan.

---

## Contributing

1. Fork and clone the repo.
2. `npm install && npm start`
3. Create a feature branch: `git checkout -b feat/your-feature`
4. Keep code clean: `npm run lint && npm test`
5. Open a PR with screenshots if the UI changes.

Please align with the roadmap before starting major features.

---

## License

MIT © Contextile contributors.
