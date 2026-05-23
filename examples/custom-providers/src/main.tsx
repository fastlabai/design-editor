import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor, type TemplateProvider, type FontProvider } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'

// ── Demo template provider — serves a single custom template ───
const myTemplateProvider: TemplateProvider = {
  async categories() {
    return [
      { id: 'custom-cat', name: 'Custom Templates', order: 1 }
    ]
  },
  async list({ search = '' } = { search: '' }) {
    const q = search.toLowerCase()
    const templates = [
      {
        id: 'tpl-001',
        name: 'My Custom Template',
        categoryId: 'custom-cat',
        scene: {
          id: 'scene-001',
          frame: { width: 800, height: 600 },
          layers: [],
          metadata: {}
        }
      }
    ]
    return {
      items: templates.filter((t) => t.name.toLowerCase().includes(q)),
    }
  }
}

// ── Demo font provider — single custom font ─────────────────────────────────
const myFontProvider: FontProvider = {
  async list() {
    return [
      { family: 'Inter', category: 'sans-serif', weights: [400, 600, 700] },
      { family: 'JetBrains Mono', category: 'monospace', weights: [400] },
    ]
  },
  async load(family) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;600;700&display=swap`
    document.head.appendChild(link)
    await document.fonts.ready
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ height: '100vh' }}>
      <DesignEditor title="Custom FastlabAI Studio" sceneKey="custom-scene-1" templateProvider={myTemplateProvider} fontProvider={myFontProvider} />
    </div>
  </StrictMode>,
)
