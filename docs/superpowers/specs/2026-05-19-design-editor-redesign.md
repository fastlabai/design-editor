# Design Editor Redesign Spec
**Date:** 2026-05-19  
**Status:** Approved  
**Scope:** Split DesignEditor.tsx, premium Canva/Figma-style UI, layer panel, shapes, stickers, custom canvas size

---

## 1. Goals

1. Split the monolithic `DesignEditor.tsx` (755 lines) into focused, maintainable component files
2. Redesign the UI with a Canva/Figma-style icon-rail + popup-panel layout
3. Add: Shapes panel, Stickers panel, Layer panel, custom canvas size input
4. Enhance Object Properties Bar with flip, bold/italic, stroke controls
5. Ensure remove-background feature continues to work

---

## 2. Layout

Four zones:

```
┌──────────────────────────────────────────────────────────────┐
│  TOOLBAR: ← | Undo Redo | Zoom | ──── | Size ▾ | ⊞ | Save   │
├──┬───────────────────────────────────────────────┬───────────┤
│  │                                               │           │
│I │          CANVAS AREA (dark #111827)           │  LAYERS   │
│C │                                               │ (220px,   │
│O │   [slide-out panel overlays canvas edge]      │ toggle)   │
│N │                                               │           │
│  │     [floating ObjectPropertiesBar pill]       │           │
│R │                                               │           │
│A │                                               │           │
│I │                                               │           │
│L │                                               │           │
└──┴───────────────────────────────────────────────┴───────────┘
56px                                                collapsible
```

- **Toolbar** — 54px, white background, light border
- **Icon Rail** — 56px wide, `#18181b`, icons stacked vertically with labels below
- **Slide-out panels** — 240px, `#18181b`, slide out *over* the canvas (canvas does not shrink)
- **Canvas area** — fills remaining space, `#111827`
- **Layers panel** — 220px, `#18181b`, slides in from right, toggled via toolbar `⊞` button
- **Object Properties Bar** — floating pill pinned 20px from canvas bottom, only visible when object selected

---

## 3. File Structure

All under `src/pages/advertiser/studio/`:

```
DesignEditor.tsx                     ← entry point: App + Provider wrapper (unchanged)
DesignEditorInner.tsx                ← main layout orchestrator
hooks/
  useStudioExport.ts                 ← existing, unchanged
  useLayerPanel.ts                   ← subscribes to Fabric events, returns reactive layer list
  useCanvasSize.ts                   ← canvas size state + custom W×H logic
components/
  Toolbar.tsx                        ← top bar
  IconRail.tsx                       ← 56px left icon column, active state, panel toggle
  CanvasArea.tsx                     ← CanvasDropZone + CanvasContextBridge + FrozenCanvas
  ObjectPropertiesBar.tsx            ← floating bottom pill with type-specific controls
  LayerPanel.tsx                     ← collapsible right sidebar
  panels/
    LibraryPanel.tsx                 ← wraps AdspotMediaPanel
    ShapesPanel.tsx                  ← 12 SVG shape tiles
    StickersPanel.tsx                ← 60-emoji grid in 6 categories
    TextPanel.tsx                    ← heading/subheading/body presets
    UploadPanel.tsx                  ← file upload drop zone
```

Shared primitives (`TBtn`, `PBtn`, `PDivider`, `HDivider`, `FrozenCanvas`, `CanvasContextBridge`) move into `components/` as needed — no logic changes.

---

## 4. Icon Rail & Panels

Five icons in the rail (top to bottom):

| Icon | Label | Panel |
|------|-------|-------|
| PictureOutlined | Library | LibraryPanel — AdspotMediaPanel (images) |
| AppstoreOutlined | Shapes | ShapesPanel |
| SmileOutlined | Stickers | StickersPanel |
| FontSizeOutlined | Text | TextPanel |
| UploadOutlined | Upload | UploadPanel |

Clicking an active icon closes the panel (toggle). Panel slides in with CSS `transform: translateX` transition (200ms ease). Panel sits at `position: absolute, left: 56px, top: 0, bottom: 0, z-index: 20` — overlays the canvas, does not push it.

---

## 5. Shapes Panel

12 shapes added as `StaticPath` objects with SVG path data:

Rectangle, Rounded Rectangle, Circle, Triangle, Star (5-point), Heart, Arrow Right, Arrow Left, Pentagon, Hexagon, Diamond, Speech Bubble.

