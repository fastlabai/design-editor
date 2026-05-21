import { readFileSync, writeFileSync } from 'fs'

const innerPath = 'src/pages/advertiser/studio/DesignEditorInner.tsx'
const destPath = 'packages/design-editor/src/components/DesignEditor.tsx'

let content = readFileSync(innerPath, 'utf8')

// We will construct the new file from scratch by picking pieces of the old one.
const header = `// @ts-nocheck
'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { useEditor, useActiveObject, useZoomRatio } from '../engine/react'
import { Toolbar } from './Toolbar'
import { IconRail } from './IconRail'
import type { PanelKey } from './IconRail'
import { Canvas as CanvasArea } from './Canvas'
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
import { EditorProvider as EngineProvider } from '../engine/react'
import { Toaster } from './primitives/Toast'
import { useToast } from '../hooks/useToast'
import { createNullMediaProvider, createGoogleFontsProvider, createImglyBackgroundRemoval, createLocalStoragePersistence } from '../providers/defaults'
import type { MediaProvider, FontProvider, BackgroundRemovalProvider, PersistenceProvider } from '../providers'
import type { IScene } from '../engine'

const WORKSPACE_BG = 'var(--color-bg)'

const DEFAULT_SETTINGS = { showGrid: false, snapGrid: false, railSide: 'left' }
function loadSettings() {
  try {
    const raw = localStorage.getItem('studio_settings')
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS
  } catch { return DEFAULT_SETTINGS }
}

export interface DesignEditorProps {
  initialScene?: IScene | any
  sceneKey?: string
  onBack?: () => void
  onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg') => void | Promise<void>
  mediaProvider?: MediaProvider
  fontProvider?: FontProvider
  backgroundRemovalProvider?: BackgroundRemovalProvider
  persistenceProvider?: PersistenceProvider
  className?: string
}
`

// Extract the body of DesignEditorInner function
const bodyStartRegex = /export function DesignEditorInner\(\{ onBack, initialScene \}: \{ onBack: \(\) => void; initialScene\?: any \}\) \{/
const startIndex = content.search(bodyStartRegex)
if (startIndex === -1) throw new Error('Could not find DesignEditorInner')

// Read from `{` to the end.
const body = content.substring(startIndex + content.match(bodyStartRegex)[0].length)

let newBody = `
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
    () => ({ mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack }),
    [mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack],
  )
` + body

// Replace `const { message } = App.useApp()`
newBody = newBody.replace(/const \{ message \} = App\.useApp\(\)/g, "const message = useToast()")

// Replace `return (` with the wrappers
let replacedReturn = false
newBody = newBody.replace(/return \(/g, (match) => {
  if (replacedReturn) return match;
  replacedReturn = true;
  return `return (
  <EngineProvider>
    <EditorContextProvider value={ctx}>
      <div data-de-root className={className} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--de-color-bg)', color: 'var(--de-color-fg)' }}>`
})

// Replace the final `)` or `  )` that closes the component.
// It's usually the end of the file.
newBody = newBody.replace(/(\n}\n*)$/, 
`      </div>
      <Toaster position="bottom-right" />
    </EditorContextProvider>
  </EngineProvider>
)
}
`)

writeFileSync(destPath, header + newBody)

