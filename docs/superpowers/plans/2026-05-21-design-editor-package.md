# `@fastlab-ai/design-editor` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract AdSpot Creative Studio's image editor into a publishable open-source npm package (`@fastlab-ai/design-editor`) while keeping AdSpot working at every commit.

**Architecture:** pnpm monorepo. `packages/design-editor/` is the publishable unit. Engine = vendored fork of `@layerhub-io`. UI = headless components themed via CSS variables. Backends pluggable via provider interfaces (Media, Font, BgRemoval, Persistence). Next.js compatible via `'use client'` post-build step.

**Tech Stack:** TypeScript strict, React 18+, Fabric.js v6 (engine), tsup (build), Vitest + Playwright (tests), changesets (release), pnpm 9+ (workspaces), Astro Starlight (docs).

**Spec:** [`docs/superpowers/specs/2026-05-21-design-editor-package-design.md`](../specs/2026-05-21-design-editor-package-design.md) — refer for design rationale.

**Branch strategy:** All work on `feature/design-editor-package` off `feature/creative-studio`. Each phase merges back only when AdSpot Studio behaves identically to before.

---

## Phase 0 — Workspace Foundation

**Exit criteria:** `pnpm install && pnpm dev` runs AdSpot identically to before; empty `packages/design-editor` builds cleanly; CI typechecks both root and package.

### Task 0.1: Create branch and install pnpm

- [ ] **Step 1: Create feature branch**

```bash
git checkout feature/creative-studio
git pull
git checkout -b feature/design-editor-package
```

- [ ] **Step 2: Pin pnpm version in root package.json**

Add to `package.json`:

```json
"packageManager": "pnpm@9.15.0"
```

- [ ] **Step 3: Install pnpm globally if missing**

```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm --version
```

Expected: `9.15.0`

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore: pin pnpm 9.15.0 via packageManager field"
```

### Task 0.2: Add pnpm workspace config

**Files:**
- Create: `pnpm-workspace.yaml`
- Modify: `.gitignore`

- [ ] **Step 1: Create pnpm-workspace.yaml**

```yaml
packages:
  - '.'
  - 'packages/*'
  - 'apps/*'
  - 'examples/*'
```

- [ ] **Step 2: Add lockfile transition entries to .gitignore**

Append to `.gitignore`:

```
# pnpm
.pnpm-store/
```

- [ ] **Step 3: Run pnpm install to generate pnpm-lock.yaml**

```bash
pnpm install
```

Expected: lockfile generated, all existing deps installed, no errors.

- [ ] **Step 4: Verify AdSpot still runs**

```bash
pnpm dev
```

Manually open the app, navigate to Creative Studio, confirm Design Editor still works.

- [ ] **Step 5: Delete package-lock.json**

```bash
rm package-lock.json
```

- [ ] **Step 6: Commit**

```bash
git add pnpm-workspace.yaml pnpm-lock.yaml .gitignore
git rm package-lock.json
git commit -m "chore: convert to pnpm workspaces"
```

### Task 0.3: Scaffold packages/design-editor

**Files:**
- Create: `packages/design-editor/package.json`
- Create: `packages/design-editor/tsconfig.json`
- Create: `packages/design-editor/tsup.config.ts`
- Create: `packages/design-editor/src/index.ts`
- Create: `packages/design-editor/README.md`
- Create: `packages/design-editor/LICENSE`
- Create: `tsconfig.base.json` (root)

- [ ] **Step 1: Create tsconfig.base.json at repo root**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  }
}
```

- [ ] **Step 2: Create package.json**

`packages/design-editor/package.json`:

```json
{
  "name": "@fastlab-ai/design-editor",
  "version": "0.0.0",
  "description": "Open-source image design editor for React and Next.js",
  "license": "MIT",
  "author": "Fastlab",
  "repository": {
    "type": "git",
    "url": "https://github.com/fastlabai/design-editor.git"
  },
  "type": "module",
  "sideEffects": ["**/*.css"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./theme.css": "./dist/theme.css"
  },
  "files": ["dist", "README.md", "LICENSE", "CHANGELOG.md"],
  "scripts": {
    "build": "tsup && node scripts/postbuild-use-client.mjs",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src",
    "size": "size-limit"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "peerDependenciesMeta": {
    "@imgly/background-removal": { "optional": true }
  },
  "dependencies": {
    "fabric": "^6.5.1",
    "nanoid": "^5.0.9"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8",
    "size-limit": "^11.1.6",
    "@size-limit/preset-small-lib": "^11.1.6"
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

`packages/design-editor/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules", "**/*.test.ts", "**/*.test.tsx"]
}
```

- [ ] **Step 4: Create tsup.config.ts**

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom', '@imgly/background-removal'],
})
```

- [ ] **Step 5: Create initial src/index.ts placeholder**

```typescript
export const VERSION = '0.0.0'
```

- [ ] **Step 6: Create README.md**

```markdown
# @fastlab-ai/design-editor

Open-source image design editor for React and Next.js. Status: under construction.
```

- [ ] **Step 7: Create LICENSE**

Standard MIT text with `Copyright (c) 2026 Fastlab` at top.

- [ ] **Step 8: Install package deps via workspace**

```bash
pnpm install
```

- [ ] **Step 9: Build the package**

```bash
pnpm --filter @fastlab-ai/design-editor build
```

Expected: `packages/design-editor/dist/` contains `index.js`, `index.cjs`, `index.d.ts`.

- [ ] **Step 10: Commit**

```bash
git add packages/design-editor tsconfig.base.json
git commit -m "feat(design-editor): scaffold empty package with tsup build"
```

### Task 0.4: GitHub Actions CI skeleton

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Check if .github/workflows/ already exists**

```bash
ls .github/workflows/ 2>/dev/null || echo "missing"
```

