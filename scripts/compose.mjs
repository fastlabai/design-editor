import { readFileSync, writeFileSync } from 'fs'

const innerPath = 'src/pages/advertiser/studio/DesignEditorInner.tsx'
const destPath = 'packages/design-editor/src/components/DesignEditor.tsx'

let content = readFileSync(innerPath, 'utf8')

// Replace App/message with useToast
content = content.replace(/import \{ App \} from 'antd'/g, "import { useToast } from '../hooks/useToast'")
content = content.replace(/const \{ message \} = App\.useApp\(\)/g, "const message = useToast()")

// Replace local imports with package relative imports
content = content.replace(/from '\.\/components\/panels\//g, "from './panels/")
content = content.replace(/from '\.\/components\//g, "from './")
content = content.replace(/from '\.\/hooks\//g, "from '../hooks/")

// Add EditorContext
content = "import { EditorContextProvider } from './EditorContext'\n" +
          "import { EditorProvider as EngineProvider } from '../engine/react'\n" +
          "import { Toaster } from './primitives/Toast'\n" +
          "import { createNullMediaProvider, createGoogleFontsProvider, createImglyBackgroundRemoval, createLocalStoragePersistence } from '../providers/defaults'\n" +
          "import type { MediaProvider, FontProvider, BackgroundRemovalProvider, PersistenceProvider } from '../providers'\n" +
          "import type { IScene } from '../engine'\n" +
          content

// Replace `export function DesignEditorInner` with `export function DesignEditor`
content = content.replace(/export function DesignEditorInner\(\{ onBack, initialScene \}: \{ onBack: \(\) => void; initialScene\?: any \}\) \{/,
`
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
`
)

// Add context wrapper around the return value
content = content.replace(/return \(/g, 
`return (
  <EngineProvider>
    <EditorContextProvider value={ctx}>
      <div data-de-root className={className} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
`)

// Find the last `)` of the component and close the wrapper
content = content.replace(/(?:\n}\n)$/, 
`      </div>
      <Toaster position="bottom-right" />
    </EditorContextProvider>
  </EngineProvider>
)
}
`)

writeFileSync(destPath, content)
