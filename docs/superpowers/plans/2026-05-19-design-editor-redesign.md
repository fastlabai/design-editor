# Design Editor Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign DesignEditor.tsx into a Canva/Figma-style layout with icon rail, slide-out panels (library, shapes, stickers, text, upload), collapsible layer panel, enhanced object properties bar, and custom canvas size — while keeping all existing canvas logic unchanged.

**Architecture:** DesignEditor.tsx becomes a thin Provider shell. A new DesignEditorInner.tsx orchestrates the four-zone layout (toolbar / icon-rail / canvas / layer-panel). Shapes are added via `editor.objects.add({ type: 'StaticPath', ... })` (confirmed working from layerhub source). Layers use `useObjects()` + `useActiveObject()` hooks from `@layerhub-io/react` (already reactive, no manual Fabric event subscription needed). All other editor operations (add/update/remove/select) use the layerhub Objects controller API.

**Tech Stack:** React 18, @layerhub-io/react 0.3.3, @layerhub-io/core 0.3.3, @imgly/background-removal 1.7.0, Ant Design 5, @ant-design/icons 6, fabric (bundled, no direct import needed)

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/pages/advertiser/studio/components/primitives.tsx` | TBtn, PBtn, HDivider, PDivider shared UI atoms |
| Create | `src/pages/advertiser/studio/components/CanvasArea.tsx` | FrozenCanvas + CanvasContextBridge + CanvasDropZone |
| Create | `src/pages/advertiser/studio/components/panels/LibraryPanel.tsx` | Wraps AdspotMediaPanel |
| Create | `src/pages/advertiser/studio/components/panels/TextPanel.tsx` | Text preset buttons |
| Create | `src/pages/advertiser/studio/components/panels/UploadPanel.tsx` | File upload drop zone |
| Create | `src/pages/advertiser/studio/components/panels/ShapesPanel.tsx` | 12 SVG shape tiles via StaticPath |
| Create | `src/pages/advertiser/studio/components/panels/StickersPanel.tsx` | 60 emoji stickers in 6 categories |
| Create | `src/pages/advertiser/studio/components/IconRail.tsx` | 56px left icon column |
| Create | `src/pages/advertiser/studio/hooks/useLayerPanel.ts` | Reactive layer list from useObjects() |
| Create | `src/pages/advertiser/studio/components/LayerPanel.tsx` | Collapsible right sidebar |
| Create | `src/pages/advertiser/studio/components/ObjectPropertiesBar.tsx` | Floating bottom pill — enhanced |
| Create | `src/pages/advertiser/studio/hooks/useCanvasSize.ts` | Canvas size state + custom W×H |
| Create | `src/pages/advertiser/studio/components/Toolbar.tsx` | Top bar |
| Create | `src/pages/advertiser/studio/DesignEditorInner.tsx` | Layout orchestrator |
| Modify | `src/pages/advertiser/studio/DesignEditor.tsx` | Slim to Provider entry shell only |

---

## Task 1: Shared UI primitives

**Files:**
- Create: `src/pages/advertiser/studio/components/primitives.tsx`

- [ ] **Step 1: Create primitives.tsx**

```tsx
import React, { CSSProperties, useState } from 'react'
import { Tooltip } from 'antd'

export const HDivider = () => (
  <div style={{ width: 1, height: 20, background: '#e5e7eb', flexShrink: 0 }} />
)

export const PDivider = () => (
  <div style={{ width: 1, height: 20, background: '#3f3f46', flexShrink: 0 }} />
)

export function TBtn({
  title, onClick, children, style, active,
}: {
  title: string
  onClick: () => void
  children: React.ReactNode
  style?: CSSProperties
  active?: boolean
}) {
  return (
    <Tooltip title={title} placement="bottom">
      <button
        onClick={onClick}
        style={{
          width: 32, height: 32, border: active ? '1px solid rgba(124,58,237,0.35)' : 'none',
          borderRadius: 8, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
          color: active ? '#7c3aed' : '#6b7280', transition: 'background 0.15s',
          ...style,
        }}
      >
        {children}
      </button>
    </Tooltip>
  )
}

export function PBtn({
  title, onClick, children, danger, style, active,
}: {
  title: string
  onClick: () => void
  children: React.ReactNode
  danger?: boolean
  style?: CSSProperties
  active?: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <Tooltip title={title} placement="top">
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: 32, minWidth: 32, border: 'none', borderRadius: 8, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          padding: '0 8px', fontSize: 13,
          background: danger
            ? hov ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.12)'
            : active
            ? 'rgba(124,58,237,0.22)'
            : hov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
          color: danger ? '#f87171' : active ? '#a78bfa' : '#d4d4d8',
          transition: 'all 0.15s',
          ...style,
        }}
      >
        {children}
      </button>
    </Tooltip>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "primitives" | head -5
```

Expected: no errors mentioning primitives.tsx

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/primitives.tsx
git commit -m "feat: add shared UI primitives for design editor"
```

---

## Task 2: CanvasArea component

**Files:**
- Create: `src/pages/advertiser/studio/components/CanvasArea.tsx`

This extracts `FrozenCanvas`, `CanvasContextBridge`, and `CanvasDropZone` from the original `DesignEditor.tsx`. The only change: `CanvasArea` root div uses `position: absolute; inset: 0` instead of `flex: 1`, so it can fill an absolutely-positioned parent.

- [ ] **Step 1: Create CanvasArea.tsx**

```tsx
import React, { memo, useRef, useEffect, useContext } from 'react'
import { Context, Provider } from '@layerhub-io/react'
import { Editor } from '@layerhub-io/core'

const WORKSPACE_BG = '#111827'

// ─── FrozenCanvas ─────────────────────────────────────────────────────────────
const FrozenCanvas = memo(
  function FrozenCanvas({
    config,
    contextRef,
  }: {
    config: Record<string, any>
    contextRef: React.RefObject<any>
  }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const initTimer = window.setTimeout(() => {
        if (!container || !contextRef.current) return
        const w = container.clientWidth  || 800
        const h = container.clientHeight || 600

        let editor: InstanceType<typeof Editor> | null = null
        try {
          editor = new Editor({
            id: 'layerhub_io_canvas',
            config: { ...config, size: { width: w, height: h } },
            state: contextRef.current,
          })
        } catch (err) {
          console.error('[FrozenCanvas] Editor init failed:', err)
          return
        }

        const resizeObserver = new ResizeObserver(() => {
          if (!container) return
          const nw = container.clientWidth  || 800
          const nh = container.clientHeight || 600
          try { editor?.canvas?.resize?.({ width: nw, height: nh }) } catch { /* ignore */ }
        })
        resizeObserver.observe(container)

        ;(container as any).__layerhubEditor   = editor
        ;(container as any).__layerhubObserver = resizeObserver
      }, 0)

      return () => {
        clearTimeout(initTimer)
        if (!container) return
        const obs = (container as any).__layerhubObserver as ResizeObserver | undefined
        obs?.disconnect()
        const ed = (container as any).__layerhubEditor as InstanceType<typeof Editor> | undefined
        try { ed?.destroy?.() } catch { /* ignore */ }
        delete (container as any).__layerhubEditor
        delete (container as any).__layerhubObserver
      }
    }, []) // intentional — run once on mount only

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
          <canvas id="layerhub_io_canvas" />
        </div>
      </div>
    )
  },
  () => true, // NEVER re-render after mount
)

// ─── CanvasContextBridge ──────────────────────────────────────────────────────
const CANVAS_CONFIG = {
  clipToFrame: true,
  scrollLimit: 2500,
  frameMargin: 80,
  background: WORKSPACE_BG,
  size: { width: 1920, height: 1080 },
  controlsPosition: { rotation: 'TOP' as const },
  guidelines: true,
  shortcuts: true,
}

function CanvasContextBridge() {
  const context = useContext(Context)
  const contextRef = useRef<any>(null)
  if (contextRef.current === null) contextRef.current = context
  return <FrozenCanvas config={CANVAS_CONFIG} contextRef={contextRef} />
}

// ─── CanvasArea ───────────────────────────────────────────────────────────────
export const CanvasArea = memo(function CanvasArea({
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  dragOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: WORKSPACE_BG,
        overflow: 'hidden',
        outline: dragOver ? '3px solid #7c3aed' : 'none',
        outlineOffset: -3,
        transition: 'outline 0.15s',
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <CanvasContextBridge />

      {dragOver && (
        <div style={{
          position: 'absolute', top: 16, left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none', zIndex: 10,
          background: 'rgba(124,58,237,0.88)', backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: 13, fontWeight: 700,
          padding: '8px 20px', borderRadius: 10,
          boxShadow: '0 4px 24px rgba(124,58,237,0.5)',
        }}>
          Drop to add to canvas
        </div>
      )}
    </div>
  )
})
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "CanvasArea" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/CanvasArea.tsx
git commit -m "feat: extract CanvasArea component from DesignEditor"
```