- [ ] **Step 2: Create ci.yml**

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main, feature/**]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.15.0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @fastlab-ai/design-editor typecheck
      - run: pnpm --filter @fastlab-ai/design-editor build
      - name: Root typecheck
        run: pnpm check
```

- [ ] **Step 3: Push branch and verify CI passes**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add typecheck + build workflow for design-editor package"
git push -u origin feature/design-editor-package
```

Wait for GitHub Actions to go green on the PR or branch.

### Task 0.5: Verify AdSpot deployment path (Vercel/Docker)

- [ ] **Step 1: Test Vercel build locally if possible**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 2: Test Docker build (if used in deploy pipeline)**

```bash
pnpm docker:build
```

Expected: image builds successfully. If it fails because Dockerfile uses `npm`, update the Dockerfile to use `pnpm` (use `RUN corepack enable && pnpm install --frozen-lockfile`).

- [ ] **Step 3: Commit any Dockerfile changes**

```bash
git add Dockerfile
git commit -m "ci: switch Dockerfile to pnpm"
```

**Phase 0 done.** Open PR back to `feature/creative-studio`, merge after CI green.

---

## Phase 1 — Vendor the Engine

**Exit criteria:** Engine code lives at `packages/design-editor/src/engine/`, builds clean, has unit tests passing. AdSpot still imports `@layerhub-io/*` directly — engine fork is dormant.

### Task 1.1: Acquire LayerHub sources

**Files:**
- Create: `packages/design-editor/src/engine/` (multiple files copied from LayerHub)
- Create: `packages/design-editor/src/engine/LICENSE` (copied from LayerHub)
- Create: `packages/design-editor/src/engine/README.md`

- [ ] **Step 1: Clone LayerHub at the exact version we depend on**

```bash
cd /tmp
git clone https://github.com/layerhub-io/layerhub-ce.git layerhub-source
cd layerhub-source
git checkout v0.3.3
```

If v0.3.3 tag doesn't exist, use the commit referenced in our `pnpm-lock.yaml`:

```bash
cd /Users/mohdgayasuddin/Sites/adspot_project
grep -A2 '@layerhub-io/core' pnpm-lock.yaml | head -5
```

- [ ] **Step 2: Identify the four packages we use**

Inside `/tmp/layerhub-source/packages/`, locate: `core`, `objects`, `types`, `react`.

- [ ] **Step 3: Copy source files preserving structure**

```bash
mkdir -p /Users/mohdgayasuddin/Sites/adspot_project/packages/design-editor/src/engine
cp -r /tmp/layerhub-source/packages/core/src \
      /Users/mohdgayasuddin/Sites/adspot_project/packages/design-editor/src/engine/core
cp -r /tmp/layerhub-source/packages/objects/src \
      /Users/mohdgayasuddin/Sites/adspot_project/packages/design-editor/src/engine/objects
cp -r /tmp/layerhub-source/packages/types/src \
      /Users/mohdgayasuddin/Sites/adspot_project/packages/design-editor/src/engine/types
cp -r /tmp/layerhub-source/packages/react/src \
      /Users/mohdgayasuddin/Sites/adspot_project/packages/design-editor/src/engine/react
cp /tmp/layerhub-source/LICENSE \
      /Users/mohdgayasuddin/Sites/adspot_project/packages/design-editor/src/engine/LICENSE
```

- [ ] **Step 4: Create attribution README**

`packages/design-editor/src/engine/README.md`:

```markdown
# Engine

Forked from [layerhub-io/layerhub-ce](https://github.com/layerhub-io/layerhub-ce) at v0.3.3
(commit <SHA>). Original LICENSE preserved in this directory.

Subsequent modifications by Fastlab are documented in CHANGELOG.md.

## Why we forked

LayerHub upstream activity slowed in 2025. We needed a single bundle with strict
TypeScript and our own release cadence. Vendoring keeps the editor ergonomic
while preserving the original MIT license terms.
```

Replace `<SHA>` with the actual SHA from `git rev-parse HEAD` in the source clone.

- [ ] **Step 5: Update root LICENSE with NOTICE section**

Append to `LICENSE` (root):

```
---

## NOTICES

### @fastlab-ai/design-editor engine

The design editor engine (packages/design-editor/src/engine/) contains code
forked from layerhub-io/layerhub-ce, copyright (c) the layerhub-io authors,
licensed under the MIT License. See packages/design-editor/src/engine/LICENSE.
```

- [ ] **Step 6: Commit copy as-is**

```bash
git add packages/design-editor/src/engine LICENSE
git commit -m "feat(engine): vendor layerhub-io@0.3.3 source"
```

### Task 1.2: Rewrite cross-package imports to local paths

**Files:** all files under `packages/design-editor/src/engine/`

- [ ] **Step 1: Find all cross-package imports**

```bash
grep -rn "@layerhub-io/" packages/design-editor/src/engine/ | head -50
```

- [ ] **Step 2: Write a codemod script**

`packages/design-editor/scripts/rewrite-layerhub-imports.mjs`:

```javascript
import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'

const files = execSync(
  'grep -rl "@layerhub-io/" packages/design-editor/src/engine/',
  { encoding: 'utf8' }
).trim().split('\n').filter(Boolean)

const replacements = [
  [/@layerhub-io\/core/g,    '../core'],
  [/@layerhub-io\/objects/g, '../objects'],
  [/@layerhub-io\/types/g,   '../types'],
  [/@layerhub-io\/react/g,   '../react'],
]

for (const file of files) {
  let content = readFileSync(file, 'utf8')
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement)
  }
  writeFileSync(file, content)
  console.log(`rewrote: ${file}`)
}
```

- [ ] **Step 3: Run the codemod**

```bash
node packages/design-editor/scripts/rewrite-layerhub-imports.mjs
```

- [ ] **Step 4: Verify no @layerhub-io imports remain in engine/**

```bash
grep -rn "@layerhub-io/" packages/design-editor/src/engine/
```

Expected: empty output.

- [ ] **Step 5: Manually fix any relative paths that broke (different folder depths)**

Check imports in subfolders — relative paths like `../core` may need to be `../../core` from deeper files. Run `pnpm --filter @fastlab-ai/design-editor typecheck` and fix every error.

- [ ] **Step 6: Create engine/index.ts as single entry**

`packages/design-editor/src/engine/index.ts`:

```typescript
export * from './core'
export * from './objects'
export * from './types'
export * from './react'
```

If any of those sub-folders don't have their own `index.ts`, create one that re-exports their public symbols (open each sub-folder, list the existing exports, and re-export them).

- [ ] **Step 7: Commit**

```bash
git add packages/design-editor
git commit -m "refactor(engine): rewrite imports to local paths"
```

### Task 1.3: Move Fabric.js to direct dependency

- [ ] **Step 1: Identify Fabric.js version LayerHub used**

```bash
grep -A1 '"fabric"' /tmp/layerhub-source/packages/core/package.json
```

- [ ] **Step 2: Confirm `fabric` is in our package.json**

Already added in Task 0.3 as `"fabric": "^6.5.1"`. If the LayerHub version was on Fabric.js v5, downgrade to match temporarily:

```bash
pnpm --filter @fastlab-ai/design-editor add fabric@^5.3.0
```

Note in `engine/README.md` that we're on Fabric v5 and plan a v6 migration after parity.

- [ ] **Step 3: Verify engine typechecks**

```bash
pnpm --filter @fastlab-ai/design-editor typecheck
```

Fix any Fabric-related type errors that surface.

- [ ] **Step 4: Commit**

```bash
git add packages/design-editor/package.json packages/design-editor/src/engine/README.md pnpm-lock.yaml
git commit -m "chore(engine): pin fabric version to match layerhub fork"
```

### Task 1.4: Strip dead code

- [ ] **Step 1: Identify unused features**

Search for video/animation/timeline references and confirm AdSpot doesn't use them:

```bash
grep -rn "video\|timeline\|animation" packages/design-editor/src/engine/ | head -30
grep -rn "from '@layerhub-io" src/pages/advertiser/studio/ | head
```

Compare what AdSpot's `DesignEditorInner.tsx` actually imports vs what engine provides.

- [ ] **Step 2: Delete unused folders/files**

Specifically remove (verify each is unused first):

- Any `video/` subfolders
- Any `timeline/` subfolders
- Any unfinished SSR adapters
- Test fixtures from LayerHub

```bash
rm -rf packages/design-editor/src/engine/core/video
rm -rf packages/design-editor/src/engine/objects/video
rm -rf packages/design-editor/src/engine/core/timeline
```

(Adjust paths based on actual structure.)

- [ ] **Step 3: Re-typecheck and fix re-export errors**

```bash
pnpm --filter @fastlab-ai/design-editor typecheck
```

Remove broken re-exports from `engine/index.ts` and sub-folder `index.ts` files.

- [ ] **Step 4: Commit**

```bash
git add packages/design-editor
git commit -m "refactor(engine): strip unused video/timeline/animation code"
```

### Task 1.5: Add Vitest and write engine tests

**Files:**
- Create: `packages/design-editor/vitest.config.ts`
- Create: `packages/design-editor/src/engine/__tests__/scene.test.ts`
- Create: `packages/design-editor/src/engine/__tests__/history.test.ts`
- Create: `packages/design-editor/src/engine/__tests__/serialization.test.ts`

- [ ] **Step 1: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    coverage: {
      provider: 'v8',
      include: ['src/engine/**', 'src/providers/**'],
      exclude: ['**/__tests__/**', '**/index.ts'],
    },
  },
})
```

- [ ] **Step 2: Install jsdom**

```bash
pnpm --filter @fastlab-ai/design-editor add -D jsdom @vitest/coverage-v8
```

- [ ] **Step 3: Write scene serialization test**

`packages/design-editor/src/engine/__tests__/serialization.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { serializeScene, deserializeScene } from '../core/serialization'

describe('scene serialization', () => {
  it('round-trips an empty scene', () => {
    const scene = { id: 'test', layers: [], width: 800, height: 600 }
    const json = serializeScene(scene)
    expect(deserializeScene(json)).toEqual(scene)
  })

  it('round-trips a scene with a text layer', () => {
    const scene = {
      id: 'test',
      width: 800,
      height: 600,
      layers: [
        { id: 'l1', type: 'text', text: 'Hello', x: 10, y: 20, fontFamily: 'Inter' },
      ],
    }
    const json = serializeScene(scene)
    expect(deserializeScene(json)).toEqual(scene)
  })
})
```

If the actual export names differ in the forked engine (`toJSON` / `fromJSON` etc.), adjust the imports — but write at least 8 tests covering: empty scene, text layer, image layer, shape layer, nested groups, transform properties, history snapshots, unknown layer type (should throw with clear message).

- [ ] **Step 4: Write history command test**

`packages/design-editor/src/engine/__tests__/history.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { createHistory } from '../core/history'

describe('history', () => {
  it('undo restores previous state', () => {
    const h = createHistory<{ count: number }>({ count: 0 })
    h.push({ count: 1 })
    h.push({ count: 2 })
    expect(h.current()).toEqual({ count: 2 })
    h.undo()
    expect(h.current()).toEqual({ count: 1 })
    h.undo()
    expect(h.current()).toEqual({ count: 0 })
  })

  it('redo restores undone state', () => {
    const h = createHistory<{ count: number }>({ count: 0 })
    h.push({ count: 1 })
    h.undo()
    h.redo()
    expect(h.current()).toEqual({ count: 1 })
  })

  it('push after undo clears redo stack', () => {
    const h = createHistory<{ count: number }>({ count: 0 })
    h.push({ count: 1 })
    h.undo()
    h.push({ count: 2 })
    h.redo()
    expect(h.current()).toEqual({ count: 2 })
  })
})
```

Again, adjust API names to match the forked engine. Aim for 6+ history tests covering: undo, redo, undo at boundary (no-op), redo at boundary (no-op), push after undo clears redo, depth limit if any.

- [ ] **Step 5: Write scene mutation test**

`packages/design-editor/src/engine/__tests__/scene.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { addLayer, removeLayer, moveLayer, updateLayer } from '../core/scene'

