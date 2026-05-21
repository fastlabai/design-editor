import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

function downloadBlob(blob: Blob) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `design-${Date.now()}.png`
  a.click()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ height: '100vh' }}>
      <DesignEditor onExport={(blob) => downloadBlob(blob)} />
    </div>
  </StrictMode>,
)
