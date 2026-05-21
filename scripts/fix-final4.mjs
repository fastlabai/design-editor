import { readFileSync, writeFileSync } from 'fs'

let c = readFileSync('packages/design-editor/src/components/DesignEditor.tsx', 'utf8')

c = c.replace(/editor\.objects\.add/g, 'editor?.objects.add')
c = c.replace(/editor\.scene\.importFromJSON/g, 'editor?.scene.importFromJSON')
c = c.replace(/editor\.objects\.update/g, 'editor?.objects.update')
c = c.replace(/message\.error\(\{.*?\}\)/g, "message.error('Error')")

writeFileSync('packages/design-editor/src/components/DesignEditor.tsx', c)