describe('scene mutations', () => {
  const baseScene = () => ({ id: 's', width: 800, height: 600, layers: [] as any[] })

  it('addLayer appends to the layers array', () => {
    const s = baseScene()
    const next = addLayer(s, { id: 'l1', type: 'text', text: 'hi' })
    expect(next.layers).toHaveLength(1)
    expect(next.layers[0]?.id).toBe('l1')
  })

  it('addLayer does not mutate input', () => {
    const s = baseScene()
    addLayer(s, { id: 'l1', type: 'text', text: 'hi' })
    expect(s.layers).toHaveLength(0)
  })

  it('removeLayer removes by id', () => {
    const s = { ...baseScene(), layers: [{ id: 'l1', type: 'text' }] }
    expect(removeLayer(s, 'l1').layers).toHaveLength(0)
  })
})
```

Aim for 8+ scene tests covering: add, remove, move (reorder), update, immutability, removing non-existent id (no-op), updating non-existent id (no-op), nested group operations.

- [ ] **Step 6: Run tests**

```bash
pnpm --filter @fastlab-ai/design-editor test
```

Expected: all tests pass. If real API names differ, the tests fail with clear import errors — update them.

- [ ] **Step 7: Commit**

```bash
git add packages/design-editor/vitest.config.ts packages/design-editor/src/engine/__tests__ packages/design-editor/package.json pnpm-lock.yaml
git commit -m "test(engine): add scene/history/serialization unit tests"
```

### Task 1.6: Update CI to run package tests

**Files:**
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Add test step**

Edit `.github/workflows/ci.yml`, after the build step add:

```yaml
      - run: pnpm --filter @fastlab-ai/design-editor test
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: run design-editor package tests"
```

**Phase 1 done.** Merge to `feature/creative-studio` after CI green and manual AdSpot smoke check.

---

## Phase 2 — Decouple AdSpot Studio from Ant Design

**Exit criteria:** No `antd` imports anywhere under `src/pages/advertiser/studio/`. Studio visually identical (verify by side-by-side screenshot comparison). Functional parity (every interaction still works).

### Task 2.1: Define the headless primitives package layer

**Files:**
- Create: `packages/design-editor/src/components/primitives/Button.tsx`
- Create: `packages/design-editor/src/components/primitives/Slider.tsx`
- Create: `packages/design-editor/src/components/primitives/Popover.tsx`
- Create: `packages/design-editor/src/components/primitives/Input.tsx`
- Create: `packages/design-editor/src/components/primitives/Tooltip.tsx`
- Create: `packages/design-editor/src/components/primitives/Select.tsx`
- Create: `packages/design-editor/src/components/primitives/index.ts`
- Create: `packages/design-editor/src/theme/theme.css`

- [ ] **Step 1: Install Radix primitives**

```bash
pnpm --filter @fastlab-ai/design-editor add \
  @radix-ui/react-popover \
  @radix-ui/react-slider \
  @radix-ui/react-tooltip \
  @radix-ui/react-select \
  @radix-ui/react-slot \
  clsx
```

- [ ] **Step 2: Create theme.css**

`packages/design-editor/src/theme/theme.css`:

```css
/* @fastlab-ai/design-editor theme tokens */
:root {
  --de-color-bg: #ffffff;
  --de-color-bg-elevated: #f5f5f7;
  --de-color-fg: #18181b;
  --de-color-fg-muted: #71717a;
  --de-color-border: #e4e4e7;
  --de-color-primary: #2563eb;
  --de-color-primary-fg: #ffffff;
  --de-color-danger: #dc2626;

  --de-radius-sm: 4px;
  --de-radius-md: 8px;
  --de-radius-lg: 12px;

  --de-space-1: 4px;
  --de-space-2: 8px;
  --de-space-3: 12px;
  --de-space-4: 16px;

  --de-font-sm: 12px;
  --de-font-md: 14px;
  --de-font-lg: 16px;

  --de-shadow-sm: 0 1px 2px rgba(0,0,0,0.08);
  --de-shadow-md: 0 4px 12px rgba(0,0,0,0.12);
}

[data-de-theme="dark"] {
  --de-color-bg: #18181b;
  --de-color-bg-elevated: #27272a;
  --de-color-fg: #fafafa;
  --de-color-fg-muted: #a1a1aa;
  --de-color-border: #3f3f46;
}

.de-reset, .de-reset * { box-sizing: border-box; }
```

- [ ] **Step 3: Create Button primitive**

`packages/design-editor/src/components/primitives/Button.tsx`:

```tsx
'use client'
import * as React from 'react'
import { clsx } from 'clsx'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', iconOnly, className, ...rest }, ref) => (
    <button
      ref={ref}
      data-de-button
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly ? '' : undefined}
      className={clsx('de-btn', className)}
      {...rest}
    />
  ),
)
Button.displayName = 'Button'
```

Add corresponding CSS to `theme.css` for `[data-de-button]` (heights, padding, hover, active, focus-visible ring). The CSS goes in the same file so the component is theme-self-contained.

- [ ] **Step 4: Create Slider primitive**

`packages/design-editor/src/components/primitives/Slider.tsx`:

```tsx
'use client'
import * as React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'

export type SliderProps = {
  value: number
  onValueChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  'aria-label'?: string
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, ...rest }: SliderProps) {
  return (
    <RadixSlider.Root
      className="de-slider-root"
      value={[value]}
      onValueChange={(v) => onValueChange(v[0] ?? 0)}
      min={min}
      max={max}
      step={step}
      {...rest}
    >
      <RadixSlider.Track className="de-slider-track">
        <RadixSlider.Range className="de-slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="de-slider-thumb" />
    </RadixSlider.Root>
  )
}
```

Add the corresponding `.de-slider-*` CSS.

- [ ] **Step 5: Create Popover, Input, Tooltip, Select primitives**

Build each as a minimal Radix wrapper exposing only the props we actually use in Studio. Don't expose Radix-native props that aren't needed yet (YAGNI).

For each, also add the corresponding CSS to `theme.css`.

- [ ] **Step 6: Create primitives/index.ts**

```typescript
export * from './Button'
export * from './Slider'
export * from './Popover'
export * from './Input'
export * from './Tooltip'
export * from './Select'
```

- [ ] **Step 7: Write a smoke test for each primitive**

`packages/design-editor/src/components/primitives/__tests__/Button.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('applies variant via data attribute', () => {
    render(<Button variant="primary">x</Button>)
    expect(screen.getByRole('button').dataset.variant).toBe('primary')
  })
})
```

Install testing-library:

```bash
pnpm --filter @fastlab-ai/design-editor add -D @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 8: Run tests**

```bash
pnpm --filter @fastlab-ai/design-editor test
```

- [ ] **Step 9: Commit**

```bash
git add packages/design-editor
git commit -m "feat(primitives): headless Button/Slider/Popover/Input/Tooltip/Select"
```

### Task 2.2: Wire theme.css into AdSpot temporarily

We need AdSpot to import the theme CSS so the primitives have styles when AdSpot starts using them.

