import { readFileSync, writeFileSync } from 'fs'

const fixFile = (path, fixer) => {
  try {
    let content = readFileSync(path, 'utf8')
    content = fixer(content)
    writeFileSync(path, content)
  } catch(e) {}
}

fixFile('packages/design-editor/src/components/panels/FontsPanel.tsx', c => c.replace(/from '\.\/primitives'/g, "from '../primitives'").replace(/\(e\) =>/g, '(e: any) =>'))
fixFile('packages/design-editor/src/components/panels/ShapesPanel.tsx', c => c.replace(/from '\.\/primitives'/g, "from '../primitives'"))
fixFile('packages/design-editor/src/components/panels/StickersPanel.tsx', c => c.replace(/from '\.\/primitives'/g, "from '../primitives'"))

fixFile('packages/design-editor/src/components/panels/UploadPanel.tsx', c => 
  c.replace(/const \{ media \}/g, 'const { mediaProvider }')
   .replace(/media\.upload/g, 'mediaProvider.upload')
   .replace(/\(res\)/g, '(res: any)')
)

fixFile('packages/design-editor/src/components/Toolbar.tsx', c => c.replace(/settings: EditorSettings/g, 'settings?: any'))

fixFile('packages/design-editor/src/hooks/useStudioExport.ts', c => 
  c.replace(/mediaAPI\.uploadFile\(file\)/g, 'null')
)

