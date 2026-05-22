import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignEditor } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'
import type { MediaProvider, MediaItem } from '@fastlabai/design-editor'

// ── IndexedDB Persistent Cache Wrapper ────────────────────────────────────
const DB_NAME = 'fastlabai_playground_db'
const STORE_NAME = 'media'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE_NAME)) {
        req.result.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function saveMedia(item: Omit<MediaItem, 'url'> & { file: File }) {
  const db = await openDB()
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put(item)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

async function loadMedia(): Promise<MediaItem[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).getAll()
    req.onsuccess = () => {
      const items = req.result.map((row: any) => ({
        id: row.id,
        name: row.name,
        mimeType: row.mimeType,
        url: URL.createObjectURL(row.file)
      })).sort((a, b) => Number(b.id) - Number(a.id))
      resolve(items)
    }
    req.onerror = () => reject(req.error)
  })
}

const mockMediaProvider: MediaProvider = {
  list: async () => {
    const items = await loadMedia()
    return { items }
  },
  upload: async (file: File) => {
    // 1. Memory (fast preview)
    const url = URL.createObjectURL(file)
    const item: MediaItem = { id: Date.now().toString(), url, name: file.name, mimeType: file.type }
    
    // 2. IndexedDB (persistent cache)
    await saveMedia({ id: item.id, name: item.name, mimeType: item.mimeType, file })

    // 3. Cloud (Stub for Host Application)
    // await myCloudAPI.upload(file)
    // item.url = 'https://mycdn.com/' + file.name

    return item
  }
}

function download(data: Blob | string, filename: string) {
  const blob = typeof data === 'string' ? new Blob([data], { type: 'application/json' }) : data
  const a = document.createElement('a')
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ height: '100vh' }}>
      <DesignEditor 
        mediaProvider={mockMediaProvider}
        onExport={(blob, format, scene) => {
          const id = Date.now()
          download(blob, `design-${id}.${format}`)
          download(JSON.stringify(scene, null, 2), `design-${id}.json`)
        }} 
      />
    </div>
  </StrictMode>,
)
