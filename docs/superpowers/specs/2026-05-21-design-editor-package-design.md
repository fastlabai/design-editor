# `@fastlab-ai/design-editor` — Open-Source Package Design Spec

**Date:** 2026-05-21
**Author:** Mohd Gayasuddin (brainstorming session with Claude)
**Status:** Draft for review
**Scope:** Image-only design editor as an open-source npm package for React 18+ and Next.js, extracted from AdSpot Creative Studio, built alongside the AdSpot project, publishable to npm at any time.

---

## 1. Goals

1. Ship `@fastlab-ai/design-editor` — an MIT-licensed React/Next.js image design editor as an installable npm package.
2. Keep AdSpot Studio working without interruption during extraction. AdSpot becomes the first consumer of the package; AdSpot's Studio code shrinks to a thin shim.
3. Publish to npm at any time after Phase 6, with a one-command release flow (lint → test → build → size-check → publish → tag).
4. Be Next.js App Router compatible out of the box, with documented Pages Router support.
5. Be theme-able and back-end-agnostic — no lock-in to AdSpot's media library, fonts, or storage.

## 2. Non-Goals (v1)

- Video editing (stays inside AdSpot as `VideoEditor.tsx`)
- Realtime multi-user collaboration
- Server-side scene rendering
- Plugin/extension API
- Mobile/touch-optimized UX (functional, not polished)
- Animation/timeline
- AI image generation/fill

These are explicitly deferred to v2+ based on OSS user feedback.

## 3. Foundational Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Integration model | Extract & consume via pnpm workspace inside the AdSpot repo | Single source of truth; zero drift; AdSpot consumes the package while it's being built |
| Canvas engine | Fork & vendor `@layerhub-io/{core,react,objects,types}` into `src/engine/` | LayerHub upstream activity has slowed; vendoring gives full control and a single bundle |
| UI dependencies | Headless + CSS variables theme (no Ant Design) | OSS adoption requires zero forced UI framework; theming via `--de-*` CSS variables |
| SSR strategy | Client-only with `'use client'` markers on every component file | Editors are inherently interactive; types and engine remain server-safe |
| Public API | Single `<DesignEditor>` + composable hooks/components | One-line integration with full escape hatch |
| Feature scope v1 | Match current AdSpot Studio | Canvas, text+fonts, shapes, stickers, image upload, bg removal, layers panel, undo/redo, zoom/pan, export, autosave |
| Integration interfaces | Provider/adapter pattern with bundled defaults | Consumers plug in their own backend; defaults work out of the box |
| Package name | `@fastlab-ai/design-editor` (note: npm scopes cannot contain `.`) | Hyphenated form preserves `fastlab.ai` brand readability |
| License | MIT | Maximum OSS adoption; compatible with vendored LayerHub MIT code |
| Build tool | `tsup` (esbuild) | Fast, zero-config dual ESM/CJS, TS declarations, sourcemaps |
| Monorepo tool | pnpm workspaces | Better peer-dep handling than npm workspaces; faster installs |
| Versioning | `changesets` | Industry-standard semver + changelog for monorepo packages |

## 4. Workspace & Repo Layout

```
adspot_project/
├── package.json                  ← root, devDeps + workspace config only
├── pnpm-workspace.yaml           ← packages: ['.', 'packages/*', 'apps/*', 'examples/*']
├── tsconfig.base.json            ← shared compiler options
├── src/                          ← AdSpot app (existing)
├── api/                          ← NestJS backend (existing)
├── prisma/                       ← (existing)
├── packages/
│   └── design-editor/            ← the publishable package
│       ├── package.json          ← @fastlab-ai/design-editor
│       ├── tsup.config.ts
│       ├── tsconfig.json
│       ├── README.md
│       ├── LICENSE               ← MIT + LayerHub attribution
│       ├── CHANGELOG.md
│       └── src/
│           ├── index.ts          ← public entrypoint
│           ├── engine/           ← vendored LayerHub fork
│           ├── components/       ← <DesignEditor>, panels, toolbars
│           ├── hooks/            ← useEditor, useActiveObject, …
│           ├── providers/        ← provider interfaces + defaults
│           ├── types/            ← public TS types
│           ├── theme/            ← CSS variables + reset
│           └── utils/
├── apps/
│   ├── docs/                     ← Astro Starlight docs site
│   └── playground/               ← Vite + React live playground
└── examples/
    ├── nextjs-app-router/
    ├── nextjs-pages-router/
    ├── vite-react/
    └── custom-providers/
```

