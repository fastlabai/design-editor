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

const files = DIRS.flatMap(walk)

for (const file of files) {
  let content = readFileSync(file, 'utf8')
  
  // Depth calculation: src/components/Toolbar.tsx -> depth 2, src/components/panels/X.tsx -> depth 3
  const depth = file.split('/').length - 3 // 'packages/design-editor/src' is 3
  const up = '../'.repeat(depth - 1) || './'
  
  // Add 'use client'
  if (!content.includes("'use client'")) {
    content = `'use client'\n${content}`
  }
  
  // Replace engine
  content = content.replace(/from '@layerhub-io\/react'/g, `from '${up}engine/react'`)
  
  // Replace primitives
  content = content.replace(/from '.*packages\/design-editor\/src\/components\/primitives\/([^']+)'/g, `from '${up}components/primitives/$1'`)
  content = content.replace(/from '.*packages\/design-editor\/src\/hooks\/([^']+)'/g, `from '${up}hooks/$1'`)
  content = content.replace(/from '.*packages\/design-editor\/src'/g, `from '${up}'`)
  
  // Replace AdSpot Context
  content = content.replace(/from '.*context\/EditorProvidersContext'/g, `from '${up}components/EditorContext'`)
  
  // Replace hooks relative paths if needed
  content = content.replace(/from '\.\.\/hooks\//g, `from '${up}hooks/`)
  content = content.replace(/from '\.\.\/components\//g, `from '${up}components/`)
  
  // Remove useTheme
  content = content.replace(/import \{ useTheme \} from '.*hooks\/useTheme'/g, '')
  content = content.replace(/const \{ isDark \} = useTheme\(\)/g, 'const isDark = false')
  content = content.replace(/const \{ isDark \} = useTheme\(\)/g, 'const isDark = false')
  
  writeFileSync(file, content)
  console.log(`Rewrote ${file}`)
}
