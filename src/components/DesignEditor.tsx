import React, { useState, useCallback, useEffect } from 'react'
import { useEditor, useActiveObject, useZoomRatio } from '../engine/react'

import { Toolbar } from './Toolbar'
import { IconRail } from './IconRail'
import type { PanelKey } from './IconRail'
import { CanvasArea } from './Canvas'
import { LayerPanel } from './LayerPanel'
import { ObjectPropertiesBar } from './ObjectPropertiesBar'

import { LibraryPanel } from './panels/LibraryPanel'
import { ShapesPanel, SHAPES } from './panels/ShapesPanel'
import { StickersPanel } from './panels/StickersPanel'
import { TextPanel } from './panels/TextPanel'
import { UploadPanel } from './panels/UploadPanel'
import { FontsPanel } from './panels/FontsPanel'

import { useStudioExport } from '../hooks/useStudioExport'
import { useCanvasSize } from '../hooks/useCanvasSize'
import { useLayerPanel } from '../hooks/useLayerPanel'
import { useAutoSave, loadAutosave } from '../hooks/useAutoSave'

import { EditorContextProvider } from './EditorContext'
import { Provider as EngineProvider } from '../engine/react'
import { Toaster } from './primitives/Toast'
import { useToast } from '../hooks/useToast'
import { createNullMediaProvider, createGoogleFontsProvider, createImglyBackgroundRemoval, createLocalStoragePersistence } from '../providers/defaults'
import type { MediaProvider, FontProvider, BackgroundRemovalProvider, PersistenceProvider } from '../providers'
import type { IScene } from '../engine'

const WORKSPACE_BG = 'var(--color-bg)'

function getStorageSafe(key: string, DEFAULT_SETTINGS: any) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
    return DEFAULT_SETTINGS
  } catch { return DEFAULT_SETTINGS }
}

type LibraryPanelRenderProp = React.ReactNode | ((props: { onAddMedia: (url: string) => void }) => React.ReactNode)

