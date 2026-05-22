import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ height: '100vh' }}>
      <DesignEditor />
    </div>
  </StrictMode>,
)
