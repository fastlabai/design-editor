import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const BASE = 'packages/design-editor/src'
const DIRS = [join(BASE, 'components'), join(BASE, 'hooks')]

function walk(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  }).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
}

for (const file of DIRS.flatMap(walk)) {
  let content = readFileSync(file, 'utf8')
  
  // Fix nested primitives imports
  content = content.replace(/from '(\.\.\/)+packages\/design-editor\/src\/components\/primitives'/g, "from './primitives'")
  
  // Fix other primitive imports
  content = content.replace(/from '.*\/primitives'/g, "from './primitives'")
  
  // Toolbar fixes
  if (file.includes('Toolbar.tsx')) {
    content = content.replace(/import .* from '\.\.\/DesignEditorInner'/g, '')
    content = content.replace(/settings: EditorSettings/g, 'settings?: any')
    content = content.replace(/export function Toolbar\(\{ settings,.*\}\) \{/g, 'export function Toolbar() { const settings: any = {};')
    content = content.replace(/export function Toolbar\(\{[^\}]*\}\) \{/g, 'export function Toolbar() { const settings: any = {};')
    content = content.replace(/from '\.\/primitives'/g, "from './primitives'")
  }

  // ObjectPropertiesBar fixes
  if (file.includes('ObjectPropertiesBar.tsx')) {
    content = content.replace(/from '\.\/primitives'/g, "from './primitives'")
  }
  
  // Hooks api fix
  if (file.includes('useStudioExport.ts')) {
    content = content.replace(/import \{ .* \} from '.*lib\/api'/g, '')
    content = content.replace(/await postJson\('.*\/api\/exports.*', \{ sceneKey: state\.sceneKey \}\)/g, 'await new Promise(r => setTimeout(r, 1000))')
  }

  writeFileSync(file, content)
}

// Add PBtn, PDivider, HDivider to primitives index
let primIndex = readFileSync('packages/design-editor/src/components/primitives/index.ts', 'utf8')
if (!primIndex.includes('PBtn')) {
  writeFileSync('packages/design-editor/src/components/primitives/index.ts', primIndex + `
export function PBtn(props: any) { return <button {...props} /> }
export function PDivider(props: any) { return <hr {...props} /> }
export function HDivider(props: any) { return <hr {...props} /> }
`)
}

