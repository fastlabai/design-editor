'use client'
import React, { useRef, useState, useEffect } from 'react'
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useEditorContext } from '../../components/EditorContext'
import { useToast } from '../../hooks/useToast'
import type { MediaItem } from '../../'

interface Props {
  onUploadFile: (url: string) => void
}

export function UploadPanel({ onUploadFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hov, setHov] = useState(false)
  const { mediaProvider } = useEditorContext()
  const toast = useToast()
  const [items, setItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (!mediaProvider) return
    setIsLoading(true)
    mediaProvider.list({}).then(res => {
      setItems(res.items)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [mediaProvider])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      if (f.size > 50 * 1024 * 1024) {
        toast.error('File size must be less than 50MB')
        return
      }
      if (!mediaProvider) {
        toast.error('Media provider not configured')
        return
      }
      try {
        setIsUploading(true)
        const newItem = await mediaProvider.upload(f)
        setItems(prev => [newItem, ...prev])
        toast.success('Upload complete')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setIsUploading(false)
      }
      e.target.value = ''
    }
  }

  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        disabled={isUploading}
        style={{
          width: '100%', padding: '24px 16px', cursor: isUploading ? 'wait' : 'pointer', borderRadius: 14,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          background: hov
            ? 'color-mix(in srgb, var(--color-primary) 12%, transparent)'
            : 'color-mix(in srgb, var(--color-primary) 6%, transparent)',
          border: `2px dashed ${hov ? 'var(--color-primary)' : 'color-mix(in srgb, var(--color-primary) 30%, transparent)'}`,
          transition: 'all 0.2s',
          outline: 'none',
          flexShrink: 0
        }}
      >
        {isUploading ? (
          <LoadingOutlined style={{ fontSize: 32, color: 'var(--color-primary)' }} />
        ) : (
          <CloudUploadOutlined style={{ fontSize: 32, color: 'var(--color-primary)' }} />
        )}
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--color-text)', fontSize: 13, fontWeight: 600 }}>
            {isUploading ? 'Uploading...' : 'Click to upload'}
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 11, marginTop: 4 }}>
            PNG · JPG · SVG · MP4 · max 50 MB
          </div>
        </div>
      </button>

      {/* Grid of uploaded images */}
      <div style={{ marginTop: 24, flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 12 }}>
          Your Uploads
        </h3>
        
        {isLoading && items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-muted)' }}>
            <LoadingOutlined />
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-muted)', fontSize: 12 }}>
            No uploads yet
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {items.filter(m => m.url).map((item) => (
              <div 
                key={item.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'copy'
                  e.dataTransfer.setData('text/x-adspot-url', item.url)
                  e.dataTransfer.setData('text/x-adspot-type', item.mimeType?.startsWith('video/') ? 'video' : 'image')
                }}
                onClick={() => onUploadFile(item.url)}
                style={{
                  position: 'relative',
                  paddingTop: '100%',
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'grab',
                  background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
                  border: '1px solid var(--color-border)'
                }}
                className="group"
              >
                {item.mimeType?.startsWith('video/') ? (
                  <video src={item.url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={item.url} alt={item.name} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Use</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