---

## Task 3: Simple panel components

**Files:**
- Create: `src/pages/advertiser/studio/components/panels/LibraryPanel.tsx`
- Create: `src/pages/advertiser/studio/components/panels/TextPanel.tsx`
- Create: `src/pages/advertiser/studio/components/panels/UploadPanel.tsx`

- [ ] **Step 1: Create LibraryPanel.tsx**

```tsx
import React from 'react'
import { AdspotMediaPanel } from '../../../../components/studio/AdspotMediaPanel'

interface Props {
  onAddMedia: (url: string) => void
}

export function LibraryPanel({ onAddMedia }: Props) {
  return (
    <AdspotMediaPanel
      filter="image"
      onSelect={(url) => onAddMedia(url)}
      draggable
      dark
    />
  )
}
```

- [ ] **Step 2: Create TextPanel.tsx**

```tsx
import React, { useState } from 'react'

interface Props {
  onAddText: (text: string, fontSize: number) => void
}

const PRESETS = [
  { label: 'Add Heading',    displaySize: 22, weight: 800, fontSize: 72 },
  { label: 'Add Subheading', displaySize: 15, weight: 600, fontSize: 48 },
  { label: 'Add Body Text',  displaySize: 13, weight: 400, fontSize: 28 },
] as const

export function TextPanel({ onAddText }: Props) {
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ color: '#52525b', fontSize: 11, margin: '4px 0 8px', lineHeight: 1.4 }}>
        Click to add text, then double-click on canvas to edit.
      </p>
      {PRESETS.map(({ label, displaySize, weight, fontSize }) => (
        <TextPresetBtn
          key={label}
          label={label}
          size={displaySize}
          weight={weight}
          onClick={() => onAddText(label.replace('Add ', ''), fontSize)}
        />
      ))}
    </div>
  )
}

function TextPresetBtn({ label, size, weight, onClick }: {
  label: string; size: number; weight: number; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
        background: hov ? '#3f3f46' : '#27272a',
        border: `1px solid ${hov ? '#7c3aed' : '#3f3f46'}`,
        borderRadius: 10, color: '#e4e4e7', fontSize: size, fontWeight: weight,
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 3: Create UploadPanel.tsx**

```tsx
import React, { useRef, useState } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'

interface Props {
  onUploadFile: (file: File) => void
}