function DesignEditorInner({ onBack, initialScene, className, libraryPanel }: { onBack: () => void; initialScene?: any; className?: string; libraryPanel?: LibraryPanelRenderProp }) {
  const editor    = useEditor()
  const activeObj = useActiveObject() as any
  const zoomRatio = useZoomRatio<number>()
  const { exportToLibrary, exporting } = useStudioExport()
  const message = useToast()

  const [activePanel,    setActivePanel]    = useState<PanelKey | null>(null)
  const [layerPanelOpen, setLayerPanelOpen] = useState(false)
  

  const [removingBg,        setRemovingBg]        = useState(false)
  const [shimmerRect,       setShimmerRect]       = useState<{top: number, left: number, width: number, height: number} | null>(null)
  const [dragOver,          setDragOver]          = useState(false)

  const { layers, activeId } = useLayerPanel()

  const [canvasBg, setCanvasBg] = useState<string>(() => {
    return (initialScene as any)?.canvasBg || getStorageSafe('studio_canvasBg', '#ffffff')
  })
  const [workspaceBg, setWorkspaceBg] = useState<string>(() => {
    return (initialScene as any)?.workspaceBg || getStorageSafe('studio_workspaceBg', '#1a1a2e')
  })

  const { setHasUnsavedChanges } = useAutoSave(editor, canvasBg, workspaceBg)

  type Settings = { showGrid: boolean; snapGrid: boolean; railSide: 'left' | 'right' }
  const [settings, setSettings] = useState<Settings>(() => {
    return getStorageSafe('studio_settings', { showGrid: false, snapGrid: false, railSide: 'left' })
  })

  const handleSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev: Settings) => {
      const next = { ...prev, ...patch }
      localStorage.setItem('studio_settings', JSON.stringify(next))
      return next
    })
  }, [])

  const restoreShapes = useCallback(() => {
    if (!editor) return
    const objs = (editor.scene.exportToJSON() as any)?.layers || []
    objs.forEach((o: any) => {
      if (o.type === 'polygon' && o.metadata?.shapeType) {
        const polyObj = (editor.canvas as any)?.canvas?.getObjects?.().find((obj: any) => obj.id === o.id)
        if (polyObj) {
          polyObj.set({ shapeType: o.metadata.shapeType })
        }
      }
    })
  }, [editor])

  useEffect(() => {
    if (!editor) return

    if (initialScene) {
      const scene = (initialScene as any).scene || initialScene
      editor.scene.importFromJSON(scene).catch(() => {}).then(restoreShapes)
      if ((initialScene as any).canvasBg) setCanvasBg((initialScene as any).canvasBg)
      if ((initialScene as any).workspaceBg) setWorkspaceBg((initialScene as any).workspaceBg)
    } else {
      const saved = loadAutosave()
      if (saved) {
        if (saved.scene) editor.scene.importFromJSON(saved.scene).catch(() => {}).then(restoreShapes)
        if (saved.canvasBg) setCanvasBg(saved.canvasBg)
        if (saved.workspaceBg) setWorkspaceBg(saved.workspaceBg)
      }
    }

    const handleChange = () => setHasUnsavedChanges(true)
    editor.on('history:changed', handleChange)
    return () => editor.off('history:changed', handleChange)
  }, [editor, initialScene, restoreShapes, setHasUnsavedChanges])

  const zoomPct = Math.round(zoomRatio * 100)

  const {
    size, customOpen, setCustomOpen,
    customW, setCustomW, customH, setCustomH,
    handleSizeChange, handleApplyCustom
  } = useCanvasSize(editor)

  const handleAddMedia = useCallback(async (url: string) => {
    if (!editor) return
    try {
      const type = url.match(/\.(mp4|webm)$/i) ? 'Video' : 'StaticImage'
      const options = {
        type, url,
        top: 100, left: 100,
        metadata: { source: 'adspot' }
      }
      await editor?.objects.add(options)
    } catch {
      message.error('Failed to add media')
    }
  }, [editor, message])

  const addImageToCanvas = useCallback((url: string, top = 100, left = 100) => {
    if (!editor) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = async () => {
      let scale = 1
      const frame = (editor as any)?.frame?.frame
      const maxW = ((frame?.width as number) || 1080) * 0.8
      const maxH = ((frame?.height as number) || 1080) * 0.8
      if (img.width > maxW || img.height > maxH) {
        const scaleW = maxW / img.width
        const scaleH = maxH / img.height
        scale = Math.min(scaleW, scaleH)
      }

      await editor?.objects.add({
        type: 'StaticImage',
        src: url,
        top,
        left,
        scaleX: scale,
        scaleY: scale,
      } as any)
    }
    img.onerror = () => message.error('Failed to load image.')
  }, [editor, message])

  const handleAddText = useCallback(async (text: string, fontSize: number) => {
    if (!editor) return
    try {
      await editor?.objects.add({ type: 'StaticText', text, fontSize, fill: '#1a1a1a', top: 100, left: 100 })
    } catch {
      message.error('Failed to add text')
    }
  }, [editor, message])

  const handleRemoveBg = useCallback(async () => {
    if (!editor || !activeObj || activeObj.type !== 'StaticImage' || !activeObj.src) return

    setShimmerRect({
      top: activeObj.top ?? 0,
      left: activeObj.left ?? 0,
      width: (activeObj.width ?? 100) * (activeObj.scaleX ?? 1),
      height: (activeObj.height ?? 100) * (activeObj.scaleY ?? 1),
    })

    setRemovingBg(true)
    message.info('Removing background...')
    try {
      const { removeBackground } = await import('@imgly/background-removal')
      const blob = await removeBackground(activeObj.src)
      const newUrl = URL.createObjectURL(blob)

      editor?.objects.update({ src: newUrl })
      message.success('Background removed successfully!')
    } catch (err: any) {
      console.error('[handleRemoveBg] Error:', err)
      message.error(`Failed: ${err.message || 'Unknown error'}`)
    }
    finally { 
      setRemovingBg(false)
      setShimmerRect(null)
    }
  }, [editor, activeObj, message])

  const handleExport = useCallback(async () => {
    if (!editor) return
    try {
      const scene = editor.scene.exportToJSON()
      const dataUrl: string = await (editor as any).renderer.toDataURL(scene, { format: 'png', quality: 1, multiplier: 2 })
      const blob    = await (await fetch(dataUrl)).blob()
      const success = await exportToLibrary(blob, `design-${Date.now()}.png`)
      if (success) {
        setHasUnsavedChanges(false)
      }
    } catch {
      message.error('Failed to export')
    }
  }, [editor, exportToLibrary, message, setHasUnsavedChanges])

  return (
    <div data-de-root className={className} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--de-color-bg)', color: 'var(--de-color-fg)' }}>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column',
        background: WORKSPACE_BG,
      }}>
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
          onToggleLayers={() => setLayerPanelOpen(p => !p)}
          exporting={exporting}
          onExport={handleExport}
          settings={settings}
          onSettings={handleSettings}
          onBack={onBack || (() => {})}
          canvasBg={canvasBg}
          onBgChange={setCanvasBg}
          workspaceBg={workspaceBg}
          onWorkspaceBgChange={setWorkspaceBg}
        />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <IconRail
            activePanel={activePanel}
            onTogglePanel={setActivePanel}
          />

          {activePanel && (
            <div style={{ width: 320, background: '#16213e', borderRight: '1px solid #0f3460', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
              {activePanel === 'library'  && (
                libraryPanel
                  ? typeof libraryPanel === 'function' ? libraryPanel({ onAddMedia: handleAddMedia }) : libraryPanel
                  : <LibraryPanel />
              )}
              {activePanel === 'text'     && <TextPanel onAddText={handleAddText} />}
              {activePanel === 'shapes'   && <ShapesPanel onAddShape={(src) => addImageToCanvas(src)} />}
              {activePanel === 'stickers' && <StickersPanel onAddSticker={url => addImageToCanvas(url)} />}
              {activePanel === 'upload'   && <UploadPanel onUploadFile={handleAddMedia} />}
              {activePanel === 'fonts'    && <FontsPanel onApplyFont={(family) => editor?.objects.update({ fontFamily: family } as any)} />}
            </div>
          )}

          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <CanvasArea
              canvasBg={canvasBg}
              workspaceBg={workspaceBg}
              dragOver={dragOver}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
            />
            {removingBg && shimmerRect && (
              <div style={{
                position: 'absolute',
                top: shimmerRect.top,
                left: shimmerRect.left,
                width: shimmerRect.width,
                height: shimmerRect.height,
                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                pointerEvents: 'none',
                zIndex: 9999,
                borderRadius: 8
              }} />
            )}
            
            {activeObj && (
              <ObjectPropertiesBar
                activeObj={activeObj}
                editor={editor}
                removingBg={removingBg}
                onRemoveBg={handleRemoveBg}
              />
            )}
          </div>

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
    </div>
  )
}

