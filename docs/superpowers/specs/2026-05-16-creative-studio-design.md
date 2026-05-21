# Creative Studio — Design Spec
**Date:** 2026-05-16  
**Status:** Approved  
**Replaces:** Canva integration (CanvaTemplates + CanvaEditor + canvaApi)

---

## Overview

Replace the Canva OAuth integration with a fully self-contained Creative Studio built on open-source, zero-cost libraries. Advertisers get a single "Creative Studio" entry point that branches into a Design Editor (image/graphic ads) and a Video Editor (MP4 timeline ads). Finished creations are saved silently to the Adspot Media Library for use in campaigns.

---

## Tech Stack

| Editor | Library | License | Notes |
|--------|---------|---------|-------|
| Design | `@layerhub-io/react-design-editor` | MIT | Fabric.js-based Canva clone |
| Video | `@twick/studio` + `@twick/canvas` + `@twick/timeline` + `@twick/media-utils` | Open-source | React timeline editor, MP4 export |
| AI tool | `@imgly/background-removal` + `onnxruntime-web` | Free | Runs entirely in-browser, design editor only |

---

## Routing

```
/advertiser/studio              → CreativeStudio (landing, normal layout)
/advertiser/studio/design       → DesignEditor  (full-page, no sidebar/header)
/advertiser/studio/video        → VideoEditor   (full-page, no sidebar/header)
```

The layout wrapper in `App.tsx` suppresses sidebar and header when the path starts with `/advertiser/studio/design` or `/advertiser/studio/video`. The landing page at `/advertiser/studio` retains the normal dashboard layout.

Sidebar nav: "Canva" item replaced with "Creative Studio" → `/advertiser/studio`.

---

## File Structure

```
src/pages/advertiser/studio/
├── CreativeStudio.tsx        ← landing/picker page
├── DesignEditor.tsx          ← react-design-editor wrapper
├── VideoEditor.tsx           ← @twick/studio wrapper
└── hooks/
    └── useStudioExport.ts    ← shared export-to-media-library hook

src/components/studio/
└── AdspotMediaPanel.tsx      ← shared media library panel (used by both editors)
```

---

## Section 1: Creative Studio Landing (`CreativeStudio.tsx`)

- Two large side-by-side cards: **Design Ad** and **Video Ad**
- Design Ad card: "Images, graphics, multi-layer designs" → navigates to `/advertiser/studio/design`
- Video Ad card: "Timeline editing, multi-track, MP4 export" → navigates to `/advertiser/studio/video`
- Each card shows a brief capability list and a CTA button
- Styling: existing Adspot gradient + Ant Design card style
- No SDK initialization on this page — zero cost until user picks an editor
- **Recent creations strip** at the bottom: fetches last 4 items from `mediaSlice` (`fetchMedia`), shows thumbnails with image/video type tag

---

## Section 2: Design Editor (`DesignEditor.tsx`)

### Layout
Full viewport. Slim custom top bar (outside the editor) contains:
- Adspot logo mark (left)
- Back button → navigates to `/advertiser/studio`, with `confirm()` if canvas is dirty
- "Save to Library" button (right) → triggers export

### Adspot Media Library Panel
- Replaces the default "Images" panel tab in react-design-editor via the `resources` prop + custom panel API
- Renders `AdspotMediaPanel` component (image-type filter: PNG, JPG, SVG)
- Fetches from Redux `fetchApprovedMedia`
- Click on asset → `editor.addImageToCanvas(url)`
- Top of panel: local upload dragger → calls `mediaAPI.upload()` → refreshes panel → adds image to canvas

### Local Device Upload
- Built-in "Upload" panel tab kept for additional drag-drop uploads
- On upload: adds image to canvas AND calls `mediaAPI.upload()` in the background

### Background Removal (AI)
- `@imgly/background-removal` loaded lazily on first use
- Appears as a toolbar button when an image block is selected
- Runs fully in-browser via ONNX Runtime, no server call
- Replaces the selected image block with the processed result

