import React, { useState, useCallback, useEffect } from 'react'
import { useEditor, useActiveObject, useZoomRatio } from '../engine/react'

import { Toolbar } from './Toolbar'
import { IconRail } from './IconRail'
import type { PanelKey } from './IconRail'
import { CanvasArea } from './Canvas'
import { LayerPanel } from './LayerPanel'
import { ObjectPropertiesBar } from './ObjectPropertiesBar'

import { TemplatesPanel } from './panels/templates/TemplatesPanel'
import type { DesignTemplate } from '../providers/templates'
import { ShapesPanel, SHAPES } from './panels/ShapesPanel'
import { StickersPanel } from './panels/StickersPanel'
import { TextPanel } from './panels/text/TextPanel'
import { UploadPanel } from './panels/UploadPanel'
import { FontsPanel } from './panels/FontsPanel'

import { useStudioExport } from '../hooks/useStudioExport'
import { useCanvasSize } from '../hooks/useCanvasSize'
import { useLayerPanel } from '../hooks/useLayerPanel'
import { useAutoSave, loadAutosave, clearAutosave } from '../hooks/useAutoSave'

import { EditorContextProvider, useEditorContext } from './EditorContext'
import { Provider as EngineProvider } from '../engine/react'
import { Toaster } from './primitives/Toast'
import { useToast } from '../hooks/useToast'
import {
  createDefaultTemplateProvider,
  createDefaultTextDesignProvider,
  createDefaultFontProvider,
  createImglyBackgroundRemoval,
  createLocalStoragePersistence,
} from '../providers/defaults'
import type { FontProvider, BackgroundRemovalProvider, PersistenceProvider, TemplateProvider } from '../providers'
import type { TextDesignProvider } from '../providers/textDesigns'
import type { IScene } from '../engine'

const WORKSPACE_BG = 'var(--color-bg)'

function getStorageSafe(key: string, DEFAULT_SETTINGS: any) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
    return DEFAULT_SETTINGS
  } catch { return DEFAULT_SETTINGS }
}

type TemplatesPanelRenderProp = React.ReactNode | ((props: { onApplyTemplate: (t: DesignTemplate) => void }) => React.ReactNode)