**Constraint:** anything under `packages/design-editor/src/` must be self-contained — no `../../api/...` or `../../src/...` imports. The package is the publishable unit; everything else is a consumer.

## 5. Package Internals — Layered Architecture

Layers with one-way dependencies. Lower layers cannot import from higher.

```
public API (index.ts)
        ▲
┌───────┴──────────┐
│  components/     │  layer 4 — <DesignEditor>, <Toolbar>, <Canvas>, panels
└───────▲──────────┘
        │
┌───────┴──────────┐
│  hooks/          │  layer 3 — useEditor, useActiveObject, useZoom, useHistory
└───────▲──────────┘
        │
┌───────┴──────────┐
│  providers/      │  layer 2 — MediaProvider, FontProvider, BgRemovalProvider, PersistenceProvider
└───────▲──────────┘
        │
┌───────┴──────────┐
│  engine/         │  layer 1 — scene graph, renderer, commands, serialization
└───────▲──────────┘
        │
┌───────┴──────────┐
│  types/, utils/, theme/  layer 0 — leaf modules, no internal imports
└──────────────────────────┘
```

Each layer is independently testable: engine tests don't need React; hook tests don't need DOM; component tests use mocked providers.

### 5.1 Sub-folder breakdown

- **`engine/`** — `scene/` (scene graph types), `commands/` (add, remove, transform, history), `renderer/` (Fabric.js binding), `serialization/` (toJSON/fromJSON), `react/` (EditorContext + low-level hooks), `index.ts`
- **`providers/`** — `media.ts`, `fonts.ts`, `backgroundRemoval.ts`, `persistence.ts`, `defaults/`, `EditorProviders.tsx`
- **`hooks/`** — `useEditor.ts`, `useActiveObject.ts`, `useHistory.ts`, `useZoom.ts`, `useExport.ts`, `useAutoSave.ts`, `useMediaProvider.ts`, `useFontProvider.ts`
- **`components/`** — `DesignEditor.tsx`, `Canvas.tsx`, `Toolbar.tsx`, `IconRail.tsx`, `LayerPanel.tsx`, `ObjectPropertiesBar.tsx`, `panels/` (LibraryPanel, ShapesPanel, StickersPanel, TextPanel, UploadPanel, FontsPanel), `primitives/` (headless Button, Slider, Popover, Input, Tooltip)

### 5.2 Public API surface (`index.ts`)

```ts
// All-in-one
export { DesignEditor } from './components/DesignEditor'
export type { DesignEditorProps } from './components/DesignEditor'

// Composable pieces
export { Canvas, Toolbar, IconRail, LayerPanel, ObjectPropertiesBar } from './components'
export * from './components/panels'

// Hooks
export {
  useEditor, useActiveObject, useHistory, useZoom, useExport, useAutoSave,
  useMediaProvider, useFontProvider,
} from './hooks'

// Provider interfaces + default factories
export type {
  MediaProvider, MediaItem, MediaListResult,
  FontProvider, FontDescriptor,
  BackgroundRemovalProvider,
  PersistenceProvider,
} from './providers'
export {
  createLocalStoragePersistence,
  createGoogleFontsProvider,
  createImglyBackgroundRemoval,
  createNullMediaProvider,
} from './providers/defaults'

// Scene types
export type { Scene, Layer, TextLayer, ImageLayer, ShapeLayer } from './engine'
```

The `engine/` internals (commands, renderer) stay private in v1 — accessible only via hooks. Reserves freedom to refactor without breaking consumers.

## 6. Provider/Adapter Interfaces

Four interfaces define how consumers plug the editor into their backend. All async, all cancellable via `AbortSignal`.

### 6.1 MediaProvider