export function UploadPanel({ onUploadFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hov, setHov] = useState(false)

  return (
    <div style={{ padding: 14 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) { onUploadFile(f); e.target.value = '' }
        }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: '100%', padding: '28px 16px', cursor: 'pointer', borderRadius: 14,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          background: hov ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.05)',
          border: `2px dashed ${hov ? 'rgba(124,58,237,0.7)' : 'rgba(124,58,237,0.25)'}`,
          transition: 'all 0.2s',
        }}
      >
        <CloudUploadOutlined style={{ fontSize: 32, color: '#7c3aed' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#e4e4e7', fontSize: 13, fontWeight: 600 }}>Click to upload</div>
          <div style={{ color: '#52525b', fontSize: 11, marginTop: 4 }}>PNG · JPG · SVG · MP4 · max 50 MB</div>
        </div>
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -E "LibraryPanel|TextPanel|UploadPanel" | head -5
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/advertiser/studio/components/panels/LibraryPanel.tsx \
        src/pages/advertiser/studio/components/panels/TextPanel.tsx \
        src/pages/advertiser/studio/components/panels/UploadPanel.tsx
git commit -m "feat: add Library, Text, Upload panel components"
```

---

## Task 4: ShapesPanel

**Files:**
- Create: `src/pages/advertiser/studio/components/panels/ShapesPanel.tsx`

StaticPath objects are confirmed supported: layerhub's `object-importer.js` creates `new fabric.StaticPath({ path, fill, ...baseOptions })` where `path` is an SVG path string passed directly to `fabric.Path`. The `editor.objects.add({ type: 'StaticPath', path: '<svg-d>', ... })` call goes through this importer.

- [ ] **Step 1: Create ShapesPanel.tsx**

```tsx
import React from 'react'
import { Tooltip } from 'antd'

interface ShapeDef {
  id: string
  label: string
  d: string
  viewBox: string
}

const SHAPES: ShapeDef[] = [
  {
    id: 'rect',
    label: 'Rectangle',
    viewBox: '0 0 200 140',
    d: 'M 0 0 L 200 0 L 200 140 L 0 140 Z',
  },
  {
    id: 'rounded-rect',
    label: 'Rounded Rect',
    viewBox: '0 0 200 140',
    d: 'M 20 0 L 180 0 Q 200 0 200 20 L 200 120 Q 200 140 180 140 L 20 140 Q 0 140 0 120 L 0 20 Q 0 0 20 0 Z',
  },
  {
    id: 'circle',
    label: 'Circle',
    viewBox: '0 0 200 200',
    d: 'M 100 0 C 155.2 0 200 44.8 200 100 C 200 155.2 155.2 200 100 200 C 44.8 200 0 155.2 0 100 C 0 44.8 44.8 0 100 0 Z',
  },
  {
    id: 'triangle',
    label: 'Triangle',
    viewBox: '0 0 200 180',
    d: 'M 100 0 L 200 180 L 0 180 Z',
  },
  {
    id: 'star',
    label: 'Star',
    viewBox: '0 0 200 200',
    d: 'M 100 10 L 121.2 70.9 L 185.6 72.2 L 134.2 111.1 L 152.9 172.8 L 100 136 L 47.1 172.8 L 65.8 111.1 L 14.4 72.2 L 78.8 70.9 Z',
  },
  {
    id: 'heart',
    label: 'Heart',
    viewBox: '0 0 200 170',
    d: 'M 100 165 C 40 130 0 100 0 65 C 0 35 20 10 50 10 C 70 10 85 20 100 40 C 115 20 130 10 150 10 C 180 10 200 35 200 65 C 200 100 160 130 100 165 Z',
  },
  {
    id: 'arrow-right',
    label: 'Arrow →',
    viewBox: '0 0 200 200',
    d: 'M 0 70 L 120 70 L 120 25 L 200 100 L 120 175 L 120 130 L 0 130 Z',
  },
  {
    id: 'arrow-left',
    label: 'Arrow ←',
    viewBox: '0 0 200 200',
    d: 'M 200 70 L 80 70 L 80 25 L 0 100 L 80 175 L 80 130 L 200 130 Z',
  },
  {
    id: 'diamond',
    label: 'Diamond',
    viewBox: '0 0 200 200',
    d: 'M 100 0 L 200 85 L 100 200 L 0 85 Z',
  },
  {
    id: 'pentagon',
    label: 'Pentagon',
    viewBox: '0 0 200 200',
    d: 'M 100 10 L 185.6 72.2 L 152.9 172.8 L 47.1 172.8 L 14.4 72.2 Z',
  },
  {
    id: 'hexagon',
    label: 'Hexagon',
    viewBox: '0 0 200 200',
    d: 'M 100 10 L 177.9 55 L 177.9 145 L 100 190 L 22.1 145 L 22.1 55 Z',
  },
  {
    id: 'speech-bubble',
    label: 'Speech Bubble',
    viewBox: '0 0 200 180',
    d: 'M 20 0 C 9 0 0 9 0 20 L 0 110 C 0 121 9 130 20 130 L 70 130 L 70 165 L 105 130 L 180 130 C 191 130 200 121 200 110 L 200 20 C 200 9 191 0 180 0 Z',
  },
]

interface Props {
  onAddShape: (d: string, viewBox: string) => void
}

export function ShapesPanel({ onAddShape }: Props) {
  return (
    <div style={{ padding: 10 }}>
      <p style={{ color: '#52525b', fontSize: 11, margin: '4px 0 10px', lineHeight: 1.4 }}>
        Click to add shape to canvas.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {SHAPES.map((shape) => (
          <ShapeTile key={shape.id} shape={shape} onClick={() => onAddShape(shape.d, shape.viewBox)} />
        ))}
      </div>
    </div>
  )
}

function ShapeTile({ shape, onClick }: { shape: ShapeDef; onClick: () => void }) {
  const [hov, setHov] = React.useState(false)
  return (
    <Tooltip title={shape.label} placement="top">
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          aspectRatio: '1 / 1',
          background: hov ? '#3f3f46' : '#27272a',
          border: `1px solid ${hov ? '#7c3aed' : '#3f3f46'}`,
          borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 8, transition: 'all 0.15s',
        }}
      >
        <svg
          viewBox={shape.viewBox}
          style={{ width: '80%', height: '80%' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={shape.d} fill={hov ? '#a78bfa' : '#7c3aed'} />
        </svg>
      </button>
    </Tooltip>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "ShapesPanel" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/panels/ShapesPanel.tsx
git commit -m "feat: add ShapesPanel with 12 SVG shapes"
```

---

## Task 5: StickersPanel

**Files:**
- Create: `src/pages/advertiser/studio/components/panels/StickersPanel.tsx`

Stickers are added as `StaticText` with `fontSize: 64`. The emoji renders natively in the Fabric canvas via the system font stack.

- [ ] **Step 1: Create StickersPanel.tsx**

```tsx
import React, { useState } from 'react'

const CATEGORIES = [
  { label: 'Faces',   items: ['😀','😂','😍','🥰','😎','🤩','😢','😡','🤔','😴'] },
  { label: 'Nature',  items: ['🌸','🌿','🌊','🔥','⭐','🌙','☀️','🌈','🍃','🌺'] },
  { label: 'Food',    items: ['🍕','🍔','🍣','🍩','🍦','🎂','🍓','🥑','🧁','☕'] },
  { label: 'Travel',  items: ['✈️','🚀','🏖️','🗺️','🏔️','🚗','🎡','🏛️','⛵','🌍'] },
  { label: 'Objects', items: ['💎','🎵','🎨','📸','💻','🎮','📱','🔑','💡','🎁'] },
  { label: 'Symbols', items: ['❤️','💯','✨','🔥','💥','🎯','👑','🏆','⚡','🦋'] },
]

interface Props {
  onAddSticker: (emoji: string) => void
}

export function StickersPanel({ onAddSticker }: Props) {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Category tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '10px 10px 6px' }}>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(i)}
            style={{
              padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              borderRadius: 20, border: 'none',
              background: activeCategory === i ? 'rgba(124,58,237,0.22)' : '#27272a',
              color: activeCategory === i ? '#a78bfa' : '#71717a',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sticker grid */}
      <div style={{ padding: '6px 10px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
        {CATEGORIES[activeCategory].items.map((emoji) => (
          <StickerBtn key={emoji} emoji={emoji} onClick={() => onAddSticker(emoji)} />
        ))}
      </div>
    </div>
  )
}

function StickerBtn({ emoji, onClick }: { emoji: string; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={`Add ${emoji}`}
      style={{
        aspectRatio: '1/1', fontSize: 26, cursor: 'pointer',
        background: hov ? '#3f3f46' : 'transparent',
        border: `1px solid ${hov ? '#52525b' : 'transparent'}`,
        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.12s',
      }}
    >
      {emoji}
    </button>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "StickersPanel" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/panels/StickersPanel.tsx
git commit -m "feat: add StickersPanel with 60 emoji stickers"
```

---

## Task 6: IconRail

**Files:**
- Create: `src/pages/advertiser/studio/components/IconRail.tsx`

- [ ] **Step 1: Create IconRail.tsx**

```tsx
import React from 'react'
import { Tooltip } from 'antd'
import {
  PictureOutlined, AppstoreOutlined, SmileOutlined,
  FontSizeOutlined, UploadOutlined,
} from '@ant-design/icons'

export type PanelKey = 'library' | 'shapes' | 'stickers' | 'text' | 'upload'

const ICONS: { key: PanelKey; icon: React.ReactNode; label: string }[] = [
  { key: 'library',  icon: <PictureOutlined />,  label: 'Library'  },
  { key: 'shapes',   icon: <AppstoreOutlined />,  label: 'Shapes'   },
  { key: 'stickers', icon: <SmileOutlined />,     label: 'Stickers' },
  { key: 'text',     icon: <FontSizeOutlined />,  label: 'Text'     },
  { key: 'upload',   icon: <UploadOutlined />,    label: 'Upload'   },
]

interface Props {
  activePanel: PanelKey | null
  onTogglePanel: (key: PanelKey) => void
}

export function IconRail({ activePanel, onTogglePanel }: Props) {
  return (
    <div style={{
      width: 56, flexShrink: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '10px 0', gap: 2,
      background: '#18181b', borderRight: '1px solid #27272a', zIndex: 10,
    }}>
      {ICONS.map(({ key, icon, label }) => {
        const active = activePanel === key
        return (
          <Tooltip key={key} title={label} placement="right">
            <button
              onClick={() => onTogglePanel(key)}
              style={{
                width: 44, padding: '9px 0', border: 'none', cursor: 'pointer',
                borderRadius: 10, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 3, marginBottom: 2,
                background: active ? 'rgba(124,58,237,0.22)' : 'transparent',
                color: active ? '#a78bfa' : '#52525b',
                transition: 'all 0.15s',
                fontSize: 18,
              }}
            >
              {icon}
              <span style={{
                fontSize: 8, fontWeight: 700, letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </button>
          </Tooltip>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "IconRail" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/IconRail.tsx
git commit -m "feat: add IconRail with 5 panel toggle buttons"
```

---

## Task 7: useLayerPanel hook

**Files:**
- Create: `src/pages/advertiser/studio/hooks/useLayerPanel.ts`

Uses `useObjects<any[]>()` (from `@layerhub-io/react`) which reads `state.objects` — already filtered by layerhub to exclude Frame/Background, and updated reactively on every add/remove/modify. Reversed to show top layer first (matching Figma convention).

- [ ] **Step 1: Create useLayerPanel.ts**

```ts
import { useObjects, useActiveObject } from '@layerhub-io/react'

const TYPE_LABELS: Record<string, string> = {
  StaticImage:    'Image',
  BackgroundImage:'Image',
  StaticText:     'Text',
  DynamicText:    'Text',
  StaticVideo:    'Video',
  StaticPath:     'Shape',
  StaticVector:   'Shape',
  Group:          'Group',
}

export interface LayerItem {
  id: string
  type: string
  name: string
  visible: boolean
}

export function useLayerPanel() {
  const objects = (useObjects<any[]>() ?? []) as any[]
  const activeObj = useActiveObject() as any

  // objects are in Z-order bottom→top; reverse so top layer appears first
  const layers: LayerItem[] = [...objects].reverse().map((obj, idx) => ({
    id: String(obj.id ?? idx),
    type: String(obj.type ?? 'Object'),
    name: obj.name ?? `${TYPE_LABELS[obj.type] ?? 'Object'} ${idx + 1}`,
    visible: obj.visible !== false,
  }))

  const activeId = activeObj?.id ? String(activeObj.id) : null

  return { layers, activeId }
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "useLayerPanel" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/hooks/useLayerPanel.ts
git commit -m "feat: add useLayerPanel hook using useObjects reactive state"
```

---

## Task 8: LayerPanel component

**Files:**
- Create: `src/pages/advertiser/studio/components/LayerPanel.tsx`

- [ ] **Step 1: Create LayerPanel.tsx**

```tsx
import React, { useState } from 'react'
import {
  PictureOutlined, FontSizeOutlined, VideoCameraOutlined,
  AppstoreOutlined, CloseOutlined, EyeOutlined, EyeInvisibleOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import type { LayerItem } from '../hooks/useLayerPanel'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  StaticImage:    <PictureOutlined />,
  BackgroundImage:<PictureOutlined />,
  StaticText:     <FontSizeOutlined />,
  DynamicText:    <FontSizeOutlined />,
  StaticVideo:    <VideoCameraOutlined />,
  StaticPath:     <AppstoreOutlined />,
  StaticVector:   <AppstoreOutlined />,
}

interface Props {
  layers: LayerItem[]
  activeId: string | null
  editor: any
  onClose: () => void
}

export function LayerPanel({ layers, activeId, editor, onClose }: Props) {
  return (
    <div style={{
      width: 220, flexShrink: 0,
      background: '#18181b', borderLeft: '1px solid #27272a',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        height: 44, flexShrink: 0, display: 'flex', alignItems: 'center',
        padding: '0 12px', borderBottom: '1px solid #27272a',
      }}>
        <span style={{
          flex: 1, fontSize: 11, fontWeight: 700, color: '#a1a1aa',
          textTransform: 'uppercase', letterSpacing: '0.07em',
        }}>
          Layers
        </span>
        <Tooltip title="Close layers panel">
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#52525b', display: 'flex', alignItems: 'center',
              padding: 4, borderRadius: 6,
            }}
          >
            <CloseOutlined style={{ fontSize: 12 }} />
          </button>
        </Tooltip>
      </div>

      {/* Layer list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {layers.length === 0 ? (
          <div style={{
            padding: '32px 16px', textAlign: 'center',
            color: '#3f3f46', fontSize: 12,
          }}>
            No layers yet.<br />Add content to the canvas.
          </div>
        ) : (
          layers.map((layer) => (
            <LayerRow
              key={layer.id}
              layer={layer}
              isActive={layer.id === activeId}
              onSelect={() => editor?.objects.select(layer.id)}
              onToggleVisible={() =>
                editor?.objects.update({ visible: !layer.visible }, layer.id)
              }
              onDelete={() => editor?.objects.remove(layer.id)}
            />
          ))
        )}
      </div>

      {/* Footer hint */}
      <div style={{
        padding: '8px 12px', borderTop: '1px solid #27272a',
        fontSize: 10, color: '#3f3f46', lineHeight: 1.4,
      }}>
        Click layer to select · Eye to show/hide
      </div>
    </div>
  )
}

function LayerRow({ layer, isActive, onSelect, onToggleVisible, onDelete }: {
  layer: LayerItem
  isActive: boolean
  onSelect: () => void
  onToggleVisible: () => void
  onDelete: () => void
}) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 38, display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 12px', cursor: 'pointer',
        background: isActive
          ? 'rgba(124,58,237,0.18)'
          : hov ? 'rgba(255,255,255,0.04)' : 'transparent',
        transition: 'background 0.1s',
        borderLeft: isActive ? '2px solid #7c3aed' : '2px solid transparent',
      }}
    >
      <span style={{ fontSize: 13, color: isActive ? '#a78bfa' : '#52525b', flexShrink: 0 }}>
        {TYPE_ICONS[layer.type] ?? <AppstoreOutlined />}
      </span>
      <span style={{
        flex: 1, fontSize: 12,
        color: isActive ? '#e4e4e7' : '#a1a1aa',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        opacity: layer.visible ? 1 : 0.45,
      }}>
        {layer.name}
      </span>

      {(hov || isActive) && (
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <Tooltip title={layer.visible ? 'Hide' : 'Show'}>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleVisible() }}
              style={ICON_BTN}
            >
              {layer.visible
                ? <EyeOutlined style={{ fontSize: 11 }} />
                : <EyeInvisibleOutlined style={{ fontSize: 11 }} />}
            </button>
          </Tooltip>
          <Tooltip title="Delete layer">
            <button
              onClick={(e) => { e.stopPropagation(); onDelete() }}
              style={{ ...ICON_BTN, color: '#f87171' }}
            >
              <DeleteOutlined style={{ fontSize: 11 }} />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

const ICON_BTN: React.CSSProperties = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  color: '#71717a', padding: 3, borderRadius: 4,
  display: 'flex', alignItems: 'center',
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "LayerPanel" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/LayerPanel.tsx
git commit -m "feat: add collapsible LayerPanel component"
```

---

## Task 9: ObjectPropertiesBar (enhanced)

**Files:**
- Create: `src/pages/advertiser/studio/components/ObjectPropertiesBar.tsx`

Three variants by `activeObj.type`:
- **Image** (`StaticImage`, `BackgroundImage`): opacity, flipH, flipV, remove BG, bring forward, send back, duplicate, delete
- **Text** (`StaticText`, `DynamicText`): opacity, fontSize, fill color, bold, italic, align, bring forward, send back, duplicate, delete
- **Shape + fallback**: opacity, fill color, stroke color, stroke width, bring forward, send back, duplicate, delete

All `editor.objects.*` calls are guarded with optional chaining.

- [ ] **Step 1: Create ObjectPropertiesBar.tsx**

```tsx
import React, { useState, useEffect, useCallback } from 'react'
import { App } from 'antd'
import {
  ScissorOutlined, CopyOutlined, DeleteOutlined,
  VerticalAlignTopOutlined, VerticalAlignBottomOutlined,
  SwapOutlined, BoldOutlined, ItalicOutlined,
  AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined,
} from '@ant-design/icons'
import { PDivider, PBtn } from './primitives'

interface Props {
  activeObj: any
  editor: any
  removingBg: boolean
  onRemoveBg: () => void
}

export function ObjectPropertiesBar({ activeObj, editor, removingBg, onRemoveBg }: Props) {
  const type    = activeObj?.type as string | undefined
  const isImage = type === 'StaticImage' || type === 'BackgroundImage'
  const isText  = type === 'StaticText'  || type === 'DynamicText'
  const isShape = type === 'StaticPath'  || type === 'StaticVector'

  const [opacity, setOpacity] = useState(() => Math.round((activeObj?.opacity ?? 1) * 100))
  useEffect(() => {
    setOpacity(Math.round((activeObj?.opacity ?? 1) * 100))
  }, [activeObj?.id])

  const label = isImage ? 'Image' : isText ? 'Text' : isShape ? 'Shape' : 'Object'

  return (
    <div style={{
      position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 30, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px',
      background: 'rgba(12,12,18,0.94)', backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(124,58,237,0.35)',
      borderRadius: 14,
      boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      whiteSpace: 'nowrap',
    }}>
      {/* Type badge */}
      <div style={{
        background: 'rgba(124,58,237,0.22)', borderRadius: 6, padding: '3px 9px',
        fontSize: 10, fontWeight: 800, color: '#a78bfa',
        textTransform: 'uppercase', letterSpacing: '0.07em', flexShrink: 0,
      }}>
        {label}
      </div>

      <PDivider />

      {/* Opacity — all types */}
      <span style={{ fontSize: 11, color: '#71717a', flexShrink: 0 }}>Opacity</span>
      <input
        type="range" min={0} max={100} value={opacity}
        style={{ width: 72, accentColor: '#7c3aed', cursor: 'pointer' }}
        onChange={(e) => {
          const v = Number(e.target.value)
          setOpacity(v)
          editor?.objects.update({ opacity: v / 100 })
        }}
      />
      <span style={{ fontSize: 11, color: '#a1a1aa', minWidth: 30, textAlign: 'right' }}>
        {opacity}%
      </span>

      {/* ── Image controls ─────────────────────────── */}
      {isImage && (
        <>
          <PDivider />
          <PBtn title="Flip horizontal" onClick={() => editor?.objects.update({ flipX: !(activeObj?.flipX) })}>
            <SwapOutlined />
          </PBtn>
          <PBtn title="Flip vertical" onClick={() => editor?.objects.update({ flipY: !(activeObj?.flipY) })}>
            <SwapOutlined style={{ transform: 'rotate(90deg)' }} />
          </PBtn>
          <PDivider />
          <PBtn
            title="Remove image background (runs in-browser)"
            onClick={onRemoveBg}
            style={{
              fontSize: 11, fontWeight: 600, padding: '0 10px',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.35)',
              color: removingBg ? '#71717a' : '#a78bfa',
            }}
          >
            <ScissorOutlined style={{ fontSize: 12 }} />
            {removingBg ? 'Removing…' : 'Remove BG'}
          </PBtn>
        </>
      )}

      {/* ── Text controls ──────────────────────────── */}
      {isText && (
        <>
          <PDivider />
          <span style={{ fontSize: 11, color: '#71717a', flexShrink: 0 }}>Size</span>
          <input
            key={activeObj?.id + '-fs'}
            type="number" min={6} max={500}
            defaultValue={activeObj?.fontSize ?? 32}
            style={{
              width: 52, background: '#27272a', border: '1px solid #3f3f46',
              borderRadius: 6, color: '#e4e4e7', fontSize: 12,
              padding: '4px 6px', textAlign: 'center',
            }}
            onChange={(e) => editor?.objects.update({ fontSize: Number(e.target.value) })}
          />
          <span style={{ fontSize: 11, color: '#71717a', flexShrink: 0 }}>Color</span>
          <input
            key={activeObj?.id + '-fill'}
            type="color"
            defaultValue={typeof activeObj?.fill === 'string' ? activeObj.fill : '#000000'}
            style={{
              width: 30, height: 28, padding: 2,
              borderRadius: 7, border: '1px solid #3f3f46',
              background: '#27272a', cursor: 'pointer',
            }}
            onChange={(e) => editor?.objects.update({ fill: e.target.value })}
          />
          <PDivider />
          <PBtn
            title="Bold"
            onClick={() => editor?.objects.update({ fontWeight: activeObj?.fontWeight === 'bold' ? 'normal' : 'bold' })}
            active={activeObj?.fontWeight === 'bold'}
          >
            <BoldOutlined />
          </PBtn>
          <PBtn
            title="Italic"
            onClick={() => editor?.objects.update({ fontStyle: activeObj?.fontStyle === 'italic' ? 'normal' : 'italic' })}
            active={activeObj?.fontStyle === 'italic'}
          >
            <ItalicOutlined />
          </PBtn>
          <PDivider />
          <PBtn title="Align left"   onClick={() => editor?.objects.update({ textAlign: 'left' })}   active={activeObj?.textAlign === 'left'}>
            <AlignLeftOutlined />
          </PBtn>
          <PBtn title="Align center" onClick={() => editor?.objects.update({ textAlign: 'center' })} active={activeObj?.textAlign === 'center'}>
            <AlignCenterOutlined />
          </PBtn>
          <PBtn title="Align right"  onClick={() => editor?.objects.update({ textAlign: 'right' })}  active={activeObj?.textAlign === 'right'}>
            <AlignRightOutlined />
          </PBtn>
        </>
      )}

      {/* ── Shape controls ─────────────────────────── */}
      {(isShape || (!isImage && !isText)) && (
        <>
          <PDivider />
          <span style={{ fontSize: 11, color: '#71717a', flexShrink: 0 }}>Fill</span>
          <input
            key={activeObj?.id + '-shape-fill'}
            type="color"
            defaultValue={typeof activeObj?.fill === 'string' ? activeObj.fill : '#7c3aed'}
            style={{
              width: 30, height: 28, padding: 2,
              borderRadius: 7, border: '1px solid #3f3f46',
              background: '#27272a', cursor: 'pointer',
            }}
            onChange={(e) => editor?.objects.update({ fill: e.target.value })}
          />
          <span style={{ fontSize: 11, color: '#71717a', flexShrink: 0 }}>Stroke</span>
          <input
            key={activeObj?.id + '-stroke'}
            type="color"
            defaultValue={typeof activeObj?.stroke === 'string' && activeObj.stroke ? activeObj.stroke : '#ffffff'}
            style={{
              width: 30, height: 28, padding: 2,
              borderRadius: 7, border: '1px solid #3f3f46',
              background: '#27272a', cursor: 'pointer',
            }}
            onChange={(e) => editor?.objects.update({ stroke: e.target.value })}
          />
          <input
            key={activeObj?.id + '-sw'}
            type="number" min={0} max={40}
            defaultValue={activeObj?.strokeWidth ?? 0}
            style={{
              width: 44, background: '#27272a', border: '1px solid #3f3f46',
              borderRadius: 6, color: '#e4e4e7', fontSize: 12,
              padding: '4px 6px', textAlign: 'center',
            }}
            onChange={(e) => editor?.objects.update({ strokeWidth: Number(e.target.value) })}
          />
        </>
      )}

      {/* ── Z-order + duplicate + delete — all types ── */}
      <PDivider />
      <PBtn title="Bring forward" onClick={() => editor?.objects.bringForward()}>
        <VerticalAlignTopOutlined />
      </PBtn>
      <PBtn title="Send backward" onClick={() => editor?.objects.sendBackwards()}>
        <VerticalAlignBottomOutlined />
      </PBtn>
      <PDivider />
      <PBtn title="Duplicate" onClick={() => editor?.objects.clone()}>
        <CopyOutlined />
      </PBtn>
      <PBtn title="Delete (Del)" onClick={() => editor?.objects.remove()} danger>
        <DeleteOutlined />
      </PBtn>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "ObjectPropertiesBar" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/ObjectPropertiesBar.tsx
git commit -m "feat: add enhanced ObjectPropertiesBar with flip/bold/italic/stroke controls"
```

---

## Task 10: useCanvasSize hook

**Files:**
- Create: `src/pages/advertiser/studio/hooks/useCanvasSize.ts`

- [ ] **Step 1: Create useCanvasSize.ts**

```ts
import { useState, useCallback } from 'react'

export const AD_SIZES = [
  { label: '1920×1080 (Landscape)', value: '1920x1080' },
  { label: '1080×1080 (Square)',    value: '1080x1080' },
  { label: '1080×1920 (Portrait)',  value: '1080x1920' },
  { label: '728×90 (Leaderboard)',  value: '728x90'    },
  { label: '300×250 (Med Rect)',    value: '300x250'   },
  { label: 'Custom…',              value: 'custom'    },
]

export function useCanvasSize(editor: any) {
  const [size, setSize]         = useState('1920x1080')
  const [customOpen, setCustomOpen] = useState(false)
  const [customW, setCustomW]   = useState(1920)
  const [customH, setCustomH]   = useState(1080)

  const applySize = useCallback((w: number, h: number) => {
    if (!editor) return
    editor.frame.resize({ width: w, height: h })
  }, [editor])

  const handleSizeChange = useCallback((value: string) => {
    if (value === 'custom') {
      setCustomOpen(true)
      return
    }
    setCustomOpen(false)
    setSize(value)
    const [w, h] = value.split('x').map(Number)
    applySize(w, h)
  }, [applySize])

  const handleApplyCustom = useCallback(() => {
    const w = Math.max(100, Math.min(8000, customW))
    const h = Math.max(100, Math.min(8000, customH))
    setCustomOpen(false)
    setSize(`${w}×${h}`)
    applySize(w, h)
  }, [customW, customH, applySize])

  return {
    size, customOpen, setCustomOpen,
    customW, setCustomW, customH, setCustomH,
    handleSizeChange, handleApplyCustom,
  }
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "useCanvasSize" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/hooks/useCanvasSize.ts
git commit -m "feat: add useCanvasSize hook with custom W×H support"
```

---

## Task 11: Toolbar

**Files:**
- Create: `src/pages/advertiser/studio/components/Toolbar.tsx`

- [ ] **Step 1: Create Toolbar.tsx**

```tsx
import React, { CSSProperties } from 'react'
import { Tooltip, Select, Popover, InputNumber, Button } from 'antd'
import {
  ArrowLeftOutlined, UndoOutlined, RedoOutlined,
  ZoomInOutlined, ZoomOutOutlined, SaveOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { HDivider } from './primitives'
import { AD_SIZES } from '../hooks/useCanvasSize'

interface Props {
  editor: any
  zoomPct: number
  size: string
  customOpen: boolean
  setCustomOpen: (v: boolean) => void
  customW: number
  setCustomW: (v: number) => void
  customH: number
  setCustomH: (v: number) => void
  handleSizeChange: (v: string) => void
  handleApplyCustom: () => void
  layerPanelOpen: boolean
  onToggleLayers: () => void
  exporting: boolean
  onExport: () => void
  onBack: () => void
}

const TOOL_BTN: CSSProperties = {
  width: 32, height: 32, border: 'none', borderRadius: 8, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
  background: 'transparent', color: '#6b7280', transition: 'all 0.15s',
}

export function Toolbar({
  editor, zoomPct, size, customOpen, setCustomOpen,
  customW, setCustomW, customH, setCustomH,
  handleSizeChange, handleApplyCustom,
  layerPanelOpen, onToggleLayers, exporting, onExport, onBack,
}: Props) {
  return (
    <div style={{
      height: 54, flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 4, padding: '0 14px',
      background: '#fff', borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <button
        onClick={() => { if (window.confirm('Leave without saving?')) onBack() }}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: '1px solid #e5e7eb',
          borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
          color: '#6b7280', fontSize: 13, fontWeight: 500,
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} /> Back
      </button>

      <HDivider />

      <Tooltip title="Undo (Ctrl+Z)" placement="bottom">
        <button onClick={() => editor?.history.undo()} style={TOOL_BTN}>
          <UndoOutlined />
        </button>
      </Tooltip>
      <Tooltip title="Redo (Ctrl+Y)" placement="bottom">
        <button onClick={() => editor?.history.redo()} style={TOOL_BTN}>
          <RedoOutlined />
        </button>
      </Tooltip>

      <HDivider />

      <Tooltip title="Zoom out" placement="bottom">
        <button onClick={() => editor?.zoom.zoomOut()} style={TOOL_BTN}>
          <ZoomOutOutlined />
        </button>
      </Tooltip>
      <div style={{
        minWidth: 46, textAlign: 'center', fontSize: 12, fontWeight: 600,
        color: '#374151', background: '#f3f4f6', borderRadius: 6, padding: '3px 8px',
        userSelect: 'none',
      }}>
        {zoomPct}%
      </div>
      <Tooltip title="Zoom in" placement="bottom">
        <button onClick={() => editor?.zoom.zoomIn()} style={TOOL_BTN}>
          <ZoomInOutlined />
        </button>
      </Tooltip>

      <div style={{ flex: 1 }} />

      {/* Canvas size selector */}
      <Popover
        open={customOpen}
        onOpenChange={(open) => !open && setCustomOpen(false)}
        placement="bottomRight"
        trigger="click"
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#111827' }}>Custom Canvas Size</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <InputNumber
                min={100} max={8000} value={customW}
                onChange={(v) => setCustomW(v ?? 100)}
                style={{ flex: 1 }} addonAfter="px" placeholder="Width"
              />
              <span style={{ color: '#9ca3af', fontWeight: 600 }}>×</span>
              <InputNumber
                min={100} max={8000} value={customH}
                onChange={(v) => setCustomH(v ?? 100)}
                style={{ flex: 1 }} addonAfter="px" placeholder="Height"
              />
            </div>
            <Button type="primary" size="small" onClick={handleApplyCustom} block>
              Apply
            </Button>
          </div>
        }
      >
        <Select
          value={size}
          onChange={handleSizeChange}
          options={AD_SIZES}
          style={{ width: 210 }}
        />
      </Popover>

      {/* Layers toggle */}
      <Tooltip title="Toggle layers panel" placement="bottom">
        <button
          onClick={onToggleLayers}
          style={{
            ...TOOL_BTN,
            background: layerPanelOpen ? 'rgba(124,58,237,0.12)' : 'transparent',
            color: layerPanelOpen ? '#7c3aed' : '#6b7280',
            border: layerPanelOpen ? '1px solid rgba(124,58,237,0.35)' : '1px solid transparent',
            borderRadius: 8,
          }}
        >
          <AppstoreOutlined />
        </button>
      </Tooltip>

      {/* Save */}
      <button
        onClick={onExport}
        disabled={exporting}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          border: 'none', borderRadius: 9, padding: '7px 18px',
          color: '#fff', fontWeight: 700, fontSize: 13,
          cursor: exporting ? 'wait' : 'pointer',
          boxShadow: '0 2px 12px rgba(124,58,237,0.38)',
          opacity: exporting ? 0.7 : 1,
        }}
      >
        <SaveOutlined style={{ fontSize: 14 }} />
        {exporting ? 'Saving…' : 'Save to Library'}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep "Toolbar" | head -5
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/components/Toolbar.tsx
git commit -m "feat: add Toolbar component with custom canvas size popover"
```

---

## Task 12: DesignEditorInner — wire everything

**Files:**
- Create: `src/pages/advertiser/studio/DesignEditorInner.tsx`

This replaces `DesignEditorInner` from the original `DesignEditor.tsx`. All canvas logic (addImageToCanvas, handleDrop, handleRemoveBg, handleExport, screenToFrameCoords) is preserved **exactly** — only the JSX layout changes.

- [ ] **Step 1: Create DesignEditorInner.tsx**

```tsx
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEditor, useActiveObject, useZoomRatio } from '@layerhub-io/react'

import { Toolbar } from './components/Toolbar'
import { IconRail } from './components/IconRail'
import type { PanelKey } from './components/IconRail'
import { CanvasArea } from './components/CanvasArea'
import { LayerPanel } from './components/LayerPanel'
import { ObjectPropertiesBar } from './components/ObjectPropertiesBar'

import { LibraryPanel } from './components/panels/LibraryPanel'
import { ShapesPanel } from './components/panels/ShapesPanel'
import { StickersPanel } from './components/panels/StickersPanel'
import { TextPanel } from './components/panels/TextPanel'
import { UploadPanel } from './components/panels/UploadPanel'

import { useStudioExport } from './hooks/useStudioExport'
import { useCanvasSize, AD_SIZES } from './hooks/useCanvasSize'
import { useLayerPanel } from './hooks/useLayerPanel'

const WORKSPACE_BG = '#111827'

export function DesignEditorInner({ onBack }: { onBack: () => void }) {
  const editor    = useEditor()
  const activeObj = useActiveObject() as any
  const zoomRatio = useZoomRatio<number>()
  const { exportToLibrary, exporting } = useStudioExport()
  const { message } = App.useApp()

  const [activePanel,    setActivePanel]    = useState<PanelKey | null>(null)
  const [layerPanelOpen, setLayerPanelOpen] = useState(false)
  const [removingBg,     setRemovingBg]     = useState(false)
  const [dragOver,       setDragOver]       = useState(false)

  const {
    size, customOpen, setCustomOpen,
    customW, setCustomW, customH, setCustomH,
    handleSizeChange, handleApplyCustom,
  } = useCanvasSize(editor)

  const { layers, activeId } = useLayerPanel()

  // Apply initial frame size on editor ready
  useEffect(() => {
    if (!editor) return
    const [w, h] = size.split('x').map(Number)
    if (!isNaN(w) && !isNaN(h)) editor.frame.resize({ width: w, height: h })
  }, [editor]) // intentional — run once when editor becomes available

  // Toggle panel: clicking active icon closes it
  const handlePanelToggle = useCallback((key: PanelKey) => {
    setActivePanel((prev) => (prev === key ? null : key))
  }, [])

  // ── Canvas helpers (logic unchanged from original) ────────────────────────

  const screenToFrameCoords = useCallback((sx: number, sy: number) => {
    if (!editor) return { top: 0, left: 0 }
    const fc = (editor.canvas as any).canvas
    const vt: number[] = fc?.viewportTransform ?? [1, 0, 0, 1, 0, 0]
    const fr = editor.frame.options as { top?: number; left?: number }
    return {
      top:  Math.max(0, (sy - vt[5]) / vt[3] - (fr.top  ?? 0)),
      left: Math.max(0, (sx - vt[4]) / vt[0] - (fr.left ?? 0)),
    }
  }, [editor])

  const addImageToCanvas = useCallback((url: string, top = 100, left = 100) => {
    if (!editor) return
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const maxWidth = 400
      const scale = img.width > maxWidth ? maxWidth / img.width : 1
      editor.objects
        .add({ type: 'StaticImage', src: url, top, left, width: img.width, height: img.height, scaleX: scale, scaleY: scale, opacity: 1 })
        .then(() => { (editor.canvas as any)?.canvas?.requestRenderAll?.() })
        .catch(() => message.error('Failed to add image'))
    }
    img.onerror = () => message.error('Could not load image')
    img.src = url
  }, [editor, message])

  const handleAddMedia   = useCallback((url: string) => addImageToCanvas(url), [addImageToCanvas])

  const handleAddText = useCallback(async (text: string, fontSize: number) => {
    if (!editor) return
    try {
      await editor.objects.add({ type: 'StaticText', text, fontSize, fill: '#1a1a1a', top: 100, left: 100 })
      ;(editor.canvas as any)?.canvas?.requestRenderAll?.()
    } catch { message.error('Failed to add text') }
  }, [editor, message])

  const handleAddShape = useCallback(async (d: string, viewBox: string) => {
    if (!editor) return
    try {
      const opts = editor.frame.options as { width?: number; height?: number }
      const fw = opts.width  ?? 800
      const fh = opts.height ?? 600
      await editor.objects.add({
        type: 'StaticPath',
        path: d as any, // SVG path string — layerhub StaticPath.initialize() passes to fabric.Path constructor
        fill: '#7c3aed',
        top:  (fh - 200) / 2,
        left: (fw - 200) / 2,
        width: 200,
        height: 200,
        opacity: 1,
      })
      ;(editor.canvas as any)?.canvas?.requestRenderAll?.()
    } catch (err) {
      console.error('Shape add failed:', err)
      message.error('Failed to add shape')
    }
  }, [editor, message])

  const handleAddSticker = useCallback(async (emoji: string) => {
    if (!editor) return
    try {
      await editor.objects.add({ type: 'StaticText', text: emoji, fontSize: 64, top: 100, left: 100 })
      ;(editor.canvas as any)?.canvas?.requestRenderAll?.()
    } catch { message.error('Failed to add sticker') }
  }, [editor, message])

  const handleUploadFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') addImageToCanvas(reader.result)
    }
    reader.onerror = () => message.error('Could not read file')
    reader.readAsDataURL(file)
  }, [addImageToCanvas, message])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes('text/x-adspot-url')) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if ((e.currentTarget as HTMLDivElement).contains(e.relatedTarget as Node)) return
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const url  = e.dataTransfer.getData('text/x-adspot-url')
    const type = e.dataTransfer.getData('text/x-adspot-type')
    if (!url || !editor) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const { top, left } = screenToFrameCoords(e.clientX - rect.left, e.clientY - rect.top)
    if (type === 'video') {
      editor.objects.add({ type: 'StaticVideo', src: url, top, left })
        .catch(() => message.error('Failed to add video'))
    } else {
      addImageToCanvas(url, top, left)
    }
  }, [editor, screenToFrameCoords, addImageToCanvas, message])

  const handleRemoveBg = useCallback(async () => {
    if (!editor || !activeObj?.getSrc) return
    setRemovingBg(true)
    try {
      const { removeBackground } = await import('@imgly/background-removal')
      const blob = await removeBackground(activeObj.getSrc() as string, { model: 'isnet_quint8' })
      const reader = new FileReader()
      reader.onloadend = () => {
        editor.objects.update({ src: reader.result as string })
        ;(editor.canvas as any)?.canvas?.requestRenderAll?.()
      }
      reader.readAsDataURL(blob)
    } catch { message.error('Background removal failed') }
    finally { setRemovingBg(false) }
  }, [editor, activeObj, message])

  const handleExport = useCallback(async () => {
    if (!editor) return
    try {
      const scene   = editor.scene.exportToJSON()
      const dataUrl = await editor.renderer.toDataURL(scene, {}) as string
      const blob    = await (await fetch(dataUrl)).blob()
      await exportToLibrary(blob, `design-${Date.now()}.png`)
    } catch { message.error('Export failed') }
  }, [editor, exportToLibrary, message])

  // ── Render ────────────────────────────────────────────────────────────────

  const zoomPct = Math.round((zoomRatio ?? 1) * 100)
  const hasObj  = !!activeObj && activeObj.type !== 'Frame'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      background: WORKSPACE_BG,
    }}>
      {/* ── Top Toolbar ─────────────────────────────────── */}
      <Toolbar
        editor={editor}
        zoomPct={zoomPct}
        size={size}
        customOpen={customOpen}
        setCustomOpen={setCustomOpen}
        customW={customW}
        setCustomW={setCustomW}
        customH={customH}
        setCustomH={setCustomH}
        handleSizeChange={handleSizeChange}
        handleApplyCustom={handleApplyCustom}
        layerPanelOpen={layerPanelOpen}
        onToggleLayers={() => setLayerPanelOpen((v) => !v)}
        exporting={exporting}
        onExport={handleExport}
        onBack={onBack}
      />

      {/* ── Body ────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Icon rail */}
        <IconRail activePanel={activePanel} onTogglePanel={handlePanelToggle} />

        {/* Canvas area + slide-out panel + properties bar */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

          {/* Canvas fills entire area */}
          <CanvasArea
            dragOver={dragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          {/* Slide-out panel overlays canvas */}
          {activePanel && (
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 250,
              zIndex: 20, background: '#18181b', borderRight: '1px solid #27272a',
              overflowY: 'auto',
              boxShadow: '4px 0 32px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Panel header */}
              <div style={{
                height: 44, flexShrink: 0, display: 'flex', alignItems: 'center',
                padding: '0 14px', borderBottom: '1px solid #27272a',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#a1a1aa',
                  textTransform: 'uppercase', letterSpacing: '0.07em',
                }}>
                  {activePanel === 'library'  && 'Media Library'}
                  {activePanel === 'shapes'   && 'Shapes'}
                  {activePanel === 'stickers' && 'Stickers'}
                  {activePanel === 'text'     && 'Text'}
                  {activePanel === 'upload'   && 'Upload'}
                </span>
              </div>

              {/* Panel content */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {activePanel === 'library'  && <LibraryPanel  onAddMedia={handleAddMedia} />}
                {activePanel === 'shapes'   && <ShapesPanel   onAddShape={handleAddShape} />}
                {activePanel === 'stickers' && <StickersPanel onAddSticker={handleAddSticker} />}
                {activePanel === 'text'     && <TextPanel     onAddText={handleAddText} />}
                {activePanel === 'upload'   && <UploadPanel   onUploadFile={handleUploadFile} />}
              </div>
            </div>
          )}

          {/* Floating object properties bar */}
          {hasObj && (
            <ObjectPropertiesBar
              activeObj={activeObj}
              editor={editor}
              removingBg={removingBg}
              onRemoveBg={handleRemoveBg}
            />
          )}
        </div>

        {/* Right: layer panel */}
        {layerPanelOpen && (
          <LayerPanel
            layers={layers}
            activeId={activeId}
            editor={editor}
            onClose={() => setLayerPanelOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit 2>&1 | grep -E "DesignEditorInner|error TS" | head -20
```

Expected: no errors. If `path` type error appears for StaticPath, the `// @ts-ignore` comment above that line handles it.

- [ ] **Step 3: Commit**

```bash
git add src/pages/advertiser/studio/DesignEditorInner.tsx
git commit -m "feat: add DesignEditorInner with Figma-style layout"
```

---

## Task 13: Slim DesignEditor.tsx to entry shell

**Files:**
- Modify: `src/pages/advertiser/studio/DesignEditor.tsx`

Replace the entire file content with just the Provider shell and the import of `DesignEditorInner`.

- [ ] **Step 1: Replace DesignEditor.tsx**

```tsx
import React from 'react'
import { App } from 'antd'
import { Provider } from '@layerhub-io/react'
import { useNavigate } from 'react-router-dom'
import { DesignEditorInner } from './DesignEditorInner'

export default function DesignEditor() {
  const navigate = useNavigate()
  return (
    <App>
      <Provider>
        <DesignEditorInner onBack={() => navigate('/advertiser/studio')} />
      </Provider>
    </App>
  )
}
```

- [ ] **Step 2: Full type-check**

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | head -20
```

Expected: zero `error TS` lines. Warnings are acceptable.

- [ ] **Step 3: Build check**

```bash
npm run build:frontend 2>&1 | tail -20
```

Expected: build completes with no errors.

- [ ] **Step 4: Start dev server and verify**

```bash
npm run dev &
```

Open `http://localhost:5173/advertiser/studio/design` and confirm:
1. Icon rail visible on left (Library, Shapes, Stickers, Text, Upload icons)
2. Clicking Library opens slide-out panel with media grid
3. Clicking Shapes shows 12 shape tiles; clicking one adds it to canvas
4. Clicking Stickers shows emoji grid; clicking one adds emoji to canvas
5. Clicking a shape on canvas shows properties bar with fill/stroke color pickers
6. Clicking an image on canvas shows properties bar with Flip H/V and Remove BG button
7. Clicking text on canvas shows bold/italic/align controls
8. Layers toggle (⊞) in toolbar opens right layer panel
9. Layer panel shows canvas objects; clicking a row selects it
10. Canvas size dropdown "Custom…" opens W×H popover; Apply resizes frame
11. Save to Library exports and uploads

- [ ] **Step 5: Commit**

```bash
git add src/pages/advertiser/studio/DesignEditor.tsx
git commit -m "refactor: slim DesignEditor.tsx to Provider shell, delegate to DesignEditorInner"
```

---

## Final checkpoint

After Task 13 passes, run the full TypeScript check one more time:

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | wc -l
```

Expected: `0`

If any errors remain, they will be specific to the files listed — fix them inline before marking the plan complete.
