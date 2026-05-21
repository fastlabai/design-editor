import { readFileSync, writeFileSync } from 'fs'
let c = readFileSync('packages/design-editor/src/engine/core/controllers/Guidelines.ts', 'utf8')
c = c.replace(/import \{ HandlerOptions \} from "\.\.\/common\/interfaces"/g, '')
c = c.replace(/props: HandlerOptions/g, 'props: any')
writeFileSync('packages/design-editor/src/engine/core/controllers/Guidelines.ts', c)
