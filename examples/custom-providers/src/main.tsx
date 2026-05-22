import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor, type MediaProvider, type FontProvider } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'

// ── Demo media provider — serves a few Unsplash images via the public API ───
const DEMO_IMAGES = [
  { id: '1', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', name: 'circuit board' },
  { id: '2', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800', name: 'laptop' },
  { id: '3', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800', name: 'work desk' },
  { id: '4', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', name: 'office' },
]

const myMediaProvider: MediaProvider = {
  async list({ search = '' } = { search: '' }) {
    const q = search.toLowerCase()
    return {
      items: DEMO_IMAGES.filter((i) => i.name.includes(q)).map((i) => ({
        id: i.id,
        url: i.url,
        thumbnailUrl: i.url,
        name: i.name,
        mimeType: 'image/jpeg',
      })),
    }
  },
  async upload(file) {
    const url = URL.createObjectURL(file)
    return { id: crypto.randomUUID(), url, name: file.name, mimeType: file.type }
  },
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
      <DesignEditor mediaProvider={myMediaProvider} fontProvider={myFontProvider} />
    </div>
  </StrictMode>,
)