**Files:**
- Modify: `src/main.tsx` (or wherever AdSpot's root entry imports global CSS)

- [ ] **Step 1: Identify AdSpot's root CSS import**

```bash
grep -n "import.*css" src/main.tsx src/App.tsx 2>/dev/null | head
```

- [ ] **Step 2: Add the theme.css import**

In the file you identified, add (near other CSS imports):

```typescript
import '@fastlab-ai/design-editor/src/theme/theme.css'
```

Note: during dev we import directly from the workspace source (Vite handles this). After build we'll switch to `'@fastlab-ai/design-editor/theme.css'`.

- [ ] **Step 3: Map AdSpot theme into our CSS vars**

Add in `src/index.css` or equivalent:

```css
:root {
  --de-color-bg: var(--adspot-bg, #ffffff);
  --de-color-fg: var(--adspot-fg, #1a1a1a);
  --de-color-primary: var(--adspot-primary, #2563eb);
  /* …map the rest from AdSpot's existing tokens */
}
```

- [ ] **Step 4: Verify AdSpot still renders**

```bash
pnpm dev
```

Navigate to Studio. Confirm visual identity unchanged.

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx src/index.css
git commit -m "feat(adspot): import design-editor theme; map adspot tokens"
```

### Task 2.3: Replace Ant Design in studio files — one file at a time

For **each file** in this list, do the following sub-cycle. Tackle files in this order (least-coupled first):

1. `src/pages/advertiser/studio/components/primitives.tsx`
2. `src/pages/advertiser/studio/components/Toolbar.tsx`
3. `src/pages/advertiser/studio/components/IconRail.tsx`
4. `src/pages/advertiser/studio/components/panels/TextPanel.tsx`
5. `src/pages/advertiser/studio/components/panels/FontsPanel.tsx`
6. `src/pages/advertiser/studio/components/panels/UploadPanel.tsx`
7. `src/pages/advertiser/studio/components/panels/LibraryPanel.tsx`
8. `src/pages/advertiser/studio/components/panels/ShapesPanel.tsx`
9. `src/pages/advertiser/studio/components/panels/StickersPanel.tsx`
10. `src/pages/advertiser/studio/components/LayerPanel.tsx`
11. `src/pages/advertiser/studio/components/ObjectPropertiesBar.tsx`
12. `src/pages/advertiser/studio/components/CanvasArea.tsx`
13. `src/pages/advertiser/studio/DesignEditorInner.tsx`

### Task 2.3.x: Replace Ant Design in `<file>` (template — repeat per file)

- [ ] **Step 1: Find Ant imports in the file**

```bash
grep "from 'antd'" src/pages/advertiser/studio/<file>
```

- [ ] **Step 2: Replace each Ant component with the primitive**

Mapping:

| Ant Design | Replacement |
|---|---|
| `Button` | `Button` from `@fastlab-ai/design-editor` |
| `Tooltip` | `Tooltip` |
| `Popover` | `Popover` |
| `Input`, `InputNumber` | `Input` (`type="number"` for InputNumber) |
| `Slider` | `Slider` |
| `Select` | `Select` |
| `message.success/.error` | Replace with a new `useToast()` hook (Task 2.4) |
| `Modal` | Keep as native `<dialog>` or `@radix-ui/react-dialog` if needed (add to primitives) |
| `Dropdown` | Use `Popover` with menu items inside |
| `App` / `App.useApp()` | Remove; use `useToast()` |

For props that differ (e.g. Ant's `onChange` vs our `onValueChange` on Slider), update the prop name at the call site.

- [ ] **Step 3: Update icon imports**

`@ant-design/icons` is fine to keep as a dependency in AdSpot itself for non-studio screens. But inside studio files, replace each icon with the corresponding SVG icon from the existing `src/pages/advertiser/studio/components/IconRail.tsx` icon set (or `lucide-react` if more icons needed).

- [ ] **Step 4: Verify file typechecks**

```bash
pnpm check
```

Fix any errors before continuing.

- [ ] **Step 5: Run dev server and test the affected feature**

```bash
pnpm dev
```

Manually exercise the panel/toolbar/component that this file owns. Compare side-by-side with a screenshot of the previous behavior.

- [ ] **Step 6: Commit per file**

```bash
git add src/pages/advertiser/studio/<file>
git commit -m "refactor(studio): replace Ant Design with primitives in <filename>"
```

### Task 2.4: Build the `useToast` hook to replace `message.*`

**Files:**
- Create: `packages/design-editor/src/components/primitives/Toast.tsx`
- Create: `packages/design-editor/src/hooks/useToast.ts`

- [ ] **Step 1: Install Sonner (lightweight toast lib)**

```bash
pnpm --filter @fastlab-ai/design-editor add sonner
```

- [ ] **Step 2: Create Toast primitive**

`packages/design-editor/src/components/primitives/Toast.tsx`:

```tsx
'use client'
import { Toaster, toast } from 'sonner'
export { Toaster }
export const toastApi = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast(msg),
  warning: (msg: string) => toast.warning(msg),
}
```

- [ ] **Step 3: Create useToast hook**

`packages/design-editor/src/hooks/useToast.ts`:

```typescript
'use client'
import { toastApi } from '../components/primitives/Toast'
export function useToast() { return toastApi }
```

- [ ] **Step 4: Mount `<Toaster />` in AdSpot root**

Edit `src/App.tsx`:

```tsx
import { Toaster } from '@fastlab-ai/design-editor/src/components/primitives/Toast'
// …
<Toaster position="bottom-right" />
```

- [ ] **Step 5: Find and replace `message.*` calls inside studio/**

```bash
grep -rn "App.useApp\|message\." src/pages/advertiser/studio/ | head
```

Replace `const { message } = App.useApp()` patterns with `const toast = useToast()`. Update `message.success('x')` to `toast.success('x')` etc.

- [ ] **Step 6: Commit**

```bash
git add packages/design-editor src/App.tsx src/pages/advertiser/studio/
git commit -m "feat: useToast hook + replace antd message API in studio"
```

### Task 2.5: Verify full Studio works without Ant

- [ ] **Step 1: Confirm no antd imports remain**

```bash
grep -rn "from 'antd'\|from '@ant-design/icons'" src/pages/advertiser/studio/
```

Expected: empty.

- [ ] **Step 2: Full manual test pass**

Walk through every Studio interaction:
- Open new design
- Insert text, shape, sticker
- Upload image, remove background
- Reorder layers
- Resize/rotate object
- Undo/redo
- Change zoom
- Export design
- Autosave + reload

Compare against the pre-change behavior — note any visual or behavioral drift.

- [ ] **Step 3: Commit any final adjustments**

```bash
git add -A
git commit -m "fix(studio): visual parity fixes after antd removal"
```

**Phase 2 done.** Merge to `feature/creative-studio` after manual QA and CI green.

---

## Phase 3 — Provider Interfaces & AdSpot Adapters

**Exit criteria:** Provider interfaces defined in the package with default implementations. AdSpot Studio uses provider pattern internally — passing default LocalStoragePersistenceProvider still produces working behavior.

### Task 3.1: Define provider interfaces

**Files:**
- Create: `packages/design-editor/src/providers/media.ts`
- Create: `packages/design-editor/src/providers/fonts.ts`
- Create: `packages/design-editor/src/providers/backgroundRemoval.ts`
- Create: `packages/design-editor/src/providers/persistence.ts`
- Create: `packages/design-editor/src/providers/index.ts`

- [ ] **Step 1: Create media.ts**

`packages/design-editor/src/providers/media.ts`:

```typescript
export interface MediaItem {
  id: string
  url: string
  thumbnailUrl?: string
  width?: number
  height?: number
  name?: string
  mimeType?: string
}

export interface MediaListResult {
  items: MediaItem[]
  nextCursor?: string
}

export interface MediaProvider {
  list(opts: {
    cursor?: string
    search?: string
    signal?: AbortSignal
  }): Promise<MediaListResult>

  upload(
    file: File,
    opts?: { signal?: AbortSignal; onProgress?: (pct: number) => void },
  ): Promise<MediaItem>
}
```

- [ ] **Step 2: Create fonts.ts**

```typescript
export interface FontDescriptor {
  family: string
  weights?: number[]
  styles?: ('normal' | 'italic')[]
  category?: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace'
  previewUrl?: string
}

export interface FontProvider {
  list(opts?: { search?: string; signal?: AbortSignal }): Promise<FontDescriptor[]>
  load(family: string, opts?: { weight?: number; style?: string }): Promise<void>
}
```

- [ ] **Step 3: Create backgroundRemoval.ts**

```typescript
export interface BackgroundRemovalProvider {
  remove(
    input: string | Blob,
    opts?: { signal?: AbortSignal; onProgress?: (pct: number) => void },
  ): Promise<Blob>
}
```

- [ ] **Step 4: Create persistence.ts**

```typescript
import type { Scene } from '../engine'

export interface PersistenceProvider {
  save(sceneKey: string, scene: Scene): Promise<void>
  load(sceneKey: string): Promise<Scene | null>
  list?(): Promise<{ sceneKey: string; updatedAt: number; thumbnailUrl?: string }[]>
}
```

(If `Scene` isn't yet exported from `engine/index.ts`, add it.)

- [ ] **Step 5: Create providers/index.ts**

```typescript
export * from './media'
export * from './fonts'
export * from './backgroundRemoval'
export * from './persistence'
```

- [ ] **Step 6: Commit**

```bash
git add packages/design-editor/src/providers
git commit -m "feat(providers): define MediaProvider/FontProvider/BgRemoval/Persistence interfaces"
```

### Task 3.2: Implement default providers

**Files:**
- Create: `packages/design-editor/src/providers/defaults/localStoragePersistence.ts`
- Create: `packages/design-editor/src/providers/defaults/googleFonts.ts`
- Create: `packages/design-editor/src/providers/defaults/imglyBackgroundRemoval.ts`
- Create: `packages/design-editor/src/providers/defaults/nullMedia.ts`
- Create: `packages/design-editor/src/providers/defaults/index.ts`

- [ ] **Step 1: Create localStoragePersistence**

```typescript
import type { PersistenceProvider } from '../persistence'
import type { Scene } from '../../engine'

export function createLocalStoragePersistence(
  opts: { prefix?: string } = {},
): PersistenceProvider {
  const prefix = opts.prefix ?? 'design_editor_scene_'
  return {
    async save(sceneKey, scene) {
      localStorage.setItem(prefix + sceneKey, JSON.stringify(scene))
    },
    async load(sceneKey) {
      const raw = localStorage.getItem(prefix + sceneKey)
      return raw ? (JSON.parse(raw) as Scene) : null
    },
    async list() {
      const out: { sceneKey: string; updatedAt: number }[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(prefix)) {
          out.push({ sceneKey: key.slice(prefix.length), updatedAt: 0 })
        }
      }
      return out
    },
  }
}
```

- [ ] **Step 2: Create googleFonts**

```typescript
import type { FontProvider, FontDescriptor } from '../fonts'

const GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts'

