import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'

function download(blob: Blob | string, filename: string) {
  const a = document.createElement('a')
  const url = typeof blob === 'string' ? `data:text/json;charset=utf-8,${encodeURIComponent(blob)}` : URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  if (typeof blob !== 'string') URL.revokeObjectURL(url)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ height: '100vh' }}>
      <DesignEditor onExport={(blob, format, scene) => {
        const id = Date.now()
        download(blob, `design-${id}.${format}`)
        download(JSON.stringify(scene, null, 2), `design-${id}.json`)
      }} />
    </div>
  </StrictMode>,
)