- Rendered as small preview tiles (48×48) showing the shape filled with `#7c3aed`
- Clicking adds shape centered on frame at 200×200px, fill `#7c3aed`, opacity 1
- Uses `editor.objects.add({ type: 'StaticPath', path: '<svg-d-string>', ... })`

---

## 6. Stickers Panel

60 emoji characters in 6 categories (10 each):

- Faces: 😀 😂 😍 🥰 😎 🤩 😢 😡 🤔 😴
- Nature: 🌸 🌿 🌊 🔥 ⭐ 🌙 ☀️ 🌈 🍃 🌺
- Food: 🍕 🍔 🍣 🍩 🍦 🎂 🍓 🥑 🧁 ☕
- Travel: ✈️ 🚀 🏖️ 🗺️ 🏔️ 🚗 🎡 🏛️ ⛵ 🌍
- Objects: 💎 🎵 🎨 📸 💻 🎮 📱 🔑 💡 🎁
- Symbols: ❤️ 💯 ✨ 🔥 💥 🎯 👑 🏆 ⚡ 🦋

Added as `StaticText` with `fontSize: 64`, `text: '<emoji>'`. This leverages native OS emoji rendering on the canvas — no external assets.

---

## 7. Layer Panel

**Hook: `useLayerPanel`**
- Attaches Fabric event listeners on `editor.canvas.canvas` after editor is ready: `object:added`, `object:removed`, `object:modified`, `selection:created`, `selection:cleared`
- Returns: `layers: LayerItem[]`, `activeId: string | null`
- `LayerItem`: `{ id: string, type: string, name: string, visible: boolean, fabricObj: fabric.Object }`
- Layers returned in reverse Z-order (topmost first, matching Figma convention)

**UI:**
- Header: "Layers" label + close `×` button
- Each row (32px): type icon | auto-name | eye toggle | delete button (on hover)
- Selected layer highlighted with `rgba(124,58,237,0.2)` background
- Clicking a row: `editor.canvas.canvas.setActiveObject(fabricObj)` + `requestRenderAll()`
- Eye toggle: sets `fabricObj.visible = !visible` + `requestRenderAll()`
- No drag-to-reorder — bring forward/back in the properties bar handles Z-order

**Auto-naming:** `${humanType} ${count}` e.g. "Image 1", "Text 2", "Shape 3". `Frame` object is shown as "Background" and not deletable.

---

## 8. Custom Canvas Size

**Hook: `useCanvasSize`**
- State: `canvasSize: string` (e.g. `'1920x1080'`), `customW: number`, `customH: number`
- `handleSizeChange(value)`: if value is `'custom'` open popover; else resize frame immediately
- `applyCustomSize()`: validates W/H (min 100, max 8000), calls `editor.frame.resize()`

**UI:**
- Existing `AD_SIZES` array gains `{ label: 'Custom…', value: 'custom' }` at the bottom
- Selecting "Custom…" opens an Ant Design `Popover` below the Select with two `InputNumber` fields (W, H) and an "Apply" button
- After apply, dropdown label shows `${w}×${h}`

---

## 9. Object Properties Bar — Enhanced

Three variants based on `activeObj.type`:

**Image (`StaticImage`, `BackgroundImage`):**
Opacity slider | Flip H | Flip V | Remove BG | Bring Forward | Send Back | Duplicate | Delete

**Text (`StaticText`, `DynamicText`):**
Opacity slider | Font size input | Fill color picker | Bold toggle | Italic toggle | Align (L/C/R) | Bring Forward | Send Back | Duplicate | Delete

**Shape (`StaticPath`) + fallback:**
Opacity slider | Fill color picker | Stroke color picker | Stroke width input | Bring Forward | Send Back | Duplicate | Delete

Remove BG implementation unchanged — uses `@imgly/background-removal` with model `isnet_quint8`, reads result as DataURL and updates `src`.

---

## 10. What Does NOT Change

- `FrozenCanvas` memo logic — intentional one-time mount, not touched
- `CanvasContextBridge` ref capture pattern — not touched
- `useStudioExport` hook — not touched
- All `editor.objects.add()` / `editor.frame.resize()` / `editor.history` calls — preserved exactly
- Drag-and-drop data transfer format (`text/x-adspot-url`, `text/x-adspot-type`) — unchanged
- `AdspotMediaPanel` component — unchanged
- Route (`/advertiser/studio`) and navigation — unchanged

---

## 11. No-Scope Items

- Drag-to-reorder layers (Fabric Z-index manipulation is error-prone)
- Animated GIFs (no API, deferred)
- Table insertion (deferred)
- Font family picker (deferred)
- Multi-object selection grouping UI (Fabric handles natively)