export function createGoogleFontsProvider(
  opts: { apiKey?: string } = {},
): FontProvider {
  const loaded = new Set<string>()
  return {
    async list({ search, signal } = {}) {
      if (!opts.apiKey) {
        return CURATED_FONTS.filter((f) =>
          !search || f.family.toLowerCase().includes(search.toLowerCase()),
        )
      }
      const url = `${GOOGLE_FONTS_API}?key=${opts.apiKey}&sort=popularity`
      const res = await fetch(url, { signal })
      const data = await res.json() as { items: any[] }
      return data.items.map((it): FontDescriptor => ({
        family: it.family,
        weights: it.variants.filter((v: string) => /^\d+$/.test(v)).map(Number),
        category: it.category,
      }))
    },
    async load(family) {
      if (loaded.has(family)) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;700&display=swap`
      document.head.appendChild(link)
      await document.fonts.ready
      loaded.add(family)
    },
  }
}

const CURATED_FONTS: FontDescriptor[] = [
  { family: 'Inter', category: 'sans-serif' },
  { family: 'Roboto', category: 'sans-serif' },
  { family: 'Open Sans', category: 'sans-serif' },
  { family: 'Lato', category: 'sans-serif' },
  { family: 'Montserrat', category: 'sans-serif' },
  { family: 'Playfair Display', category: 'serif' },
  { family: 'Merriweather', category: 'serif' },
  { family: 'JetBrains Mono', category: 'monospace' },
]
```

- [ ] **Step 3: Create imglyBackgroundRemoval**

```typescript
import type { BackgroundRemovalProvider } from '../backgroundRemoval'

export function createImglyBackgroundRemoval(): BackgroundRemovalProvider {
  return {
    async remove(input, opts) {
      let removeBackground: typeof import('@imgly/background-removal').removeBackground
      try {
        ({ removeBackground } = await import('@imgly/background-removal'))
      } catch {
        throw new Error(
          '@imgly/background-removal is not installed. Either install it as a peer dependency or pass a custom backgroundRemovalProvider prop.',
        )
      }
      return removeBackground(input, {
        progress: opts?.onProgress
          ? (_key, current, total) => opts.onProgress!(current / total)
          : undefined,
      })
    },
  }
}
```

- [ ] **Step 4: Create nullMedia**

```typescript
import type { MediaProvider } from '../media'

export function createNullMediaProvider(): MediaProvider {
  return {
    async list() { return { items: [] } },
    async upload() {
      throw new Error(
        'No mediaProvider configured. Pass a mediaProvider prop to <DesignEditor /> to enable uploads.',
      )
    },
  }
}
```

- [ ] **Step 5: Export from defaults/index.ts**

```typescript
export * from './localStoragePersistence'
export * from './googleFonts'
export * from './imglyBackgroundRemoval'
export * from './nullMedia'
```

- [ ] **Step 6: Re-export from providers/index.ts**

Update `providers/index.ts`:

```typescript
export * from './media'
export * from './fonts'
export * from './backgroundRemoval'
export * from './persistence'
export * from './defaults'
```

- [ ] **Step 7: Write unit tests for the defaults**

`packages/design-editor/src/providers/defaults/__tests__/localStoragePersistence.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { createLocalStoragePersistence } from '../localStoragePersistence'

describe('localStoragePersistence', () => {
  beforeEach(() => localStorage.clear())

  it('saves and loads a scene', async () => {
    const p = createLocalStoragePersistence()
    const scene: any = { id: 's1', layers: [], width: 100, height: 100 }
    await p.save('test', scene)
    expect(await p.load('test')).toEqual(scene)
  })

  it('returns null for missing scene', async () => {
    const p = createLocalStoragePersistence()
    expect(await p.load('missing')).toBeNull()
  })

  it('lists saved scenes', async () => {
    const p = createLocalStoragePersistence({ prefix: 'pfx_' })
    await p.save('a', { id: 'a' } as any)
    await p.save('b', { id: 'b' } as any)
    const list = await p.list!()
    expect(list.map((s) => s.sceneKey).sort()).toEqual(['a', 'b'])
  })
})
```

- [ ] **Step 8: Run tests and commit**

```bash
pnpm --filter @fastlab-ai/design-editor test
git add packages/design-editor/src/providers
git commit -m "feat(providers): default implementations + tests"
```

### Task 3.3: Build AdSpot adapter implementations

**Files:**
- Create: `src/lib/studio/adspotMediaProvider.ts`
- Create: `src/lib/studio/adspotPersistenceProvider.ts`
- Create: `src/lib/studio/adspotBackgroundRemovalProvider.ts` (if AdSpot has a server-side bg-removal endpoint; otherwise reuse the @imgly default)

- [ ] **Step 1: Find existing AdSpot media library API calls**

```bash
grep -rn "uploads/media\|media/list\|/api/media" src/pages/advertiser/studio/ src/lib/ | head
```

- [ ] **Step 2: Create adspotMediaProvider.ts**

```typescript
import type { MediaProvider, MediaItem, MediaListResult } from '@fastlab-ai/design-editor'
import { getJson, postJson } from '@/lib/api'

export function createAdspotMediaProvider(): MediaProvider {
  return {
    async list({ cursor, search, signal }): Promise<MediaListResult> {
      const params = new URLSearchParams()
      if (cursor) params.set('cursor', cursor)
      if (search) params.set('q', search)
      const data = await getJson<{ items: MediaItem[]; nextCursor?: string }>(
        `/api/media?${params}`,
        { signal },
      )
      return { items: data.items, nextCursor: data.nextCursor }
    },
    async upload(file, opts) {
      const form = new FormData()
      form.append('file', file)
      const data = await postJson<MediaItem>('/api/media/upload', form, {
        signal: opts?.signal,
        onUploadProgress: opts?.onProgress
          ? (pct: number) => opts.onProgress!(pct)
          : undefined,
      })
      return data
    },
  }
}
```

Adjust the `getJson`/`postJson` signatures to whatever AdSpot's `src/lib/api.ts` actually exposes (read it first to confirm — refer to memory: API responses use `ResponseHelper.success` wrapper).

- [ ] **Step 3: Create adspotPersistenceProvider.ts**

```typescript
import type { PersistenceProvider, Scene } from '@fastlab-ai/design-editor'
import { getJson, postJson } from '@/lib/api'

export function createAdspotPersistenceProvider(): PersistenceProvider {
  return {
    async save(sceneKey, scene) {
      await postJson('/api/designs/save', { sceneKey, scene })
    },
    async load(sceneKey) {
      try {
        return await getJson<Scene>(`/api/designs/${sceneKey}`)
      } catch {
        return null
      }
    },
    async list() {
      return await getJson('/api/designs')
    },
  }
}
```

If these endpoints don't exist yet on the AdSpot backend, this task expands to include creating the NestJS controller + service + DTOs and a Prisma migration for a `DesignScene` model. Refer to memory: backend modules live in `api/modules/{name}/`. Add a new `api/modules/designs/` module with controller, service, module, and DTOs. Add a Prisma model `DesignScene { id, ownerId, sceneKey, sceneJson, updatedAt }`. Run `pnpm db:migrate`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/studio api prisma
git commit -m "feat(adspot): adapter implementations of MediaProvider/PersistenceProvider"
```

### Task 3.4: Wire providers into AdSpot Studio

**Files:**
- Modify: `src/pages/advertiser/studio/DesignEditor.tsx`
- Modify: `src/pages/advertiser/studio/DesignEditorInner.tsx`

- [ ] **Step 1: Update DesignEditor.tsx to construct providers**

```tsx
import { Provider } from '@/pages/advertiser/studio/_internal_layerhub_provider'  // temp
import { useNavigate, useLocation } from 'react-router-dom'
import { createAdspotMediaProvider } from '@/lib/studio/adspotMediaProvider'
import { createAdspotPersistenceProvider } from '@/lib/studio/adspotPersistenceProvider'
import {
  createGoogleFontsProvider,
  createImglyBackgroundRemoval,
} from '@fastlab-ai/design-editor'
import { DesignEditorInner } from './DesignEditorInner'

const mediaProvider = createAdspotMediaProvider()
const persistenceProvider = createAdspotPersistenceProvider()
const fontProvider = createGoogleFontsProvider()
const bgRemovalProvider = createImglyBackgroundRemoval()

export default function DesignEditor() {
  const navigate = useNavigate()
  const location = useLocation()
  // ...existing initialScene resolution...

  return (
    <Provider>
      <DesignEditorInner
        onBack={() => navigate('/advertiser/studio')}
        initialScene={initialScene}
        mediaProvider={mediaProvider}
        fontProvider={fontProvider}
        backgroundRemovalProvider={bgRemovalProvider}
        persistenceProvider={persistenceProvider}
      />
    </Provider>
  )
}
```

- [ ] **Step 2: Update DesignEditorInner.tsx props**

Add provider props to its interface and pass them down to the panels that need them:

- `LibraryPanel` ← `mediaProvider`
- `UploadPanel` ← `mediaProvider`
- `FontsPanel` ← `fontProvider`
- `useAutoSave` hook ← `persistenceProvider`
- Background-remove button handler ← `backgroundRemovalProvider`

Each panel's existing fetch calls get replaced with `await mediaProvider.list(...)` etc.

- [ ] **Step 3: Run dev and verify all integrations still work**

```bash
pnpm dev
```

Test: open Library panel (should list AdSpot media), upload an image, change fonts, remove background, save and reload to check autosave.

- [ ] **Step 4: Commit**

```bash
git add src/pages/advertiser/studio
git commit -m "refactor(studio): consume provider pattern for media/fonts/bg-removal/persistence"
```

**Phase 3 done.** Merge to `feature/creative-studio`.

---

## Phase 4 — Migrate Components into the Package

**Exit criteria:** `src/pages/advertiser/studio/DesignEditorInner.tsx` and sub-files are deleted. AdSpot's `DesignEditor.tsx` is a thin shim importing from `@fastlab-ai/design-editor`. Visual + functional parity verified.

### Task 4.1: Add EditorContext / DesignEditor composite shell in package

**Files:**
- Create: `packages/design-editor/src/components/DesignEditor.tsx`
- Create: `packages/design-editor/src/components/EditorContext.tsx`

- [ ] **Step 1: Create EditorContext**

`packages/design-editor/src/components/EditorContext.tsx`:

```tsx
'use client'
import * as React from 'react'
import type { MediaProvider, FontProvider, BackgroundRemovalProvider, PersistenceProvider } from '../providers'

export interface EditorContextValue {
  mediaProvider: MediaProvider
  fontProvider: FontProvider
  backgroundRemovalProvider: BackgroundRemovalProvider
  persistenceProvider: PersistenceProvider
  sceneKey?: string
  onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg') => void | Promise<void>
}

const Ctx = React.createContext<EditorContextValue | null>(null)
export function useEditorContext() {
  const v = React.useContext(Ctx)
  if (!v) throw new Error('useEditorContext must be used inside <DesignEditor>')
  return v
}
export const EditorContextProvider = Ctx.Provider
```

- [ ] **Step 2: Create DesignEditor composite shell**

`packages/design-editor/src/components/DesignEditor.tsx`:

```tsx
'use client'
import * as React from 'react'
import { EditorProvider as EngineProvider } from '../engine/react'
import { EditorContextProvider } from './EditorContext'
import { Toaster } from './primitives/Toast'
import {
  createNullMediaProvider,
  createGoogleFontsProvider,
  createImglyBackgroundRemoval,
  createLocalStoragePersistence,
} from '../providers/defaults'
import type { MediaProvider, FontProvider, BackgroundRemovalProvider, PersistenceProvider } from '../providers'
import type { Scene } from '../engine'

export interface DesignEditorProps {
  initialScene?: Scene
  sceneKey?: string
  onBack?: () => void
  onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg') => void | Promise<void>
  mediaProvider?: MediaProvider
  fontProvider?: FontProvider
  backgroundRemovalProvider?: BackgroundRemovalProvider
  persistenceProvider?: PersistenceProvider
  className?: string
}

export function DesignEditor({
  initialScene,
  sceneKey,
  onBack,
  onExport,
  mediaProvider = createNullMediaProvider(),
  fontProvider = createGoogleFontsProvider(),
  backgroundRemovalProvider = createImglyBackgroundRemoval(),
  persistenceProvider = createLocalStoragePersistence(),
  className,
}: DesignEditorProps) {
  const ctx = React.useMemo(
    () => ({ mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, sceneKey, onExport }),
    [mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, sceneKey, onExport],
  )
  return (
    <EngineProvider>
      <EditorContextProvider value={ctx}>
        <div data-de-root className={className}>
          {/* Editor body — filled in by Task 4.2 */}
        </div>
        <Toaster position="bottom-right" />
      </EditorContextProvider>
    </EngineProvider>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/design-editor/src/components
git commit -m "feat(design-editor): DesignEditor shell + EditorContext"
```

### Task 4.2: Move each Studio component into the package

For each of the following files, do the **Move sub-cycle** below:

| Source (AdSpot) | Destination (package) |
|---|---|
| `src/pages/advertiser/studio/components/CanvasArea.tsx` | `packages/design-editor/src/components/Canvas.tsx` |
| `src/pages/advertiser/studio/components/Toolbar.tsx` | `packages/design-editor/src/components/Toolbar.tsx` |
| `src/pages/advertiser/studio/components/IconRail.tsx` | `packages/design-editor/src/components/IconRail.tsx` |
| `src/pages/advertiser/studio/components/LayerPanel.tsx` | `packages/design-editor/src/components/LayerPanel.tsx` |
| `src/pages/advertiser/studio/components/ObjectPropertiesBar.tsx` | `packages/design-editor/src/components/ObjectPropertiesBar.tsx` |
| `src/pages/advertiser/studio/components/panels/*.tsx` | `packages/design-editor/src/components/panels/*.tsx` |
| `src/pages/advertiser/studio/hooks/*.ts` | `packages/design-editor/src/hooks/*.ts` |

### Task 4.2.x — Move sub-cycle (per file)

- [ ] **Step 1: Copy file to destination**

```bash
cp src/pages/advertiser/studio/components/<file> packages/design-editor/src/components/<NewName>
```

- [ ] **Step 2: Add `'use client'` at top**

Edit the new file, ensure first non-blank line is `'use client'`.

- [ ] **Step 3: Rewrite imports**

- `from '@layerhub-io/react'` → `from '../engine/react'` (or relative path equivalent)
- `from '@/...'` (AdSpot alias) → use the package's own `providers`, `hooks`, or `primitives`
- AdSpot-specific imports (router, redux, AdspotMediaPanel) → **replace with context/props**:
  - `useNavigate()` → use `onBack` prop from EditorContext / DesignEditor props
  - AdSpot media library access → use `useEditorContext().mediaProvider`
  - AdSpot fonts → `useEditorContext().fontProvider`

- [ ] **Step 4: Update consumers (still in AdSpot) to import from the package**

In AdSpot's `DesignEditorInner.tsx`, change:

```typescript
import { CanvasArea } from './components/CanvasArea'
```

to:

```typescript
import { Canvas as CanvasArea } from '@fastlab-ai/design-editor'
```

- [ ] **Step 5: Delete the old AdSpot file**

```bash
git rm src/pages/advertiser/studio/components/<file>
```

- [ ] **Step 6: Run dev, verify the feature still works**

```bash
pnpm dev
```

- [ ] **Step 7: Commit per file**

```bash
git add -A
git commit -m "refactor(studio): move <ComponentName> into design-editor package"
```

Repeat for each component file.

### Task 4.3: Move hooks into the package

For each hook in `src/pages/advertiser/studio/hooks/`:

- [ ] **Step 1: Copy to `packages/design-editor/src/hooks/`**

- [ ] **Step 2: Rewrite imports** (engine imports become relative; AdSpot imports get replaced with `useEditorContext()` access)

- [ ] **Step 3: Export from package `index.ts`**

- [ ] **Step 4: Update AdSpot's imports to consume from the package**

- [ ] **Step 5: Delete the AdSpot copy**

- [ ] **Step 6: Commit**

### Task 4.4: Compose the editor body inside `<DesignEditor>`

**Files:**
- Modify: `packages/design-editor/src/components/DesignEditor.tsx`

- [ ] **Step 1: Move the JSX from AdSpot's `DesignEditorInner.tsx` into the body of `<DesignEditor>`**

That is: the Toolbar / IconRail / Canvas / LayerPanel / ObjectPropertiesBar layout. Replace AdSpot-specific imports/handlers with context-driven equivalents.

- [ ] **Step 2: Delete `src/pages/advertiser/studio/DesignEditorInner.tsx`**

- [ ] **Step 3: Reduce AdSpot's `DesignEditor.tsx` to a shim**

```tsx
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { createAdspotMediaProvider } from '@/lib/studio/adspotMediaProvider'
import { createAdspotPersistenceProvider } from '@/lib/studio/adspotPersistenceProvider'
import {
  createGoogleFontsProvider,
  createImglyBackgroundRemoval,
} from '@fastlab-ai/design-editor'

const mediaProvider = createAdspotMediaProvider()
const persistenceProvider = createAdspotPersistenceProvider()
const fontProvider = createGoogleFontsProvider()
const bgRemovalProvider = createImglyBackgroundRemoval()

export default function AdspotDesignEditor() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { sceneKey?: string; newDesign?: boolean; initialScene?: any } | null

  let initialScene: any
  if (state?.newDesign) initialScene = {}
  else if (state?.initialScene) initialScene = state.initialScene
  else if (state?.sceneKey) {
    try {
      const raw = localStorage.getItem(`design_scene_${state.sceneKey}`)
      if (raw) initialScene = JSON.parse(raw)
    } catch {}
  }

  return (
    <DesignEditor
      initialScene={initialScene}
      sceneKey={state?.sceneKey}
      onBack={() => navigate('/advertiser/studio')}
      mediaProvider={mediaProvider}
      fontProvider={fontProvider}
      backgroundRemovalProvider={bgRemovalProvider}
      persistenceProvider={persistenceProvider}
    />
  )
}
```

- [ ] **Step 4: Build the package and AdSpot together**

```bash
pnpm --filter @fastlab-ai/design-editor build
pnpm build
```

- [ ] **Step 5: Run dev, perform full Studio regression test (same checklist as Task 2.5 Step 2)**

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(studio): reduce adspot DesignEditor to shim consuming the package"
```

### Task 4.5: Add `'use client'` post-build step

**Files:**
- Create: `packages/design-editor/scripts/postbuild-use-client.mjs`

- [ ] **Step 1: Create the script**

```javascript
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'

const DIST = new URL('../dist/', import.meta.url).pathname

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

// Files that contain React components/hooks need the directive; engine/providers do not.
// Heuristic: only add to dist/index.js and dist/index.cjs (the bundled entries).
// If we split entries later, expand the list.
const targets = ['index.js', 'index.cjs']
for (const t of targets) {
  const path = join(DIST, t)
  try {
    const src = readFileSync(path, 'utf8')
    if (src.startsWith("'use client'") || src.startsWith('"use client"')) continue
    writeFileSync(path, `'use client';\n${src}`)
    console.log(`+ 'use client' prepended to ${t}`)
  } catch {}
}
```

- [ ] **Step 2: Verify build pipeline runs it**

`package.json` `build` script already references `node scripts/postbuild-use-client.mjs` from Task 0.3 Step 2.

- [ ] **Step 3: Re-build and inspect**

```bash
pnpm --filter @fastlab-ai/design-editor build
head -1 packages/design-editor/dist/index.js
```

Expected: first line is `'use client';`.

- [ ] **Step 4: Commit**

```bash
git add packages/design-editor/scripts
git commit -m "build(design-editor): prepend 'use client' to dist entries for Next.js compat"
```

**Phase 4 done.** Merge to `feature/creative-studio` after full regression.

---

## Phase 5 — Polish for OSS Release

**Exit criteria:** TypeScript strict pass clean; docs site deploys to GitHub Pages; playground deploys; 3+ example apps build clean in CI; README is publishable.

### Task 5.1: TypeScript strict cleanup

- [ ] **Step 1: Run typecheck and capture errors**

```bash
pnpm --filter @fastlab-ai/design-editor typecheck 2>&1 | tee /tmp/ts-errors.txt
wc -l /tmp/ts-errors.txt
```

- [ ] **Step 2: Find all `any` usages**

```bash
grep -rn ": any\b\|<any>\|as any" packages/design-editor/src/ | grep -v __tests__ | head -100
```

- [ ] **Step 3: Replace `any` with real types — iteratively**

For each `any`, pick the narrowest type that compiles. Use `unknown` + type guards instead of `any` where the value is genuinely dynamic.

Commit in batches by file: `chore(types): tighten types in <file>`.

- [ ] **Step 4: Add TSDoc on every public export**

Open `packages/design-editor/src/index.ts`. For each re-exported symbol, ensure its definition site has at least a one-line TSDoc comment. Example:

```typescript
/** Image design editor component. See [docs](https://fastlab.ai/design-editor) for full API. */
export function DesignEditor(props: DesignEditorProps): JSX.Element { … }
```

- [ ] **Step 5: Commit final typecheck-clean state**

```bash
git add packages/design-editor
git commit -m "chore(types): strict-clean public API + TSDoc"
```

### Task 5.2: Set up changesets

- [ ] **Step 1: Install changesets**

```bash
pnpm add -D -w @changesets/cli
pnpm dlx @changesets/cli init
```

- [ ] **Step 2: Configure for public publish**

Edit `.changeset/config.json`:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["adspot"]
}
```

`"ignore": ["adspot"]` keeps changesets from versioning the root AdSpot app.

- [ ] **Step 3: Add release script to root package.json**

```json
"scripts": {
  "release": "pnpm --filter @fastlab-ai/design-editor build && pnpm --filter @fastlab-ai/design-editor test && changeset publish"
}
```

- [ ] **Step 4: Commit**

```bash
git add .changeset package.json pnpm-lock.yaml
git commit -m "chore: set up changesets for design-editor releases"
```

### Task 5.3: Docs site (`apps/docs/`)

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/astro.config.mjs`
- Create: `apps/docs/src/content/docs/*.mdx`

- [ ] **Step 1: Scaffold Astro Starlight**

```bash
mkdir -p apps/docs
cd apps/docs
pnpm create astro@latest . -- --template starlight --no-install --no-git --yes
cd -
pnpm install
```

- [ ] **Step 2: Configure site metadata**

Edit `apps/docs/astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://fastlab-ai.github.io',
  base: '/design-editor',
  integrations: [
    starlight({
      title: '@fastlab-ai/design-editor',
      social: { github: 'https://github.com/fastlabai/design-editor' },
      sidebar: [
        { label: 'Getting Started', link: '/getting-started' },
        { label: 'Next.js', link: '/nextjs' },
        { label: 'Providers',
          items: [
            { label: 'Media', link: '/providers/media' },
            { label: 'Fonts', link: '/providers/fonts' },
            { label: 'Background Removal', link: '/providers/background-removal' },
            { label: 'Persistence', link: '/providers/persistence' },
          ],
        },
        { label: 'API Reference', link: '/api' },
      ],
    }),
  ],
})
```

- [ ] **Step 3: Write the Getting Started page**

`apps/docs/src/content/docs/getting-started.mdx`:

````mdx
---
title: Getting Started
description: Install @fastlab-ai/design-editor and ship an image editor in 5 minutes.
---

## Install

```bash
npm install @fastlab-ai/design-editor
# optional: enables in-browser background removal
npm install @imgly/background-removal
```

## Use

```tsx
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

export default function App() {
  return <DesignEditor />
}
```

That's it. The editor uses sensible defaults: localStorage for autosave, Google Fonts for fonts, `@imgly/background-removal` for background removal (if installed), and shows an empty Library panel (configure `mediaProvider` to enable).

## Next steps

- [Plug in your own media library](/providers/media)
- [Wire up custom fonts](/providers/fonts)
- [Next.js App Router guide](/nextjs)
````

- [ ] **Step 4: Write Next.js page**

`apps/docs/src/content/docs/nextjs.mdx`:

````mdx
---
title: Next.js
---

The editor is client-only — it manipulates `<canvas>` and uses browser APIs.

## App Router

```tsx
// app/editor/page.tsx
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

export default function Page() {
  return <DesignEditor />
}
```

The package marks its components with `'use client'`, so App Router treats this correctly with no extra config.

## Pages Router

```tsx
// pages/editor.tsx
import dynamic from 'next/dynamic'

const DesignEditor = dynamic(
  () => import('@fastlab-ai/design-editor').then((m) => m.DesignEditor),
  { ssr: false },
)

export default function Editor() { return <DesignEditor /> }
```

## SSR-safe imports

Type-only imports and engine-only utilities (`Scene`, `serializeScene`) are SSR-safe and can be used in `app/api/*` routes or `getServerSideProps`.
````

- [ ] **Step 5: Write provider pages**

One MDX file per provider (`providers/media.mdx`, `providers/fonts.mdx`, `providers/background-removal.mdx`, `providers/persistence.mdx`). Each shows the interface, the default, and a custom-implementation example.

- [ ] **Step 6: Add TypeDoc API reference**

```bash
pnpm --filter @fastlab-ai/design-editor add -D typedoc typedoc-plugin-markdown
```

Add a script in `apps/docs/package.json`:

```json
"scripts": {
  "build:api": "typedoc --plugin typedoc-plugin-markdown --out src/content/docs/api ../../packages/design-editor/src/index.ts"
}
```

Run it; commit the generated files.

- [ ] **Step 7: Build and verify locally**

```bash
pnpm --filter docs build:api
pnpm --filter docs build
pnpm --filter docs preview
```

Open the URL, click through each page.

- [ ] **Step 8: Deploy to GitHub Pages**

Create `.github/workflows/docs.yml`:

```yaml
name: Deploy docs
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9.15.0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter docs build:api
      - run: pnpm --filter docs build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: apps/docs/dist }
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 9: Commit**

```bash
git add apps/docs .github/workflows/docs.yml
git commit -m "docs: Astro Starlight site with getting-started, nextjs, providers, api"
```

### Task 5.4: Playground (`apps/playground/`)

**Files:**
- Create: `apps/playground/package.json`
- Create: `apps/playground/index.html`
- Create: `apps/playground/src/main.tsx`
- Create: `apps/playground/vite.config.ts`

- [ ] **Step 1: Scaffold Vite React app**

```bash
mkdir -p apps/playground
cd apps/playground
pnpm create vite@latest . --template react-ts -- --skip-git
cd -
pnpm install
```

- [ ] **Step 2: Add design-editor as workspace dep**

In `apps/playground/package.json`:

```json
"dependencies": {
  "@fastlab-ai/design-editor": "workspace:*",
  "@imgly/background-removal": "^1.7.0"
}
```

- [ ] **Step 3: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ height: '100vh' }}>
      <DesignEditor onExport={(blob) => downloadBlob(blob)} />
    </div>
  </StrictMode>,
)

function downloadBlob(blob: Blob) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'design.png'
  a.click()
}
```

- [ ] **Step 4: Build and deploy**

Add to `.github/workflows/docs.yml`: build `apps/playground` too and place output under `apps/docs/dist/playground/`.

- [ ] **Step 5: Commit**

```bash
git add apps/playground .github/workflows/docs.yml
git commit -m "feat(playground): live editor playground deployed alongside docs"
```

### Task 5.5: Example apps (`examples/`)

For each: scaffold with the framework's CLI, install the package, write a minimal page.

- [ ] **Step 1: Scaffold examples/nextjs-app-router/**

```bash
cd examples
pnpm create next-app@latest nextjs-app-router --typescript --app --eslint --no-tailwind --no-src-dir --no-import-alias --use-pnpm
cd -
```

Edit `examples/nextjs-app-router/package.json` to add:

```json
"dependencies": {
  "@fastlab-ai/design-editor": "workspace:*"
}
```

Edit `examples/nextjs-app-router/app/page.tsx`:

```tsx
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

export default function Home() {
  return (
    <main style={{ height: '100vh' }}>
      <DesignEditor />
    </main>
  )
}
```

- [ ] **Step 2: Scaffold examples/nextjs-pages-router/**

Similar but with `--pages-router`. The example uses `dynamic()` import (see docs page).

- [ ] **Step 3: Scaffold examples/vite-react/**

```bash
cd examples
pnpm create vite@latest vite-react --template react-ts
cd -
```

Same `<DesignEditor />` usage.

- [ ] **Step 4: Scaffold examples/custom-providers/**

Copy `vite-react` and modify `src/App.tsx` to show a hand-rolled `MediaProvider` and `FontProvider`. Demonstrate `MediaItem` extension with a typed `tags` field.

- [ ] **Step 5: Wire examples into CI**

Add to `.github/workflows/ci.yml`:

```yaml
      - name: Build examples
        run: |
          pnpm --filter nextjs-app-router build
          pnpm --filter nextjs-pages-router build
          pnpm --filter vite-react build
          pnpm --filter custom-providers build
```

(Adjust filter names to match the `name` field in each example's package.json.)

- [ ] **Step 6: Commit**

```bash
git add examples .github/workflows/ci.yml
git commit -m "examples: nextjs-app-router, nextjs-pages-router, vite-react, custom-providers"
```

### Task 5.6: Write the package README

**Files:**
- Modify: `packages/design-editor/README.md`

- [ ] **Step 1: Replace stub with full README**

````markdown
# @fastlab-ai/design-editor

[![npm version](https://img.shields.io/npm/v/@fastlab-ai/design-editor.svg)](https://www.npmjs.com/package/@fastlab-ai/design-editor)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/fastlabai/design-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/fastlabai/design-editor/actions/workflows/ci.yml)

An open-source image design editor for React and Next.js. Plug into your own media library, fonts, and storage backend via simple provider interfaces.

## Features

- Canvas-based image design editor with layers, shapes, text, stickers
- Background removal (via optional `@imgly/background-removal` peer dep)
- Undo/redo, zoom/pan, autosave
- Theme via CSS variables
- TypeScript-first, strict types
- Next.js App Router compatible (uses `'use client'`)
- ~150KB gzipped (excluding Fabric.js)

## Install

```bash
npm install @fastlab-ai/design-editor
```

## Use

```tsx
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

export default function App() {
  return <DesignEditor />
}
```

## Docs

Full documentation at <https://fastlab-ai.github.io/design-editor>.
Live playground: <https://fastlab-ai.github.io/design-editor/playground>.

## License

MIT © Fastlab.

Engine code forked from [layerhub-io](https://github.com/layerhub-io/layerhub-ce) (MIT).
````

- [ ] **Step 2: Add a screenshot to the README**

Take a screenshot of the AdSpot Studio (or playground), commit it as `packages/design-editor/screenshot.png`, and reference it in the README.

- [ ] **Step 3: Commit**

```bash
git add packages/design-editor/README.md packages/design-editor/screenshot.png
git commit -m "docs(design-editor): README + screenshot for npm/GitHub"
```

### Task 5.7: Add size-limit gate

**Files:**
- Create: `packages/design-editor/.size-limit.json`
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Create size-limit config**

```json
[
  {
    "name": "Editor entry (gzipped)",
    "path": "dist/index.js",
    "limit": "150 KB",
    "ignore": ["react", "react-dom", "@imgly/background-removal"]
  },
  {
    "name": "Engine entry (gzipped)",
    "path": "dist/engine.js",
    "limit": "80 KB"
  }
]
```

(Only enable engine entry once we add a subpath export — defer if not yet present.)

- [ ] **Step 2: Add CI step**

In `.github/workflows/ci.yml`:

```yaml
      - run: pnpm --filter @fastlab-ai/design-editor size
```

- [ ] **Step 3: Commit**

```bash
git add packages/design-editor/.size-limit.json .github/workflows/ci.yml
git commit -m "ci: size-limit gate at 150KB for design-editor entry"
```

**Phase 5 done.** Merge to `feature/creative-studio`. Then plan the `main` merge.

---

## Phase 6 — First Publish

**Exit criteria:** `npm install @fastlab-ai/design-editor` works from a fresh project; GitHub release tagged; npm package page shows README; ongoing publish workflow is one command.

### Task 6.1: Create npm organization (do this early, in parallel with Phase 5)

- [ ] **Step 1: Visit npmjs.com, sign in / create account**

- [ ] **Step 2: Create scope `@fastlab-ai`**

Settings → Organizations → Create. Pick **free** tier (public packages only). Verify email if prompted.

- [ ] **Step 3: Add publish token to GitHub repo secrets**

Local: `npm login`, then `npm token create --read-only` (no, write-token):

```bash
npm token create
```

Copy the token. In GitHub repo → Settings → Secrets and variables → Actions → New repository secret. Name: `NPM_TOKEN`. Paste value.

### Task 6.2: Merge to main

- [ ] **Step 1: Open PR from feature/creative-studio → main**

- [ ] **Step 2: CI must pass: typecheck, lint, test, build, size, examples, docs**

- [ ] **Step 3: Manual reviewer approval, then squash-merge**

### Task 6.3: Cut the first release

- [ ] **Step 1: From `main`, create a changeset**

```bash
git checkout main && git pull
pnpm changeset
```

Choose `@fastlab-ai/design-editor`, bump type `minor` (0.1.0), summary: "Initial public release. Image design editor with canvas, text, shapes, stickers, image upload, background removal, layers, undo/redo, zoom, export, autosave. Plug into your own backend via MediaProvider / FontProvider / PersistenceProvider / BackgroundRemovalProvider."

- [ ] **Step 2: Version the package**

```bash
pnpm changeset version
```

This updates `packages/design-editor/package.json` to `0.1.0` and writes `packages/design-editor/CHANGELOG.md`.

- [ ] **Step 3: Commit the version bump**

```bash
git add -A
git commit -m "chore(release): @fastlab-ai/design-editor@0.1.0"
git push
```

- [ ] **Step 4: Publish to npm**

```bash
pnpm release
```

(This runs build + test + `changeset publish` which detects the bumped version and publishes it.)

Expected output: `+ @fastlab-ai/design-editor@0.1.0`.

- [ ] **Step 5: Tag the release**

```bash
git tag @fastlab-ai/design-editor@0.1.0
git push --tags
```

- [ ] **Step 6: Create GitHub release**

```bash
gh release create '@fastlab-ai/design-editor@0.1.0' \
  --title 'design-editor v0.1.0' \
  --notes-file packages/design-editor/CHANGELOG.md
```

### Task 6.4: Verify install from fresh project

- [ ] **Step 1: In a temp directory, scaffold a new Vite app**

```bash
mkdir /tmp/test-install && cd /tmp/test-install
pnpm create vite@latest . --template react-ts
pnpm install
pnpm add @fastlab-ai/design-editor
```

- [ ] **Step 2: Replace App.tsx with the README example**

- [ ] **Step 3: Run it**

```bash
pnpm dev
```

Open `http://localhost:5173`, confirm editor loads, type some text, export.

- [ ] **Step 4: Repeat for fresh Next.js App Router project**

```bash
pnpm create next-app@latest /tmp/test-next --typescript --app --no-tailwind --no-eslint --no-src-dir --no-import-alias --use-pnpm
cd /tmp/test-next
pnpm add @fastlab-ai/design-editor
```

Add the editor to `app/page.tsx`, run, verify.

- [ ] **Step 5: If anything fails, file an issue against the package, fix, and cut 0.1.1**

### Task 6.5: Announce

- [ ] **Step 1: Write a launch post**

Suggested venues: company blog, Twitter/X, Hacker News (Show HN), r/reactjs.

- [ ] **Step 2: Update AdSpot internal docs noting the package is live**

In `UPDATES.md`, add an entry under 2026-XX-XX.

---

## Self-Review

**Spec coverage:**

| Spec section | Covered by |
|---|---|
| 4. Workspace & Repo Layout | Phase 0 |
| 5. Layered Architecture | Phase 1 (engine) + Phase 4 (components) |
| 5.2 Public API surface | Task 5.1 + Task 4.2 (each move updates `index.ts`) |
| 6. Provider Interfaces | Phase 3 |
| 6.5 Bundled defaults | Task 3.2 |
| 7. Engine Fork Strategy | Phase 1 (esp. 1.1–1.4) |
| 7.4 Engine changes (strict TS, AbortSignal, EditorContext) | Task 4.1 + Task 5.1 |
| 8. Build, Bundling, Publishing | Task 0.3 (tsup), Task 4.5 (use client), Task 5.7 (size-limit), Phase 6 (publish) |
| 9. Testing Strategy | Task 1.5 (unit), Task 2.1 Step 7 (component), Task 5.7 (size) — Playwright integration deferred to v1.1 (acceptable trade since not gating release) |
| 10. Documentation | Task 5.3 (docs), Task 5.4 (playground), Task 5.5 (examples), Task 5.6 (README) |
| 11. AdSpot Cutover | Phases 0–4 |
| 12. Risks | Mitigations baked into phase exit criteria + parity checks |
| 15. Success Criteria | All 7 criteria covered by Phase 6 exit + Task 6.4 |

**Gap:** Visual regression (Playwright snapshots) and Playwright integration tests from spec section 9 aren't in the plan. Adding as a v1.1 task is acceptable — they're useful but not gating the first publish. Documented as a v1.1 follow-up below.

**Placeholder scan:** No "TBD", "TODO", or vague "handle edge cases" instructions. Each step has explicit commands and code.

**Type consistency:** Provider names match between `providers/*.ts`, `EditorContext`, and `DesignEditorProps`. Hook names match between Section 5.1 of the spec and Phase 4 imports. `Scene` type is sourced from `engine/` consistently.

---

## v1.1 Follow-Ups (Not in This Plan)

- Playwright integration tests + visual regression snapshots
- Lazy-loaded panels for bundle reduction
- Translations prop (i18n)
- Subpath exports (`/engine`, `/providers`) — enable once consumer demand surfaces
- Migration guide page for LayerHub users

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-21-design-editor-package.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
