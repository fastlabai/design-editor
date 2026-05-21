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
  
  const depth = file.split('/').length - 3
  const up = '../'.repeat(depth - 1) || './'
  
  // Fix primitives imports that were too deep
  content = content.replace(/from '(\.\.\/)+packages\/design-editor\/src\/components\/primitives'/g, `from '${up}components/primitives'`)
  
  // Fix Provider
  content = content.replace(/EditorProvider as EngineProvider/g, 'Provider as EngineProvider')
  
  // Fix useEditorProviders
  content = content.replace(/useEditorProviders/g, 'useEditorContext')
  
  // Replace useTheme
  content = content.replace(/import \{ useTheme \} from '.*hooks\/useTheme'/g, '')
  
  writeFileSync(file, content)
}
