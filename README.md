# Frontend (Vue 3 + Vite)

## Run locally
```
cd frontend
npm install
npm run dev
```
App runs at http://localhost:5173, talking to the backend API at http://localhost:5000/api
(make sure the backend is running and seeded — see /backend).

## Structure
- src/router        -> Vue Router config (SPA routes, role-based navigation guard)
- src/views         -> route-level pages (one per role/screen)
- src/components     -> reusable .vue components (props down / emits up)
- src/composables    -> shared reactive state (auth)
- src/api            -> fetch wrapper for the backend API