```ts
export interface MediaItem {
  id: string
  url: string              // full-size URL (https or data:)
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
  list(opts: { cursor?: string; search?: string; signal?: AbortSignal }): Promise<MediaListResult>
  upload(
    file: File,
    opts?: { signal?: AbortSignal; onProgress?: (pct: number) => void },
  ): Promise<MediaItem>
}
```

### 6.2 FontProvider

```ts
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

### 6.3 BackgroundRemovalProvider

```ts
export interface BackgroundRemovalProvider {
  remove(
    input: string | Blob,
    opts?: { signal?: AbortSignal; onProgress?: (pct: number) => void },
  ): Promise<Blob>
}
```

### 6.4 PersistenceProvider

```ts
import type { Scene } from '../engine'

export interface PersistenceProvider {
  save(sceneKey: string, scene: Scene): Promise<void>
  load(sceneKey: string): Promise<Scene | null>
  list?(): Promise<{ sceneKey: string; updatedAt: number; thumbnailUrl?: string }[]>
}
```

### 6.5 Bundled defaults

| Factory | Behavior | Used when |
|---|---|---|
| `createLocalStoragePersistence({ prefix? })` | Stores scenes in `localStorage[prefix + sceneKey]` | No `persistenceProvider` prop |
| `createImglyBackgroundRemoval()` | Wraps `@imgly/background-removal` (optional peer dep, lazy-imported) | No `backgroundRemovalProvider` prop |
| `createGoogleFontsProvider({ apiKey? })` | Fetches Google Fonts catalog + injects `<link>` tags | No `fontProvider` prop |
| `createNullMediaProvider()` | Returns empty list; throws on upload | No `mediaProvider` prop |

### 6.6 Consumer wiring example

```tsx
<DesignEditor
  initialScene={scene}
  mediaProvider={adspotMediaProvider}
  fontProvider={createGoogleFontsProvider()}
  backgroundRemovalProvider={createImglyBackgroundRemoval()}
  persistenceProvider={adspotPersistenceProvider}
  onExport={(blob, format) => uploadToAdSpotLibrary(blob, format)}
