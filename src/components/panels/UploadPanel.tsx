'use client'
import React, { useRef, useState } from 'react'
import { CloudUpload, Loader2 } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

interface Props {
  onUploadFile: (url: string) => void
}

export function UploadPanel({ onUploadFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hov, setHov] = useState(false)
  const toast = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB')
      return
    }
    try {
      setIsUploading(true)
      const url = URL.createObjectURL(f)
      onUploadFile(url)
      toast.success('Upload complete')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
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
        <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-muted)', fontSize: 12 }}>
          Uploaded files are added directly to the canvas.
        </div>
      </div>
    </div>
  )
}
