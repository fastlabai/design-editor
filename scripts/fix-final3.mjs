import { readFileSync, writeFileSync } from 'fs'

const fixFile = (path, fixer) => {
  try {
    let content = readFileSync(path, 'utf8')
    content = fixer(content)
    writeFileSync(path, content)
  } catch(e) {}
}

fixFile('packages/design-editor/src/components/DesignEditor.tsx', c => {
  return c
    .replace(/import \{ CanvasArea \} from '\.\/CanvasArea'/g, "import { Canvas as CanvasArea } from './Canvas'")
    .replace(/import \{ EditorProvider as EngineProvider \} from '\.\.\/engine\/react'/g, "import { Provider as EngineProvider } from '../engine/react'")
    .replace(/message\.loading\(\{.*\}\)/g, "message.info('Removing background...')")
    .replace(/message\.(success|error)\(\{ content: `(.*?)`,.*?\}\)/g, "message.$1(`$2`)")
    .replace(/message\.(success|error)\(\{ content: '(.*?)',.*?\}\)/g, "message.$1('$2')")
    .replace(/addImageToCanvas\(url, undefined, undefined\)/g, 'addImageToCanvas(url)')
    .replace(/<LibraryPanel\s+onAddMedia=\{[^\}]+\}\s*\/>/g, '<LibraryPanel />')
    .replace(/editor\.frame\.resize/g, 'editor?.frame?.resize')
    .replace(/editor\.frame\.options/g, 'editor?.frame?.options')
    .replace(/onBack\=\{onBack\}/g, "onBack={onBack || (() => {})}")
})

fixFile('packages/design-editor/src/components/panels/FontsPanel.tsx', c => c.replace(/from '\.\/primitives'/g, "from '../primitives'").replace(/\(e\) =>/g, '(e: any) =>'))
fixFile('packages/design-editor/src/components/panels/ShapesPanel.tsx', c => c.replace(/from '\.\/primitives'/g, "from '../primitives'"))
fixFile('packages/design-editor/src/components/panels/StickersPanel.tsx', c => c.replace(/from '\.\/primitives'/g, "from '../primitives'"))

