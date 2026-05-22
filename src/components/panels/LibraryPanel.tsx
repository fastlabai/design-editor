'use client'
import * as React from 'react'
import { useEditorContext } from '../EditorContext'
import type { MediaItem } from '../../providers'

export function LibraryPanel() {
  const { mediaProvider } = useEditorContext()
  const [items, setItems] = React.useState<MediaItem[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    const fetchMedia = async () => {
      try {
        setLoading(true)
        const res = await mediaProvider.list({})
        if (mounted) setItems(res.items)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchMedia()
    return () => { mounted = false }
  }, [mediaProvider])

  if (loading) return <div style={{ padding: '1rem' }}>Loading library...</div>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '16px' }}>
      {items.map((item) => (
        <div key={item.id} style={{ cursor: 'pointer', borderRadius: '4px', overflow: 'hidden' }} onClick={() => {
          // Typically we would add the image to the canvas here.
          // The fastlabaiMediaPanel previously dispatched to Redux.
          // Since this is just a panel, we rely on the parent (DesignEditor) or engine to handle additions.
          // For now, this is a simplified view.
        }}>
          <img src={item.thumbnailUrl || item.url} alt={item.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}
