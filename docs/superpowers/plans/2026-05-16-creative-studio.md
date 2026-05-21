# Creative Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Canva OAuth integration with a self-hosted Creative Studio using `@layerhub-io/react` (design ads) and `@twick/studio` (video ads), both integrated with the Adspot Media Library.

**Architecture:** Full-page overlay (`position: fixed; inset: 0; z-index: 100`) renders over the existing sidebar/header — no layout component changes needed. Design editor wraps the `@layerhub-io/react` `Canvas` + `Provider` with a custom Ant Design toolbar and left panel. Video editor wraps `TwickStudio` (full timeline UI) with an external "Add from Library" modal triggered by `useStudioManager().addElement()`. Both share `useStudioExport` → `POST /media/upload`.

**Tech Stack:** `@layerhub-io/react`, `@layerhub-io/core`, `@twick/studio`, `@twick/timeline`, `@twick/live-player`, `@twick/browser-render`, `@imgly/background-removal`, `onnxruntime-web`, React 18, Ant Design, Redux Toolkit.

**Spec:** `docs/superpowers/specs/2026-05-16-creative-studio-design.md`

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/pages/advertiser/studio/CreativeStudio.tsx` | Landing page — pick Design or Video |
| Create | `src/pages/advertiser/studio/DesignEditor.tsx` | Full-page design editor |
| Create | `src/pages/advertiser/studio/VideoEditor.tsx` | Full-page video editor |
| Create | `src/pages/advertiser/studio/hooks/useStudioExport.ts` | Shared hook: blob → /media/upload |
| Create | `src/components/studio/AdspotMediaPanel.tsx` | Shared media library grid |
| Modify | `src/App.tsx` | Remove Canva routes, add studio routes |
| Modify | `src/pages/advertiser/AdvertiserDashboard.tsx` | Replace Canva nav item |
| Modify | `public/locales/*/advertiser.json` | Replace canvaTemplates keys |
| Delete | `src/pages/advertiser/CanvaTemplates.tsx` | Remove Canva |
| Delete | `src/pages/advertiser/CanvaEditor.tsx` | Remove Canva |
| Delete | `src/services/api/canvaApi.ts` | Remove Canva |

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install all new packages**

```bash
npm install \
  @layerhub-io/react \
  @layerhub-io/core \
  @layerhub-io/objects \
  @layerhub-io/types \
  @twick/studio \
  @twick/browser-render \
  @imgly/background-removal \
  onnxruntime-web
```

Note: `@twick/studio` pulls in `@twick/timeline`, `@twick/live-player`, `@twick/video-editor`, `@twick/canvas` etc. automatically as peer deps.

- [ ] **Step 2: Verify packages installed**

```bash
ls node_modules/@layerhub-io/react && ls node_modules/@twick/studio && ls node_modules/@imgly/background-removal
```

Expected: all three directories exist with no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install creative studio dependencies"
```

---

## Task 2: Remove Canva files and routes

**Files:**
- Delete: `src/pages/advertiser/CanvaTemplates.tsx`
- Delete: `src/pages/advertiser/CanvaEditor.tsx`
- Delete: `src/services/api/canvaApi.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Delete Canva files**

```bash
rm src/pages/advertiser/CanvaTemplates.tsx \
   src/pages/advertiser/CanvaEditor.tsx \
   src/services/api/canvaApi.ts
```

- [ ] **Step 2: Remove Canva lazy imports from App.tsx**

In `src/App.tsx`, remove these two lines:
```ts
const CanvaTemplates = lazy(() => import('./pages/advertiser/CanvaTemplates'));
const CanvaEditor = lazy(() => import('./pages/advertiser/CanvaEditor'));
```

- [ ] **Step 3: Remove Canva routes from App.tsx**

Inside the `/advertiser` Route group (around line 230), remove:
```tsx
<Route path="canva-templates" element={<CanvaTemplates />} />
<Route path="canva-editor/:id" element={<CanvaEditor />} />
```

- [ ] **Step 4: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors referencing CanvaTemplates, CanvaEditor, or canvaApi.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git rm src/pages/advertiser/CanvaTemplates.tsx src/pages/advertiser/CanvaEditor.tsx src/services/api/canvaApi.ts
git commit -m "chore: remove Canva integration (files, imports, routes)"
```

---

## Task 3: Add studio routes to App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add lazy imports**

In `src/App.tsx`, after the existing lazy import block, add:
```ts
const CreativeStudio = lazy(() => import('./pages/advertiser/studio/CreativeStudio'));
const DesignEditor = lazy(() => import('./pages/advertiser/studio/DesignEditor'));
const VideoEditor = lazy(() => import('./pages/advertiser/studio/VideoEditor'));
```

- [ ] **Step 2: Add routes inside the advertiser Route group**

Inside the `/advertiser` Route group (after the `edit-campaign/:id` route), add:
```tsx
<Route path="studio" element={<CreativeStudio />} />
<Route path="studio/design" element={<DesignEditor />} />
<Route path="studio/video" element={<VideoEditor />} />
```

Note: `DesignEditor` and `VideoEditor` render `position: fixed; inset: 0; z-index: 100` internally, overlaying the sidebar/header without layout changes.

- [ ] **Step 3: Verify TypeScript (the page stubs don't exist yet — errors expected only for missing modules)**

```bash
npx tsc --noEmit 2>&1 | grep -v "studio"
```

Expected: errors only for missing studio files (expected — they don't exist yet).

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add /advertiser/studio routes to App.tsx"
```

---

## Task 4: Create `useStudioExport` hook

**Files:**
- Create: `src/pages/advertiser/studio/hooks/useStudioExport.ts`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p src/pages/advertiser/studio/hooks
```

- [ ] **Step 2: Write the hook**

Create `src/pages/advertiser/studio/hooks/useStudioExport.ts`:

```ts
import { useState } from 'react'
import { App } from 'antd'
import { mediaAPI } from '../../../../lib/api'

export function useStudioExport() {
  const [exporting, setExporting] = useState(false)
  const { message } = App.useApp()

  async function exportToLibrary(blob: Blob, filename: string): Promise<boolean> {
    setExporting(true)
    try {
      const formData = new FormData()
      formData.append('file', blob, filename)
      formData.append('title', filename.replace(/\.[^/.]+$/, ''))
      const response = await mediaAPI.upload(formData)
      if (response.success) {
        message.success('Saved to Media Library')
        return true
      }
      message.error('Failed to save — please try again')
      return false
    } catch {
      message.error('Failed to save — please try again')
      return false
    } finally {
      setExporting(false)
    }
  }

  return { exportToLibrary, exporting }
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "useStudioExport"
```

Expected: no output (no errors in this file).

- [ ] **Step 4: Commit**

```bash
git add src/pages/advertiser/studio/hooks/useStudioExport.ts
git commit -m "feat: add useStudioExport hook (blob → POST /media/upload)"
```

---

## Task 5: Create `AdspotMediaPanel` component

**Files:**
- Create: `src/components/studio/AdspotMediaPanel.tsx`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p src/components/studio
```

- [ ] **Step 2: Write the component**

Create `src/components/studio/AdspotMediaPanel.tsx`:

```tsx
import React, { useEffect } from 'react'
import { Spin, Empty, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchApprovedMedia } from '../../store/slices/mediaSlice'

const { Text } = Typography

interface Props {
  filter?: 'image' | 'video' | 'all'
  onSelect: (url: string, type: 'image' | 'video') => void
}

export const AdspotMediaPanel: React.FC<Props> = ({ filter = 'all', onSelect }) => {
  const dispatch = useAppDispatch()
  const { media, isLoading } = useAppSelector((state) => state.media)

  useEffect(() => {
    dispatch(fetchApprovedMedia())
  }, [dispatch])

  const filtered = media.filter((m: any) => {
    const mime: string = m.mimeType || m.type || m.fileType || ''
    if (filter === 'image') return mime.startsWith('image')
    if (filter === 'video') return mime.startsWith('video')
    return true
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spin />
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <Empty
        description={<Text type="secondary">No approved media yet. Upload some in the Media Library first.</Text>}
        className="py-8 px-4"
      />
    )
  }

  return (
    <div className="p-3 overflow-y-auto" style={{ maxHeight: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {filtered.map((item: any) => {
          const mime: string = item.mimeType || item.type || item.fileType || ''
          const isVideo = mime.startsWith('video')
          return (
            <div
              key={item.id}
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                background: '#f0f0f0',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => onSelect(item.url, isVideo ? 'video' : 'image')}
            >
              {isVideo ? (
                <video
                  src={item.url}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  muted
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.title || item.name || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(125,42,232,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = '0')}
              >
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>+ Add</Text>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

Note: The `mimeType` field name may differ from the actual media model. After running, if thumbnails don't filter correctly, check a real media item's shape via `console.log(media[0])` and adjust the `mime` field extraction accordingly.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "AdspotMediaPanel"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/studio/AdspotMediaPanel.tsx
git commit -m "feat: add AdspotMediaPanel shared component"
```

---

## Task 6: Create Creative Studio landing page

**Files:**
- Create: `src/pages/advertiser/studio/CreativeStudio.tsx`

- [ ] **Step 1: Write the component**

Create `src/pages/advertiser/studio/CreativeStudio.tsx`:

```tsx
import React, { useEffect } from 'react'
import { Card, Row, Col, Typography, Button, Divider } from 'antd'
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchMedia } from '../../../store/slices/mediaSlice'

const { Title, Text } = Typography

const EDITORS = [
  {
    path: '/advertiser/studio/design',
    icon: <PictureOutlined style={{ fontSize: 40, color: '#7d2ae8' }} />,
    title: 'Design Ad',
    description: 'Create image ads with layers, text, and graphics.',
    features: [
      'Multi-layer Fabric.js canvas',
      'Images from Adspot library or local upload',
      'Custom text & typography',
      'PNG export → Media Library',
      'AI background removal (in-browser)',
    ],
    color: '#7d2ae8',
  },
  {
    path: '/advertiser/studio/video',
    icon: <VideoCameraOutlined style={{ fontSize: 40, color: '#00c4cc' }} />,
    title: 'Video Ad',
    description: 'Build timeline-based video ads with multi-track editing.',
    features: [
      'Multi-track timeline editor',
      'Images & video from Adspot library',
      'Trim, transitions & effects',
      'MP4 export → Media Library',
      'Audio support',
    ],
    color: '#00c4cc',
  },
]

const CreativeStudio: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { media } = useAppSelector((state) => state.media)

  useEffect(() => {
    dispatch(fetchMedia())
  }, [dispatch])

  const recent = media.slice(0, 4)

  return (
    <div className="p-6">
      <div className="mb-8">
        <Title level={2} className="!mb-1">Creative Studio</Title>
        <Text type="secondary">Create professional ad creatives for your campaigns</Text>
      </div>

      <Row gutter={[24, 24]}>
        {EDITORS.map((editor) => (
          <Col xs={24} md={12} key={editor.path}>
            <Card
              hoverable
              className="!rounded-2xl !border-0 h-full"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: 32 }}
              onClick={() => navigate(editor.path)}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
                style={{ background: `${editor.color}15` }}
              >
                {editor.icon}
              </div>
              <Title level={3} className="!mb-2">{editor.title}</Title>
              <Text type="secondary" className="!block !mb-4">{editor.description}</Text>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
                {editor.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 mb-1">
                    <span style={{ color: editor.color, fontWeight: 700 }}>✓</span>
                    <Text>{f}</Text>
                  </li>
                ))}
              </ul>
              <Button
                type="primary"
                size="large"
                block
                className="!rounded-xl !h-12 !font-semibold"
                style={{ background: `linear-gradient(135deg, ${editor.color}, #7d2ae8)`, border: 'none' }}
              >
                Open {editor.title} Editor
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {recent.length > 0 && (
        <>
          <Divider className="!my-8" />
          <Title level={4} className="!mb-4">Recent Creations</Title>
          <Row gutter={[16, 16]}>
            {recent.map((item: any) => (
              <Col xs={12} sm={6} key={item.id}>
                <Card
                  className="!rounded-xl !border-0 overflow-hidden"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  bodyStyle={{ padding: 8 }}
                  cover={
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#f0f0f0' }}>
                      <img
                        src={item.thumbnailUrl || item.url}
                        alt={item.title || item.name || ''}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  }
                >
                  <Text className="!text-xs truncate !block">{item.title || item.name}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  )
}

export default CreativeStudio
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "CreativeStudio"
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify**

```bash
npm run client:dev
```

Navigate to `http://localhost:5173/advertiser/studio`. Expected:
- Two editor cards side-by-side (Design Ad, Video Ad)
- Each card shows capability list and CTA button
- If media exists, recent creations strip appears below

- [ ] **Step 4: Commit**

```bash
git add src/pages/advertiser/studio/CreativeStudio.tsx
git commit -m "feat: Creative Studio landing page"
```

---

## Task 7: Create Design Editor

**Files:**
- Create: `src/pages/advertiser/studio/DesignEditor.tsx`

The design editor uses `@layerhub-io/react`'s `Provider` + `Canvas` for the Fabric.js canvas, with a custom Ant Design toolbar and left panel built around the `useEditor()`, `useActiveObject()`, and `useZoomRatio()` hooks.

**Key API facts (from inspecting the npm package type definitions):**

| Goal | API call |
|------|---------|
| Add image to canvas | `await editor.objects.add({ type: 'StaticImage', src: url })` |
| Add text | `await editor.objects.add({ type: 'StaticText', text: 'Hello', fontSize: 60, fill: '#000' })` |
| Undo | `editor.history.undo()` |
| Redo | `editor.history.redo()` |
| Zoom in/out/reset | `editor.zoom.in()` / `.out()` / `.reset()` |
| Set canvas size | `editor.frame.resize({ width: W, height: H })` |
| Export to PNG data URL | `await editor.renderer.toDataURL(editor.scene.exportToJSON(), {})` |

- [ ] **Step 1: Write the component**

Create `src/pages/advertiser/studio/DesignEditor.tsx`:

```tsx
import React, { useRef, useState, useCallback, useMemo } from 'react'
import { Button, Tooltip, Typography, Select, App } from 'antd'
import {
  ArrowLeftOutlined,
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SaveOutlined,
  PictureOutlined,
  FontSizeOutlined,
  UploadOutlined,
  ScissorOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Canvas, Provider, useEditor, useActiveObject, useZoomRatio } from '@layerhub-io/react'
import { AdspotMediaPanel } from '../../../components/studio/AdspotMediaPanel'
import { useStudioExport } from './hooks/useStudioExport'

const { Text } = Typography

const AD_SIZES = [
  { label: '1920×1080 (Landscape)', value: '1920x1080' },
  { label: '1080×1080 (Square)',    value: '1080x1080' },
  { label: '1080×1920 (Portrait)',  value: '1080x1920' },
  { label: '728×90 (Leaderboard)', value: '728x90'    },
  { label: '300×250 (Med Rect)',    value: '300x250'   },
]

type PanelKey = 'images' | 'upload' | 'text'

// Must be rendered inside <Provider> to use @layerhub-io/react hooks
function DesignEditorInner({ onBack }: { onBack: () => void }) {
  const editor      = useEditor()
  const activeObj   = useActiveObject() as any
  const zoomRatio   = useZoomRatio()
  const { exportToLibrary, exporting } = useStudioExport()
  const { message } = App.useApp()

  const [panel,      setPanel     ] = useState<PanelKey>('images')
  const [canvasSize, setCanvasSize] = useState('1920x1080')
  const [removingBg, setRemovingBg] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSizeChange = useCallback((value: string) => {
    setCanvasSize(value)
    if (!editor) return
    const [w, h] = value.split('x').map(Number)
    editor.frame.resize({ width: w, height: h })
  }, [editor])

  const handleAddFromLibrary = useCallback(async (url: string) => {
    if (!editor) return
    await editor.objects.add({ type: 'StaticImage', src: url })
  }, [editor])

  const handleAddText = useCallback(async () => {
    if (!editor) return
    await editor.objects.add({ type: 'StaticText', text: 'Your text here', fontSize: 60, fill: '#000000' })
  }, [editor])

  const handleLocalUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    const url = URL.createObjectURL(file)
    editor.objects.add({ type: 'StaticImage', src: url })
    e.target.value = ''
  }, [editor])

  const handleRemoveBackground = useCallback(async () => {
    if (!editor || !activeObj?.getSrc) return
    setRemovingBg(true)
    try {
      const { default: removeBackground } = await import('@imgly/background-removal')
      const src: string = activeObj.getSrc()
      const blob = await removeBackground(src, { model: 'small', output: { format: 'image/png' } })
      const newUrl = URL.createObjectURL(blob)
      editor.objects.update({ src: newUrl })
    } catch {
      message.error('Background removal failed')
    } finally {
      setRemovingBg(false)
    }
  }, [editor, activeObj, message])

  const handleExport = useCallback(async () => {
    if (!editor) return
    const scene   = editor.scene.exportToJSON()
    const dataUrl = await editor.renderer.toDataURL(scene, {})
    const res     = await fetch(dataUrl)
    const blob    = await res.blob()
    await exportToLibrary(blob, `design-ad-${Date.now()}.png`)
  }, [editor, exportToLibrary])

  const handleBack = useCallback(() => {
    if (confirm('Leave without saving?')) onBack()
  }, [onBack])

  const panelTabs: { key: PanelKey; icon: React.ReactNode; label: string }[] = [
    { key: 'images', icon: <PictureOutlined />, label: 'Library' },
    { key: 'upload', icon: <UploadOutlined />,  label: 'Upload'  },
    { key: 'text',   icon: <FontSizeOutlined />, label: 'Text'   },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>

      {/* ── Top bar ── */}
      <div style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className="!rounded-lg">Back</Button>
        <div style={{ width: 1, height: 24, background: '#f0f0f0' }} />
        <Tooltip title="Undo"><Button icon={<UndoOutlined />} onClick={() => editor?.history.undo()} className="!rounded-lg" /></Tooltip>
        <Tooltip title="Redo"><Button icon={<RedoOutlined />} onClick={() => editor?.history.redo()} className="!rounded-lg" /></Tooltip>
        <div style={{ width: 1, height: 24, background: '#f0f0f0' }} />
        <Tooltip title="Zoom out"><Button icon={<ZoomOutOutlined />} onClick={() => editor?.zoom.out()} className="!rounded-lg" /></Tooltip>
        <Text type="secondary" style={{ minWidth: 44, textAlign: 'center', fontSize: 12 }}>
          {Math.round((zoomRatio ?? 1) * 100)}%
        </Text>
        <Tooltip title="Zoom in"><Button icon={<ZoomInOutlined />} onClick={() => editor?.zoom.in()} className="!rounded-lg" /></Tooltip>
        <div style={{ width: 1, height: 24, background: '#f0f0f0' }} />
        {activeObj?.getSrc && (
          <Tooltip title="AI background removal (runs in-browser, Chrome/Edge)">
            <Button icon={<ScissorOutlined />} loading={removingBg} onClick={handleRemoveBackground} className="!rounded-lg">
              Remove BG
            </Button>
          </Tooltip>
        )}
        <div style={{ flex: 1 }} />
        <Select value={canvasSize} onChange={handleSizeChange} options={AD_SIZES} style={{ width: 210 }} />
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={exporting}
          onClick={handleExport}
          className="!rounded-lg !font-semibold"
          style={{ background: 'linear-gradient(90deg, #00c4cc, #7d2ae8)', border: 'none' }}
        >
          Save to Library
        </Button>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left panel */}
        <div style={{ width: 240, background: 'white', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
            {panelTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPanel(tab.key)}
                style={{
                  flex: 1, border: 'none', padding: '10px 4px', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  background: panel === tab.key ? '#f9f0ff' : 'transparent',
                  color:      panel === tab.key ? '#7d2ae8'  : '#595959',
                }}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {panel === 'images' && (
              <AdspotMediaPanel filter="image" onSelect={(url) => handleAddFromLibrary(url)} />
            )}
            {panel === 'upload' && (
              <div className="p-4">
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLocalUpload} />
                <Button block icon={<UploadOutlined />} size="large" className="!rounded-xl" onClick={() => fileInputRef.current?.click()}>
                  Upload Image
                </Button>
                <Text type="secondary" className="!block !text-xs !mt-2 text-center">PNG, JPG, SVG · max 50 MB</Text>
              </div>
            )}
            {panel === 'text' && (
              <div className="p-4">
                <Button block icon={<FontSizeOutlined />} size="large" className="!rounded-xl" onClick={handleAddText}>
                  Add Text Layer
                </Button>
                <Text type="secondary" className="!block !text-xs !mt-2 text-center">Double-click any text to edit</Text>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Canvas
            config={{
              id: 'adspot-design-canvas',
              clipToFrame: true,
              scrollLimit: 2500,
              frameMargin: 100,
              background: '#f5f5f5',
              size: { width: 1920, height: 1080 },
              controlsPosition: { rotation: 'TOP' },
              guidelines: true,
              shortcuts: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}

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

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "DesignEditor"
```

Expected: no errors.

- [ ] **Step 3: Browser test at `/advertiser/studio/design`**

```bash
npm run client:dev
```

Check all of the following:
- Full-screen editor with top bar and left panel renders
- "Library" tab shows Adspot approved images (fetched from Redux)
- Clicking an image adds it to the canvas
- "Text" tab → "Add Text Layer" adds editable text to canvas
- Undo button removes the last added object
- Zoom in/out buttons change zoom level (percentage shown in top bar)
- Ad size selector resizes the canvas frame
- "Save to Library" button uploads PNG to `/media/upload` and shows success toast
- After adding an image to canvas and selecting it: "Remove BG" button appears and runs background removal

- [ ] **Step 4: Commit**

```bash
git add src/pages/advertiser/studio/DesignEditor.tsx
git commit -m "feat: Design Editor with Fabric.js canvas, Adspot library panel, AI bg removal"
```

---

## Task 8: Create Video Editor

**Files:**
- Create: `src/pages/advertiser/studio/VideoEditor.tsx`

**Key API facts (from inspecting npm package type definitions):**

| Goal | Code |
|------|------|
| Add video to timeline | `const el = new VideoElement(url, { width: 1920, height: 1080 }); el.setStart(0).setEnd(10); await addElement(el)` |
| Add image to timeline | `const el = new ImageElement(url, { width: 1920, height: 1080 }); el.setStart(0).setEnd(5); await addElement(el)` |
| Trigger export | `useStudioOperation(studioConfig).onExportVideo()` |
| Custom export logic | `studioConfig.exportVideo = async (project, videoSettings) => { ... }` |
| Render MP4 in-browser | `renderTwickVideoInBrowser({ variables: { input: project }, settings: { width, height, fps, quality, onProgress } })` |
| Suppress demo media seed | `studioConfig.media = { seed: 'none' }` |

- [ ] **Step 1: Write the component**

Create `src/pages/advertiser/studio/VideoEditor.tsx`:

```tsx
import React, { useState, useCallback, useMemo } from 'react'
import { Button, Modal, Progress, Typography, Tooltip, App } from 'antd'
import { ArrowLeftOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { TwickStudio, useStudioManager, useStudioOperation } from '@twick/studio'
import type { StudioConfig } from '@twick/studio'
import { LivePlayerProvider } from '@twick/live-player'
import { TimelineProvider, INITIAL_TIMELINE_DATA, VideoElement, ImageElement } from '@twick/timeline'
import { renderTwickVideoInBrowser } from '@twick/browser-render'
import '@twick/studio/dist/studio.css'
import { AdspotMediaPanel } from '../../../components/studio/AdspotMediaPanel'
import { useStudioExport } from './hooks/useStudioExport'

const { Text } = Typography
const VIDEO_RESOLUTION = { width: 1920, height: 1080 }

// Must be inside LivePlayerProvider + TimelineProvider to use hooks
function VideoEditorInner({ onBack }: { onBack: () => void }) {
  const { addElement }                    = useStudioManager()
  const { exportToLibrary, exporting }    = useStudioExport()
  const { message }                       = App.useApp()

  const [libraryOpen,    setLibraryOpen   ] = useState(false)
  const [rendering,      setRendering     ] = useState(false)
  const [renderProgress, setRenderProgress] = useState(0)

  const handleAddAsset = useCallback(async (url: string, type: 'image' | 'video') => {
    try {
      if (type === 'video') {
        const el = new VideoElement(url, VIDEO_RESOLUTION)
        el.setStart(0).setEnd(10)
        await addElement(el)
      } else {
        const el = new ImageElement(url, VIDEO_RESOLUTION)
        el.setStart(0).setEnd(5)
        await addElement(el)
      }
      setLibraryOpen(false)
    } catch {
      message.error('Failed to add asset to timeline')
    }
  }, [addElement, message])

  const studioConfig: StudioConfig = useMemo(() => ({
    videoProps: VIDEO_RESOLUTION,
    media: { seed: 'none' },
    exportVideo: async (project, videoSettings) => {
      if (!('VideoEncoder' in window)) {
        message.warning('MP4 export requires Chrome or Edge.')
        return { status: false, message: 'WebCodecs not supported' }
      }
      setRendering(true)
      setRenderProgress(0)
      try {
        const videoBlob = await renderTwickVideoInBrowser({
          variables: { input: project },
          settings: {
            width:      videoSettings.resolution.width,
            height:     videoSettings.resolution.height,
            fps:        videoSettings.fps,
            quality:    'high',
            onProgress: (p) => setRenderProgress(Math.round(p * 100)),
          },
        })
        const saved = await exportToLibrary(videoBlob, `video-ad-${Date.now()}.mp4`)
        return saved
          ? { status: true,  message: 'Saved to Media Library' }
          : { status: false, message: 'Upload failed'          }
      } catch {
        message.error('Video rendering failed — please try again')
        return { status: false, message: 'Render failed' }
      } finally {
        setRendering(false)
        setRenderProgress(0)
      }
    },
  }), [exportToLibrary, message])

  const { onExportVideo } = useStudioOperation(studioConfig)

  const handleBack = useCallback(() => {
    if (confirm('Leave without saving?')) onBack()
  }, [onBack])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: '#1a1a2e' }}>

      {/* ── Top bar ── */}
      <div style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: '#16213e', borderBottom: '1px solid #0f3460' }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="!rounded-lg"
          style={{ background: '#0f3460', border: 'none', color: 'white' }}
        >
          Back
        </Button>
        <Tooltip title="Browse your Adspot Media Library">
          <Button
            icon={<FolderOpenOutlined />}
            onClick={() => setLibraryOpen(true)}
            className="!rounded-lg"
            style={{ background: '#0f3460', border: 'none', color: 'white' }}
          >
            Add from Library
          </Button>
        </Tooltip>
        <div style={{ flex: 1 }} />
        <Button
          type="primary"
          loading={rendering || exporting}
          onClick={onExportVideo}
          className="!rounded-lg !font-semibold"
          style={{ background: 'linear-gradient(90deg, #00c4cc, #7d2ae8)', border: 'none' }}
        >
          {rendering ? `Rendering ${renderProgress}%` : 'Export Video'}
        </Button>
      </div>

      {rendering && (
        <div style={{ padding: '4px 16px', background: '#16213e' }}>
          <Progress
            percent={renderProgress}
            showInfo={false}
            strokeColor={{ '0%': '#00c4cc', '100%': '#7d2ae8' }}
            trailColor="#0f3460"
          />
        </div>
      )}

      {/* TwickStudio */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TwickStudio studioConfig={studioConfig} />
      </div>

      {/* Adspot Library modal */}
      <Modal
        title="Adspot Media Library"
        open={libraryOpen}
        onCancel={() => setLibraryOpen(false)}
        footer={null}
        width={680}
        styles={{ body: { padding: 0, height: 420, overflow: 'auto' } }}
        destroyOnClose
      >
        <AdspotMediaPanel filter="all" onSelect={handleAddAsset} />
      </Modal>
    </div>
  )
}

export default function VideoEditor() {
  const navigate = useNavigate()
  return (
    <App>
      <LivePlayerProvider>
        <TimelineProvider initialData={INITIAL_TIMELINE_DATA} contextId="adspot-video-studio">
          <VideoEditorInner onBack={() => navigate('/advertiser/studio')} />
        </TimelineProvider>
      </LivePlayerProvider>
    </App>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "VideoEditor"
```

Expected: no errors.

- [ ] **Step 3: Browser test at `/advertiser/studio/video`**

```bash
npm run client:dev
```

Check all of the following:
- TwickStudio renders with timeline at the bottom (dark theme)
- "Add from Library" button opens the Adspot Media Library modal
- Selecting a video from the modal adds a clip to the timeline
- Selecting an image adds a 5-second still to the timeline
- "Export Video" button (top bar) triggers TwickStudio's export flow
- In Chrome/Edge: rendering progress bar appears, then success toast, then media appears in Media Library
- In Firefox/Safari: warning message "MP4 export requires Chrome or Edge"

- [ ] **Step 4: Commit**

```bash
git add src/pages/advertiser/studio/VideoEditor.tsx
git commit -m "feat: Video Editor with TwickStudio, Adspot library modal, MP4 export"
```

---

## Task 9: Update sidebar nav and clean up i18n

**Files:**
- Modify: `src/pages/advertiser/AdvertiserDashboard.tsx`
- Modify: `public/locales/*/advertiser.json` (all 21 locales)

### Part A — Sidebar nav

- [ ] **Step 1: Add `ThunderboltFilled` to antd icons import in AdvertiserDashboard.tsx**

Find the existing `@ant-design/icons` import in `src/pages/advertiser/AdvertiserDashboard.tsx` and add `ThunderboltFilled` if not already present.

- [ ] **Step 2: Replace the Canva menu item**

Find (around line 100):
```ts
{
  key: '/advertiser/canva-templates',
  icon: <LayoutOutlined />,
  label: t('menu.canvaTemplates'),
  onClick: () => {
    navigate('/advertiser/canva-templates');
    if (isMobile) setDrawerVisible(false);
  }
},
```

Replace with:
```ts
{
  key: '/advertiser/studio',
  icon: <ThunderboltFilled />,
  label: t('menu.creativeStudio'),
  onClick: () => {
    navigate('/advertiser/studio');
    if (isMobile) setDrawerVisible(false);
  }
},
```

### Part B — i18n (21 locale files)

- [ ] **Step 3: Add `creativeStudio` key and remove `canvaTemplates` from all locales**

Run a script to update all `advertiser.json` files at once:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const localesDir = './public/locales';
const langs = fs.readdirSync(localesDir);
langs.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'advertiser.json');
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (data.menu) {
    delete data.menu.canvaTemplates;
    data.menu.creativeStudio = lang === 'en' ? 'Creative Studio'
      : lang === 'ar' ? 'استوديو الإبداع'
      : lang === 'fr' ? 'Studio Créatif'
      : lang === 'de' ? 'Kreativ-Studio'
      : lang === 'es' ? 'Estudio Creativo'
      : lang === 'pt' ? 'Estúdio Criativo'
      : lang === 'it' ? 'Studio Creativo'
      : lang === 'ru' ? 'Творческая Студия'
      : lang === 'zh' ? '创意工作室'
      : lang === 'ja' ? 'クリエイティブスタジオ'
      : lang === 'ko' ? '크리에이티브 스튜디오'
      : lang === 'tr' ? 'Kreatif Stüdyo'
      : lang === 'nl' ? 'Creatieve Studio'
      : lang === 'pl' ? 'Studio Kreatywne'
      : lang === 'uk' ? 'Творча Студія'
      : lang === 'th' ? 'สตูดิโอสร้างสรรค์'
      : lang === 'vi' ? 'Studio Sáng Tạo'
      : lang === 'ur' ? 'تخلیقی اسٹوڈیو'
      : lang === 'ms' ? 'Studio Kreatif'
      : lang === 'he' ? 'סטודיו יצירתי'
      : lang === 'el' ? 'Δημιουργικό Στούντιο'
      : 'Creative Studio';
  }
  delete data.canvaTemplates;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated', filePath);
});
"
```

Also remove canva notification keys from `common.json` files:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const localesDir = './public/locales';
fs.readdirSync(localesDir).forEach(lang => {
  const filePath = path.join(localesDir, lang, 'common.json');
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (data.notifications) {
    delete data.notifications.canvaExportCompleted;
    delete data.notifications.canvaExportFailed;
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
});
console.log('Done cleaning common.json files');
"
```

- [ ] **Step 4: Verify i18n changes**

```bash
grep -r "canvaTemplates" public/locales/
```

Expected: no output (all canvaTemplates keys removed).

```bash
grep -r "creativeStudio" public/locales/ | wc -l
```

Expected: 21 (one per locale).

- [ ] **Step 5: Verify TypeScript and dev server**

```bash
npx tsc --noEmit
```

Start dev server, confirm:
- Sidebar shows "Creative Studio" item with ThunderboltFilled icon
- Clicking it navigates to `/advertiser/studio`
- No console errors about missing i18n keys

- [ ] **Step 6: Commit**

```bash
git add src/pages/advertiser/AdvertiserDashboard.tsx public/locales/
git commit -m "feat: replace Canva sidebar nav with Creative Studio, update all i18n locales"
```

---

## Task 10: End-to-end smoke test

No new files. Full integration verification.

- [ ] **Step 1: Run the dev server**

```bash
npm run client:dev
```

- [ ] **Step 2: Design Editor — full workflow**

1. Log in as an advertiser
2. Click "Creative Studio" in sidebar → landing page appears
3. Click "Design Ad" → full-screen editor opens, sidebar/header hidden
4. "Library" tab → Adspot approved images show
5. Click an image → it appears on canvas
6. "Text" tab → "Add Text Layer" → text appears on canvas
7. Select the image → "Remove BG" button appears in top bar
8. Click "Remove BG" → background removed in-browser
9. Undo/Redo buttons work
10. Zoom in/out works
11. Change ad size (e.g. 1080×1080) → canvas frame resizes
12. Click "Save to Library" → PNG uploaded, success toast
13. Navigate to Media Library → new PNG appears

- [ ] **Step 3: Video Editor — full workflow**

1. Click "Creative Studio" → "Video Ad"
2. TwickStudio loads with dark theme and timeline
3. "Add from Library" → modal opens with Adspot media
4. Select a video → added to timeline as a clip
5. Select an image → added as a 5-second still
6. In Chrome: "Export Video" → rendering progress → success toast → MP4 in Media Library
7. "Back" button → confirm dialog → returns to Creative Studio landing

- [ ] **Step 4: Verify no Canva references remain**

```bash
grep -r "canva\|CanvaTemplates\|CanvaEditor\|canvaApi" src/ --include="*.ts" --include="*.tsx" | grep -v ".test."
```

Expected: no output.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Creative Studio complete — Design Editor + Video Editor replace Canva"
```

---

## Known caveats

| Item | Detail |
|------|--------|
| MP4 export browser support | `renderTwickVideoInBrowser` requires Chrome 114+ / Edge 114+ (WebCodecs API). Firefox and Safari users see a warning and cannot export video. |
| `@layerhub-io` package version | All packages are at v0.3.3 (2022). If the Fabric.js canvas has sizing/rendering issues, check that `fabric` v5.x is installed (it's a peer dep of `@layerhub-io/core`). |
| AdspotMediaPanel `mimeType` field | The exact field name for media type may differ from the mock (`mimeType` vs `type` vs `fileType`). After first run, `console.log(media[0])` in AdspotMediaPanel and adjust the `mime` extraction accordingly. |
| TwickStudio CSS | `@twick/studio/dist/studio.css` must be imported for the editor to render correctly. If styling looks broken, verify this import is present in VideoEditor.tsx. |
| Background removal model download | First use of "Remove BG" downloads ~5MB ONNX model to IndexedDB. A loading indicator is shown while this happens. Subsequent uses are instant. |
