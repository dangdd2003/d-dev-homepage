# App Router Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the d-dev-homepage from Pages Router to App Router while maintaining a hidden legacy fallback for the old pages.

**Architecture:** Use a `pages/legacy/` directory to store the old application routes and an `app/` directory for the new ones. Next.js Middleware acts as a kill-switch to rewrite traffic to legacy if needed.

**Tech Stack:** Next.js 15, TypeScript, Chakra UI v2, Framer Motion

## Global Constraints

- Do not break existing CSS/UI logic during migration.
- `app/` is default; `pages/legacy/` is fallback.
- Client-side code requires `'use client'` directive in App Router.

---

### Task 1: Initialize Git Migration Branch

**Files:**

- Modify: None

**Interfaces:**

- Consumes: `main` branch
- Produces: `feature/app-router-migration` branch

- [ ] **Step 1: Check git status and branches**

Run: `git status`
Expected: On branch main, working tree clean

- [ ] **Step 2: Create and checkout migration branch**

Run: `git checkout -b feature/app-router-migration`
Expected: Switched to a new branch

---

### Task 2: Create Middleware Kill-Switch

**Files:**

- Create: `middleware.ts`

**Interfaces:**

- Consumes: Environment variable `USE_LEGACY_ROUTER`
- Produces: Next.js edge middleware routing

- [ ] **Step 1: Write the middleware implementation**

Create `middleware.ts` in the project root:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if legacy router fallback is enabled via environment variable
  const useLegacy = process.env.USE_LEGACY_ROUTER === 'true'

  if (useLegacy) {
    const url = request.nextUrl.clone()
    // Avoid rewriting paths that are already pointing to legacy or static assets
    if (!url.pathname.startsWith('/legacy') && !url.pathname.match(/\.(.*)$/)) {
      url.pathname = `/legacy${url.pathname === '/' ? '/index' : url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: add middleware for legacy router fallback"
```

---

### Task 3: Move Pages to Legacy Directory

**Files:**

- Modify: `pages/` -> `pages/legacy/` structure

**Interfaces:**

- Consumes: Existing `pages/*` files
- Produces: `pages/legacy/*` accessible endpoints

- [ ] **Step 1: Create legacy directory**

Run: `mkdir -p pages/legacy`
Expected: Directory created

- [ ] **Step 2: Move existing pages (excluding API or config if present)**

Run: `mv pages/*.tsx pages/legacy/` and `mv pages/works pages/legacy/works` and `mv pages/articles pages/legacy/articles` and `mv pages/connect pages/legacy/connect`
Expected: Files moved into legacy directory.
_Note: Depending on OS/shell, you may need to adjust the move command. For Windows PowerShell: `Move-Item -Path "pages\*.tsx", "pages\works", "pages\articles", "pages\connect" -Destination "pages\legacy\"`_

- [ ] **Step 3: Test local server starts successfully**

Run: `npm run dev` (in background/separate terminal)
Expected: Server starts without crashing. Hitting `http://localhost:3000/legacy/works` should load the old works page.

- [ ] **Step 4: Commit**

```bash
git add pages/
git commit -m "refactor: move existing pages to legacy directory"
```

---

### Task 4: Scaffold App Router Root Layout

**Files:**

- Create: `app/layout.tsx`
- Create: `app/providers.tsx`

**Interfaces:**

- Consumes: Next.js 15 App router conventions
- Produces: Base layout wrapping all new App router pages with Chakra UI.

- [ ] **Step 1: Create client-side Providers wrapper**

Because Chakra UI v2 uses Emotion (runtime CSS-in-JS), it requires a client component wrapper.
Create `app/providers.tsx`:

```tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
```

- [ ] **Step 2: Create root layout**

Create `app/layout.tsx`:

```tsx
import { Providers } from './providers'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import dynamic from 'next/dynamic'
import EarthLoader from '@/components/earth-loader'
import { Box, Container } from '@chakra-ui/react'

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
  loading: () => <EarthLoader />
})

export const metadata = {
  title: 'Doan Dinh Dang | Homepage',
  description: "Dang's Homepage"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box as="main" pb={8}>
            {/* Note: Navbar currently expects a path string, we may need to adapt it later */}
            <Navbar path="/" />
            <Container maxW="container.md" pt={14}>
              <Earth />
              {children}
              <Footer />
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/
git commit -m "feat: scaffold app router root layout and providers"
```
