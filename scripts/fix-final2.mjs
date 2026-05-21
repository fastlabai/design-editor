import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const fixFile = (path, fixer) => {
  try {
    let content = readFileSync(path, 'utf8')
    content = fixer(content)
    writeFileSync(path, content)
  } catch(e) {}
}

// UploadPanel fixes
fixFile('packages/design-editor/src/components/panels/UploadPanel.tsx', c => {
  return c.replace(/const \{ media \} = useEditorContext\(\)/, 'const { mediaProvider } = useEditorContext()')
          .replace(/media\.upload\(/g, 'mediaProvider.upload(')
          .replace(/\(res\)/g, '(res: any)')
})

// Toolbar fixes
fixFile('packages/design-editor/src/components/Toolbar.tsx', c => {
  return c.replace(/EditorSettings/g, 'any')
})

// useStudioExport fixes
fixFile('packages/design-editor/src/hooks/useStudioExport.ts', c => {
  return c.replace(/mediaAPI\.uploadFile\(file\)/g, 'null')
})

// Engine objects duplicate identifiers fix
const objectsDir = 'packages/design-editor/src/engine/objects'
const objectsFiles = readdirSync(objectsDir).filter(f => f.endsWith('.ts'))
for (const file of objectsFiles) {
  fixFile(join(objectsDir, file), c => {
    // Change `class X extends XObject { constructor(options: XOptions) }` to `interface X extends XObject {}`
    return c.replace(/class (\w+) extends \w+ \{\s*constructor\(.*\)\s*\}/g, 'interface $1 {}')
            .replace(/class (\w+) extends \w+ \{[^}]*\}/g, 'interface $1 {}')
  })
}

