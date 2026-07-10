# App Router Migration Design

## Purpose

Migrate the `d-dev-homepage` Next.js project from the Pages Router (`pages/`) to the App Router (`app/`) to leverage React Server Components and modern Next.js features, while retaining the old Pages Router code as a hidden fallback during the transition.

## Architecture & Routing

Next.js throws build errors if the same route path exists in both `pages/` and `app/`. To resolve this and satisfy the requirement of having both versions built and deployed simultaneously:

1. **Legacy Pages**: All existing routes in `pages/` (e.g., `pages/works.tsx`, `pages/index.tsx`) will be moved into a `pages/legacy/` directory (e.g., `pages/legacy/works.tsx`).
   - This makes the old Pages Router version permanently built and accessible at the `/legacy/*` URL path (e.g., `domain.com/legacy/works`).
   - This URL will be hidden from the client UI (no buttons or links will point to it). It can only be accessed by developers directly typing the URL.

2. **App Router (Default)**: The new migrated pages will be built directly inside the `app/` directory (e.g., `app/works/page.tsx`). These will serve as the default public routes (e.g., `domain.com/works`).

## Emergency Fallback (Middleware Kill-Switch)

If an unexpected issue occurs with the App Router in production, an emergency environment variable (`USE_LEGACY_ROUTER=true`) can be flipped.
A `middleware.ts` file at the project root will detect this and transparently rewrite all incoming traffic from the main routes (e.g., `/works`) to the legacy routes (e.g., `/legacy/works`), seamlessly serving the stable Pages Router version to users without changing their visible URL.

## Git Version Control Workflow

1. Create a new branch: `feature/app-router-migration`.
2. Move the contents of `pages/` into `pages/legacy/` and add the `middleware.ts` fallback logic.
3. Scaffold the root App Router layout (`app/layout.tsx`).
4. Migrate pages incrementally from the legacy folder into the `app/` folder.
5. Push changes to GitHub. The branch must pass all configured GitHub Actions/tests.
6. Merge into `main` only when the migration is complete and stable.