function DesignEditorInner({ onBack, initialScene, className, templatesPanel, title, textDesignProvider }: { onBack?: () => void; initialScene?: any; className?: string; templatesPanel?: TemplatesPanelRenderProp; title?: React.ReactNode; textDesignProvider: TextDesignProvider }) {
  const editor    = useEditor()
  const activeObj = useActiveObject() as any
  const zoomRatio = useZoomRatio<number>()
  const { exportToLibrary, exporting } = useStudioExport()
  const message = useToast()
  const { backgroundRemovalProvider, sceneKey, templateProvider } = useEditorContext()

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
    return (initialScene as any)?.workspaceBg || getStorageSafe('studio_workspaceBg', '#f5f5f5')
  })

  useEffect(() => {
    if (editor && canvasBg) {
      try {
        (editor as any).frame?.setBackgroundColor?.(canvasBg)
      } catch (e) { console.error("Error setting bg:", e) }
    }
  }, [editor, canvasBg])

  const { hasUnsavedChanges, setHasUnsavedChanges } = useAutoSave(editor, canvasBg, workspaceBg, sceneKey)

  const handleBack = useCallback(() => {
    clearAutosave(sceneKey)
    if (onBack) onBack()
  }, [onBack, sceneKey])

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

    const saved = loadAutosave(sceneKey)
    if (saved && Object.keys(saved).length > 0) {
      if (saved.scene) {
        editor.scene.importFromJSON(saved.scene).catch(() => {}).then(() => {
          restoreShapes()
          if (saved.canvasBg) {
            try { (editor as any).frame?.setBackgroundColor?.(saved.canvasBg) } catch {}
          }
          setTimeout(() => {
            editor.history.reset()
            editor.history.initialize()
            setHasUnsavedChanges(false)
          }, 50)
        })
      }
      if (saved.canvasBg) setCanvasBg(saved.canvasBg)
      if (saved.workspaceBg) setWorkspaceBg(saved.workspaceBg)
    } else if (initialScene) {
      const scene = (initialScene as any).scene || initialScene
      editor.scene.importFromJSON(scene).catch(() => {}).then(() => {
        restoreShapes()
        if ((initialScene as any).canvasBg) {
          try { (editor as any).frame?.setBackgroundColor?.((initialScene as any).canvasBg) } catch {}
        }
        setTimeout(() => {
          editor.history.reset()
          editor.history.initialize()
          setHasUnsavedChanges(false)
        }, 50)
      })
      if ((initialScene as any).canvasBg) setCanvasBg((initialScene as any).canvasBg)
      if ((initialScene as any).workspaceBg) setWorkspaceBg((initialScene as any).workspaceBg)
    }

    const handleChange = () => setHasUnsavedChanges(true)
    editor.on('history:changed', handleChange)
    return () => editor.off('history:changed', handleChange)
  }, [editor, initialScene, restoreShapes, setHasUnsavedChanges, sceneKey])

  const zoomPct = Math.round(zoomRatio * 100)

  const {
    size, customOpen, setCustomOpen,
    customW, setCustomW, customH, setCustomH,
    handleSizeChange, handleApplyCustom
  } = useCanvasSize(editor)

  const handleAddMedia = useCallback(async (url: string, position?: { top: number; left: number }) => {
    if (!editor) return
    try {
      const type = url.match(/\.(mp4|webm)$/i) ? 'StaticVideo' : 'StaticImage'
      const options = {
        type, src: url,
        top: position?.top ?? 100,
        left: position?.left ?? 100,
        metadata: { source: 'fastlabai' }
      }
      await editor?.objects.add(options)
    } catch (err: any) {
      console.error('[handleAddMedia] Error:', err)
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

  const handleApplyTemplate = useCallback((template: DesignTemplate) => {
    if (!editor) return
    const proceed = () => {
      editor.scene.importFromJSON(template.scene)
        .catch(() => message.error('Failed to apply template'))
        .then(() => {
          if (template.canvasBg) {
            setCanvasBg(template.canvasBg)
            try {
              (editor as any).frame?.setBackgroundColor?.(template.canvasBg)
            } catch {}
          }
          if (template.workspaceBg) setWorkspaceBg(template.workspaceBg)
          clearAutosave(sceneKey)
          setHasUnsavedChanges(false)
          setTimeout(() => editor.history.initialize(), 50)
        })
    }
    const hasHistoryUndo = (editor?.history?.status?.undos?.length ?? 0) > 0
    if (hasUnsavedChanges && hasHistoryUndo) {
      const ok = window.confirm('Replace current design? Unsaved changes will be lost.')
      if (!ok) return
    }
    proceed()
  }, [editor, hasUnsavedChanges, sceneKey, setHasUnsavedChanges, message])

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
      const blob = await backgroundRemovalProvider.remove(activeObj.src)
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
  }, [editor, activeObj, message, backgroundRemovalProvider])

  const handleExport = useCallback(async () => {
    if (!editor) return
    try {
      const scene = editor.scene.exportToJSON()
      const dataUrl: string = await (editor as any).renderer.toDataURL(scene, { format: 'png', quality: 1, multiplier: 2 })
      const blob    = await (await fetch(dataUrl)).blob()
      const success = await exportToLibrary(blob, `design-${Date.now()}.png`, scene)
      if (success) {
        setHasUnsavedChanges(false)
        clearAutosave(sceneKey)
      }
    } catch {
      message.error('Failed to export')
    }
  }, [editor, exportToLibrary, message, setHasUnsavedChanges])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (!editor) return

    const shapeSrc = e.dataTransfer.getData('text/x-fastlabai-shape-src')
    const stickerSrc = e.dataTransfer.getData('text/x-fastlabai-sticker-src')
    const mediaUrl = e.dataTransfer.getData('text/x-fastlabai-url')
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    let left = e.clientX - rect.left
    let top = e.clientY - rect.top

    try {
      const zoom = editor.canvas.canvas.getZoom() || 1
      const vpt = editor.canvas.canvas.viewportTransform || [1, 0, 0, 1, 0, 0]
      left = (left - vpt[4]) / zoom
      top = (top - vpt[5]) / zoom
    } catch { /* ignore if canvas not ready */ }

    if (shapeSrc || stickerSrc) {
      addImageToCanvas(shapeSrc || stickerSrc, top, left)
    } else if (mediaUrl) {
      handleAddMedia(mediaUrl, { top, left })
    }
  }, [editor, addImageToCanvas, handleAddMedia])

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
          onBack={onBack ? handleBack : undefined}
          canvasBg={canvasBg}
          onBgChange={setCanvasBg}
          workspaceBg={workspaceBg}
          onWorkspaceBgChange={setWorkspaceBg}
          title={title}
        />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <IconRail
            activePanel={activePanel}
            onTogglePanel={setActivePanel}
          />

          {activePanel && (
            <div style={{ width: 320, background: 'var(--color-surface, var(--de-color-bg-elevated))', borderRight: '1px solid var(--color-border, var(--de-color-border))', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 12px 0 12px' }}>
                <span style={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize', color: 'var(--color-text)' }}>
                  {activePanel}
                </span>
                <button
                  onClick={() => setActivePanel(null)}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    fontSize: 18,
                    lineHeight: 1,
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  ×
                </button>
              </div>
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {activePanel === 'templates' && (
                  templatesPanel
                    ? typeof templatesPanel === 'function' ? templatesPanel({ onApplyTemplate: handleApplyTemplate }) : templatesPanel
                    : <TemplatesPanel provider={templateProvider} onApplyTemplate={handleApplyTemplate} />
                )}
                {activePanel === 'text'     && <TextPanel provider={textDesignProvider} onApplyTextDesign={() => {}} onAddPlainText={(preset) => { const map = { heading: 72, subheading: 48, body: 28 } as const; handleAddText(preset, map[preset]) }} />}
                {activePanel === 'shapes'   && <ShapesPanel onAddShape={(src) => addImageToCanvas(src)} />}
                {activePanel === 'stickers' && <StickersPanel onAddSticker={url => addImageToCanvas(url)} />}
                {activePanel === 'upload'   && <UploadPanel onUploadFile={(url) => handleAddMedia(url)} />}
                {activePanel === 'fonts'    && <FontsPanel onApplyFont={(family) => editor?.objects.update({ fontFamily: family } as any)} />}
              </div>
            </div>
          )}

          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <CanvasArea
              canvasBg={canvasBg}
              workspaceBg={workspaceBg}
              dragOver={dragOver}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
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
  /** Called when the user exports the design. Receives the rendered Blob, output format, and raw scene JSON. */
  onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg', scene: IScene) => void | Promise<void>
  /** Template provider. Defaults to a small bundled starter set. */
  templateProvider?: TemplateProvider
  /** Text design provider. Defaults to the bundled text designs set. */
  textDesignProvider?: TextDesignProvider
  /** Font provider. Defaults to a Google Fonts provider. */
  fontProvider?: FontProvider
  /** Background removal provider. Defaults to `@imgly/background-removal` if installed. */
  backgroundRemovalProvider?: BackgroundRemovalProvider
  /** Autosave/scene persistence provider. Defaults to a `localStorage` provider. */
  persistenceProvider?: PersistenceProvider
  /** Optional className applied to the editor root for outer styling. */
  className?: string
  /** Custom render override for the Templates panel — useful to inject host-app template UI. */
  templatesPanel?: TemplatesPanelRenderProp
  /** Optional title to display in the toolbar. Defaults to "FastlabAI Design Studio". */
  title?: React.ReactNode
}

/**
 * The top-level image design editor. Renders a full-screen canvas-based editor
 * with toolbar, side panels, layer panel, and object properties bar.
 *
 * Configure host integration via the provider props
 * (`templateProvider`, `fontProvider`, `backgroundRemovalProvider`, `persistenceProvider`).
 *
 * @example
 * ```tsx
 * import { DesignEditor } from '@fastlabai/design-editor'
 * import '@fastlabai/design-editor/theme.css'
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
  templateProvider = createDefaultTemplateProvider(),
  textDesignProvider = createDefaultTextDesignProvider(),
  fontProvider = createDefaultFontProvider(),
  backgroundRemovalProvider,
  persistenceProvider = createLocalStoragePersistence(),
  className,
  templatesPanel,
  title,
}: DesignEditorProps) {
  const resolvedBackgroundRemovalProvider =
    backgroundRemovalProvider ?? createImglyBackgroundRemoval()
  const ctx = React.useMemo(
    () => ({ templateProvider, fontProvider, backgroundRemovalProvider: resolvedBackgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack }),
    [templateProvider, fontProvider, resolvedBackgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack],
  )

  return (
    <EngineProvider>
      <EditorContextProvider value={ctx}>
        <DesignEditorInner onBack={onBack} initialScene={initialScene} className={className} templatesPanel={templatesPanel} title={title} textDesignProvider={textDesignProvider} />
        <Toaster position="bottom-right" />
      </EditorContextProvider>
    </EngineProvider>
  )
}
