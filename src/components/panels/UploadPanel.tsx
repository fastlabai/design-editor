'use client'
import React, { useRef, useState } from 'react'
import { CloudUpload, Loader2, Trash2 } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import { useLocalMedia } from '../../hooks/useLocalMedia'

interface Props {
  onUploadFile: (url: string) => void
}

export function UploadPanel({ onUploadFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hov, setHov] = useState(false)
  const toast = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const { media, loading, addMedia, removeMedia } = useLocalMedia()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB')
      return
    }
    try {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = async () => {
        const url = reader.result as string
        await addMedia(url)
        // Note: we just add to the local gallery, user can click it to add to canvas.
        // Wait, for best UX, we should also automatically add it to canvas when uploaded:
        onUploadFile(url)
        toast.success('Upload complete')
        setIsUploading(false)
      }
      reader.onerror = () => {
        toast.error('Failed to read file')
        setIsUploading(false)
      }
      reader.readAsDataURL(f)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
      setIsUploading(false)
    } finally {
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
          <Loader2 size={32} color="var(--color-primary)" className="animate-spin" />
        ) : (
          <CloudUpload size={32} color="var(--color-primary)" />
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

      <div style={{ marginTop: 24, flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <Loader2 className="animate-spin" size={24} color="var(--color-text-muted)" />
          </div>
        ) : media.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-muted)', fontSize: 12 }}>
            Uploaded files will appear here
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {media.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  position: 'relative', 
                  aspectRatio: '1', 
                  borderRadius: 8, 
                  overflow: 'hidden',
                  background: 'var(--de-color-bg-alt)',
                  cursor: 'pointer',
                  border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)'
                }}
                className="group"
              >
                {/* Image */}
                <img 
                  src={item.url} 
                  alt="Upload" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onClick={() => onUploadFile(item.url)}
                />
                
                {/* Delete button (shows on hover via CSS group logic usually, but here we can just use inline state or a simple hover trick. We'll add a simple button) */}
                <button
                  onClick={(e) => { e.stopPropagation(); removeMedia(item.id) }}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    borderRadius: 4,
                    color: '#fff',
                    padding: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Remove from uploads"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