/>
```

### 6.7 Provider design choices

1. **`@imgly/background-removal` is a peer dependency**, not a hard dep — saves ~30MB for users who don't need it. The default factory lazy-imports it; throws a clear error if missing.
2. **No fixed media schema beyond `MediaItem`.** Tags, folders, ACL out of v1. Consumers extend via generic if needed (`MediaProvider<TExtras>`).

## 7. Engine Fork Strategy

### 7.1 License compliance

`@layerhub-io` is MIT-licensed. Vendoring is legal provided we:
- Preserve original `LICENSE` file inside `packages/design-editor/src/engine/`
- Add a NOTICE section in our root `LICENSE` crediting LayerHub
- Keep their copyright headers on files we copy verbatim

### 7.2 What gets forked

Four packages collapse into a single internal module:

- `@layerhub-io/core` — scene graph, command pattern, history, serialization
- `@layerhub-io/objects` — layer types
- `@layerhub-io/types` — TypeScript types
- `@layerhub-io/react` — React provider + hooks

All four become `packages/design-editor/src/engine/`. No more cross-package imports, no version skew.

### 7.3 Fork process (one-time)

1. Clone LayerHub repos at currently-used versions (`@0.3.3`).
2. Copy source into `engine/` flattened — `engine/scene/`, `engine/commands/`, `engine/react/`.
3. Rewrite all internal cross-package imports.
4. Strip dead code: video objects, animation timeline, unfinished SSR paths.
5. Move Fabric.js from a LayerHub transitive dep to a direct dep in our package.json.
6. Run AdSpot Studio against the vendored engine; fix import paths until parity.
7. Add `engine/README.md` documenting the fork point and our changes.

### 7.4 Engine changes on top of fork (v1)

| Change | Why |
|---|---|
| Strict TypeScript (`strict: true`, no `any` leaks) | Better DX; LayerHub had loose types |
| Add `AbortSignal` support to async commands | Cancellable bg-removal, uploads, exports |
| Single `EditorContext` (collapse LayerHub's multi-context tree) | Simpler React tree, fewer providers |
| Remove server-side rendering paths LayerHub never finished | Dead code |
| Add unit tests for scene/commands/history (~80% coverage) | LayerHub had ~zero coverage |

### 7.5 Explicit non-changes

- **Scene JSON shape stays identical to LayerHub's** — scenes saved by current AdSpot Studio load in the new package with zero migration. Critical for cutover safety.
- **Renderer's Fabric.js binding** — works today, no reason to touch.

### 7.6 Fabric.js policy

Fabric.js stays as a normal runtime dependency, not vendored. Actively maintained (v6+), MIT-licensed, well-typed. Forking it would be a multi-month project for no benefit.

### 7.7 Risk

Forking means LayerHub upstream improvements no longer flow in. Accepted because LayerHub's repo has had limited activity for ~18 months; the trade is theoretical risk for concrete control.

## 8. Build, Bundling, and Publishing

### 8.1 Outputs

```
packages/design-editor/dist/
├── index.js          ← ESM entry
├── index.cjs         ← CJS entry
├── index.d.ts        ← TypeScript declarations
├── theme.css         ← CSS variables + reset
├── engine.{js,cjs,d.ts}      ← '@fastlab-ai/design-editor/engine'
└── providers.{js,cjs,d.ts}   ← '@fastlab-ai/design-editor/providers'
```

### 8.2 `package.json` shape

```jsonc
{
  "name": "@fastlab-ai/design-editor",
  "version": "0.0.0",
  "license": "MIT",
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
    "./engine":    { /* same shape */ },
    "./providers": { /* same shape */ },
    "./theme.css": "./dist/theme.css"
  },
  "files": ["dist", "README.md", "LICENSE", "CHANGELOG.md"],
  "peerDependencies": {
    "react":     ">=18",
    "react-dom": ">=18"
  },
  "peerDependenciesMeta": {
    "@imgly/background-removal": { "optional": true }
  },
  "dependencies": {
    "fabric": "^6.x",
    "nanoid": "^5.x"
  }
}
```

### 8.3 Bundle size

- Target: JS entry **≤ 150 KB gzipped** (excluding Fabric.js peer-ish bulk).
- Fabric.js itself adds ~250 KB; acceptable for a canvas editor.
- Enforced by `size-limit` in CI. PRs that grow bundle >5% must justify in a comment.

### 8.4 SSR markers

`tsup` doesn't preserve `'use client'` directives. A post-build step prepends `'use client';\n` to every component file in `dist/`. Engine and provider files do **not** get the directive — they remain server-safe (for type imports and scene manipulation in server actions).

### 8.5 Publishing flow

```bash
pnpm --filter @fastlab-ai/design-editor build
pnpm --filter @fastlab-ai/design-editor test
pnpm --filter @fastlab-ai/design-editor size
pnpm --filter @fastlab-ai/design-editor publish --access public
```

Wrapped in a `release` script that also:

1. Verifies `git status` clean and on `main`
2. Bumps version via `changesets`
3. Generates CHANGELOG entry from changeset markdown files
4. Creates git tag + GitHub release

### 8.6 During development (before first publish)

AdSpot consumes the package via pnpm workspace symlink. No publishing needed. Local edits show up in AdSpot instantly via Vite's HMR.

## 9. Testing Strategy

| Layer | Tool | What we test | Target |
|---|---|---|---|
| Unit | Vitest | engine commands, scene serialization, history, provider defaults | ~80% of `engine/` + `providers/` |
| Component | Vitest + @testing-library/react | hooks, panel state, prop wiring | All public hooks; key panels |
| Integration | Playwright (component mode) | Real `<DesignEditor>`: load scene, drag/drop, type text, export | ~10 golden-path flows |
| Visual regression | Playwright snapshots | Toolbar, IconRail, LayerPanel, exported PNG of canned scenes | Lock visual API |
| Bundle size | size-limit | dist/index.js ≤ 150KB gzipped | CI gate |

LayerHub had no tests. We don't retrofit coverage everywhere upfront — but every bug fix lands with a regression test.

### 9.1 CI (GitHub Actions, every PR + main)

- typecheck (`tsc --noEmit` for both root app and package)
- lint (`eslint .`)
- unit + component tests
- build (`pnpm --filter ... build`)
- size-limit check
- Playwright integration suite (chromium, webkit, firefox)
- changeset check — PRs touching `packages/design-editor/src/**` must include a changeset markdown file or be labeled `no-changelog`

## 10. Documentation

### 10.1 Docs site (`apps/docs/`)

Astro Starlight (lightweight, MDX-native). Pages:

- **Getting started** — install, `<DesignEditor />` quickstart
- **Next.js guide** — App Router + Pages Router recipes
- **Providers** — one page per interface, with examples
- **API reference** — auto-generated from TSDoc via `typedoc-plugin-markdown`
- **Examples** — runnable demos linked from `examples/`
- **Migrating from LayerHub** — short page

### 10.2 Live playground (`apps/playground/`)

Vite + React. Deployed to GitHub Pages on every push to `main`. Lets users try without `npm install`. Doubles as manual QA surface.

### 10.3 Example apps (`examples/`)

1. `nextjs-app-router/` — minimal App Router integration
2. `nextjs-pages-router/` — Pages Router with `dynamic()`
3. `vite-react/` — vanilla Vite + React
4. `custom-providers/` — wiring an S3 media provider + custom font catalog

CI builds each example to catch breaking changes in our public API.

## 11. AdSpot Cutover & Phased Roadmap

### 11.1 Cutover principle

AdSpot's Studio works at every commit. No "Studio broken for a week" period. Extraction happens on `feature/design-editor-package` branched off `feature/creative-studio`. Each phase merges to `feature/creative-studio` only when AdSpot Studio runs identically to before. `main` is never touched until the package is ready end-to-end.

### 11.2 Phases

**Phase 0 — Workspace foundation (1–2 days)**
- Add `pnpm-workspace.yaml`, convert root to pnpm
- Scaffold `packages/design-editor/` with empty `index.ts`, tsup config, package.json
- Set up CI workflow stubs (typecheck, lint, build)
- **Exit:** `pnpm install` + `pnpm dev` runs AdSpot exactly as before; empty package builds

**Phase 1 — Vendor the engine (3–5 days)**
- Fork `@layerhub-io/{core,react,objects,types}` into `packages/design-editor/src/engine/`
- Rewrite internal imports, preserve LICENSE files, add attribution
- Add Vitest, write tests for scene serialization + history (~20 tests)
- AdSpot Studio still imports from `@layerhub-io/*` — engine fork is dormant code
- **Exit:** engine builds, tests pass, AdSpot unaffected

**Phase 2 — Decouple AdSpot from Ant Design inside Studio (5–7 days)**
- Build `primitives/` (Button, Slider, Popover, Input, Tooltip) on Radix + CSS vars
- Define `theme.css` tokens: `--de-color-*`, `--de-radius-*`, `--de-shadow-*`
- Inside `src/pages/advertiser/studio/`, replace Ant components with primitives file by file (Toolbar → ObjectPropertiesBar → panels → IconRail → LayerPanel)
- AdSpot maps its existing theme into the new CSS vars — visual parity preserved
- **Exit:** no `antd` imports anywhere under `src/pages/advertiser/studio/`; visual regression check passes

**Phase 3 — Define provider interfaces, extract AdSpot integrations (3–4 days)**
- Write provider interfaces in `packages/design-editor/src/providers/`
- Build default implementations (`createLocalStoragePersistence`, `createGoogleFontsProvider`, `createImglyBackgroundRemoval`, `createNullMediaProvider`)
- In AdSpot's app code, extract R2 media calls + DB autosave into adapter implementations (e.g. `src/lib/studio/adspotMediaProvider.ts`)
- AdSpot Studio still imports from `src/pages/advertiser/studio/` — but providers exist
- **Exit:** AdSpot Studio uses provider pattern internally; localStorage swap-out works

**Phase 4 — Migrate components into the package (5–7 days)**
- Move `Toolbar.tsx`, `IconRail.tsx`, `CanvasArea.tsx`, `LayerPanel.tsx`, `ObjectPropertiesBar.tsx`, panels, hooks from AdSpot studio code into `packages/design-editor/src/components/` + `hooks/`
- Wire up public `<DesignEditor>` composite
- Add `'use client'` post-build step
- AdSpot's `DesignEditor.tsx` becomes a ~30-line shim that imports `<DesignEditor>` from the package and passes AdSpot providers
- **Exit:** old `src/pages/advertiser/studio/DesignEditorInner.tsx` and sub-files deleted; AdSpot Studio runs through the package; visual + functional parity verified

**Phase 5 — Polish for OSS release (3–5 days)**
- TypeScript strict pass — remove all `any`, add TSDoc on public API
- Write `apps/docs/` (getting-started, providers, Next.js guides)
- Build `apps/playground/`
- Write `examples/nextjs-app-router/`, `examples/vite-react/`, `examples/custom-providers/`
- README with badges, install snippet, screenshots, link to docs
- Set up `changesets`
- **Exit:** docs site deploys; playground deploys; all examples build clean

**Phase 6 — First publish (1 day of work; do scope creation in parallel with Phase 5)**
- Create `@fastlab-ai/` npm scope — start this **during Phase 5** since npm org setup (email verification, organization billing if needed) can take a day or two of calendar time
- Cut a changeset, run release script
- `@fastlab-ai/design-editor@0.1.0` ships
- Tag GitHub release; write announcement
- **Exit:** `npm install @fastlab-ai/design-editor` works from a fresh project

### 11.3 Estimate

**21–31 focused workdays.** Calendar time will be longer since AdSpot work continues in parallel; some phases interleave naturally.

### 11.4 Ongoing publish cadence (after 0.1.0)

Every PR with a changeset that lands on `main` can produce a release. The `release` script ensures clean state, runs all tests, bumps version, publishes, tags — one command. No dedicated "publish day."

## 12. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Phase 2 (Ant Design removal) blows up in scope (~3,000 LOC of UI) | Medium | Replace component-by-component, not all at once. Visual regression snapshots gate each merge. Have an escape: if a panel proves too coupled, ship Ant as peer dep for v0.1 and replace in v0.2 |
| Vendored LayerHub fork introduces regressions vs. current behavior | Medium | Keep scene JSON shape identical. Run AdSpot Studio against the fork in Phase 1 — must reach functional parity before Phase 2 starts |
| pnpm migration breaks existing devs / CI / Vercel | Low | Pin pnpm version via `packageManager` field; document migration steps; verify Vercel build before merging Phase 0 |
| Bundle size balloons past 150 KB target | Medium | `size-limit` gate in CI. Tree-shake aggressively. Lazy-load panels in v1.1 if needed |
| Next.js App Router quirks discovered late | Medium | Build `examples/nextjs-app-router/` early in Phase 5 (not last); CI runs `next build` on it |
| `@imgly/background-removal` peer-dep UX is confusing | Low | Clear error message in the default factory: "@imgly/background-removal not installed — install it or pass a custom provider" |
| OSS adoption fails — only AdSpot uses it | Acceptable | The migration still pays off internally: cleaner architecture, testable engine, decoupled UI. OSS is bonus |

## 13. Open Questions

None at spec-approval time. The two flagged earlier (Phase 2 cost, early-preview publish) resolved to:
- Phase 2 stays as planned (Ant removal required for credible OSS launch)
- First publish at end of Phase 6 (polished launch over rushed preview)

## 14. Out of Scope (Explicit)

- Video editor (stays in AdSpot)
- Realtime collaboration
- Plugin/extension system
- Server-side scene rendering
- Mobile/touch polish
- Animation/timeline
- AI features (image gen, smart fill, auto-layout)
- Templates marketplace
- I18n inside the editor UI (the package ships English-only v1; consumers can override strings via a `translations` prop in v1.1 if requested)

## 15. Success Criteria

The project is successful when **all** of the following are true:

1. `npm install @fastlab-ai/design-editor` works from a fresh React or Next.js project.
2. AdSpot Studio's `DesignEditorInner.tsx` no longer exists in the AdSpot app code — it's an import from the package.
3. AdSpot Studio behavior is unchanged from a user's perspective (parity).
4. The package builds clean, passes tests, and is under 150 KB gzipped.
5. Docs site at a public URL with getting-started + 4 example apps that build.
6. A single `release` command publishes a new version end-to-end.
7. The next bug fix in Studio can be made in the package, published, and consumed by AdSpot with a version bump.