### Export
- Format: PNG always (matches existing media library convention for design ads)
- `editor.exportToBlob('png')` → `FormData` → `POST /media/upload` → success toast "Saved to Media Library"

---

## Section 3: Video Editor (`VideoEditor.tsx`)

### Layout
Same full-viewport pattern: slim top bar with back button + "Save to Library" CTA, @twick/studio fills remaining height.

### Adspot Media Library Panel
- Registered as a custom asset source named `"adspot-library"` via @twick/studio's `assetSources` prop
- Fetches from `mediaAPI.getApproved()` — returns both image and video assets
- Renders inside the studio's native asset drawer as a browseable grid
- On asset selection: inserted onto the timeline at the current playhead position
  - Images → still frame clip
  - Videos → video clip

### Local Device Upload
- Registered as a second asset source `"local-upload"` using `@twick/media-utils` file picker
- On select: uploads to `POST /media/upload`, inserts result onto timeline, refreshes library panel

### MP4 Export (browser path)
- Uses WebCodecs API — supported in Chrome/Edge
- Detection: `'VideoEncoder' in window`
- `studio.export()` → `Blob` → `FormData` → `POST /media/upload` → success toast

### MP4 Export (Lambda fallback — Firefox/Safari)
- When WebCodecs is unavailable, falls back to @twick/studio's serverless Lambda render path
- Requires a thin backend proxy endpoint: `POST /media/render`
  - Accepts @twick scene JSON
  - Triggers the Lambda render job
  - Polls until complete (timeout: 5 minutes)
  - On completion: downloads the rendered MP4, uploads to `/media/upload`, returns media record
- No video processing on the Adspot server — it is a proxy only

---

## Section 4: Shared Components & Hook

### `AdspotMediaPanel.tsx`
Shared between both editors. Props:
```ts
interface AdspotMediaPanelProps {
  filter?: 'image' | 'video' | 'all'
  onSelect: (url: string, type: 'image' | 'video') => void
}
```
- Scrollable grid of thumbnails from `mediaSlice`
- Inline search/filter bar
- Upload dragger at top (calls `mediaAPI.upload()`, dispatches `fetchMedia` to refresh)
- Empty state with upload prompt

### `useStudioExport.ts`
Shared export hook used by both editors:
```ts
function useStudioExport(): {
  exportDesign: (blob: Blob, mimeType: string) => Promise<void>
  exporting: boolean
}
```
- Wraps `mediaAPI.upload()` with FormData construction
- Sets `exporting` state for button loading indicator
- Shows success toast on completion, error toast on failure (no navigation away from editor)

---

## Section 5: Canva Removal

### Files deleted
- `src/pages/advertiser/CanvaTemplates.tsx`
- `src/pages/advertiser/CanvaEditor.tsx`
- `src/services/api/canvaApi.ts`

### Code changes
- `App.tsx`: remove `CanvaTemplates` and `CanvaEditor` lazy imports and routes; add studio routes with layout suppression logic
- Sidebar nav: replace Canva item with "Creative Studio"
- i18n translation files: remove all `canvaTemplates.*` keys

---

## Error Handling

| Scenario | Behaviour |
|----------|-----------|
| Editor fails to initialize | Full-page error state, "Return to Studio" button, error logged |
| Export fails | Toast error "Failed to save — please try again", user stays in editor |
| Media Library panel fails to load | Inline empty state with retry, editor remains usable |
| Lambda render timeout (5 min) | Error toast, user can retry |
| Back with unsaved work | `confirm()` dialog "Leave without saving?" |

---

## New Dependencies

```
@layerhub-io/react-design-editor
@twick/studio
@twick/canvas
@twick/timeline
@twick/media-utils
@imgly/background-removal
onnxruntime-web
```

---

## Out of Scope (This Phase)

- GrapesJS HTML5 animated banner editor (planned next phase)
- Campaign assignment at export time (user assigns from Media Library after saving)
- imgly CE.SDK (replaced entirely by the above stack)