/** Props for the top-level {@link DesignEditor} component. */
export interface DesignEditorProps {
  /** A serialized scene to load on mount, or any scene-shaped object with optional `canvasBg`/`workspaceBg`. */
  initialScene?: IScene | any
  /** Stable key identifying the scene for persistence; passed to the persistence provider. */
  sceneKey?: string
  /** Called when the user clicks the back button in the toolbar. */
  onBack?: () => void
  /** Called when the user exports the design. Receives the rendered Blob and the output format. */
  onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg') => void | Promise<void>
  /** Media library provider. Defaults to a null provider (empty Library panel). */
  mediaProvider?: MediaProvider
  /** Font provider. Defaults to a Google Fonts provider. */
  fontProvider?: FontProvider
  /** Background removal provider. Defaults to `@imgly/background-removal` if installed. */
  backgroundRemovalProvider?: BackgroundRemovalProvider
  /** Autosave/scene persistence provider. Defaults to a `localStorage` provider. */
  persistenceProvider?: PersistenceProvider
  /** Optional className applied to the editor root for outer styling. */
  className?: string
  /** Custom render override for the Library panel — useful to inject host-app media UI. */
  libraryPanel?: LibraryPanelRenderProp
}

/**
 * The top-level image design editor. Renders a full-screen canvas-based editor
 * with toolbar, side panels, layer panel, and object properties bar.
 *
 * Configure host integration via the provider props
 * (`mediaProvider`, `fontProvider`, `backgroundRemovalProvider`, `persistenceProvider`).
 *
 * @example
 * ```tsx
 * import { DesignEditor } from '@fastlab-ai/design-editor'
 * import '@fastlab-ai/design-editor/theme.css'
 *
 * export default function App() {
 *   return <DesignEditor />
 * }
 * ```
 */
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
  libraryPanel,
}: DesignEditorProps) {
  const ctx = React.useMemo(
    () => ({ mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack }),
    [mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack],
  )

  return (
    <EngineProvider>
      <EditorContextProvider value={ctx}>
        <DesignEditorInner onBack={onBack!} initialScene={initialScene} className={className} libraryPanel={libraryPanel} />
        <Toaster position="bottom-right" />
      </EditorContextProvider>
    </EngineProvider>
  )
}
