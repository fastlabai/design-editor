'use client'
import React, { useState, useRef } from 'react'
import { message } from 'antd'
import { Input } from '../primitives'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'

const GOOGLE_FONTS = [
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Source Sans Pro',
  'Raleway', 'PT Sans', 'Merriweather', 'Nunito', 'Playfair Display', 'Ubuntu',
  'Poppins', 'Muli', 'PT Serif', 'Josefin Sans', 'Fira Sans', 'Noto Sans',
  'Dosis', 'Quicksand', 'Cabin', 'Varela Round', 'Lobster', 'Pacifico',
  'Dancing Script', 'Comfortaa', 'Righteous', 'Satisfy', 'Abril Fatface',
  'Bebas Neue', 'Anton', 'Permanent Marker',
]

const loaded = new Set<string>()

function loadGoogleFont(family: string) {
  if (loaded.has(family)) return
  loaded.add(family)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`
  document.head.appendChild(link)
}

interface Props {
  onApplyFont: (fontFamily: string) => void
}

export function FontsPanel({ onApplyFont }: Props) {
  const [search, setSearch] = useState('')
  const [customFonts, setCustomFonts] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = GOOGLE_FONTS.filter(f => f.toLowerCase().includes(search.toLowerCase()))

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ')
    const url = URL.createObjectURL(file)
    const font = new FontFace(name, `url(${url})`)
    font.load().then(f => {
      document.fonts.add(f)
      setCustomFonts(prev => [name, ...prev])
      message.success(`Font "${name}" loaded`)
    }).catch(() => message.error('Failed to load font'))
    e.target.value = ''
  }

  const FontTile = ({ name, isCustom }: { name: string; isCustom?: boolean }) => {
    if (!isCustom) loadGoogleFont(name)
    return (
      <div
        onClick={() => onApplyFont(name)}
        style={{
          padding: '10px 12px', cursor: 'pointer', borderRadius: 8,
          border: '1px solid var(--color-border)', marginBottom: 6,
          background: 'color-mix(in srgb, var(--color-text) 3%, var(--color-surface-2))',
          transition: 'all 0.15s',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary)';
          (e.currentTarget as HTMLDivElement).style.background = 'color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-2))';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)';
          (e.currentTarget as HTMLDivElement).style.background = 'color-mix(in srgb, var(--color-text) 3%, var(--color-surface-2))';
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600 }}>{name}</span>
        <span style={{ fontFamily: `'${name}', sans-serif`, fontSize: 18, color: 'var(--color-text)', lineHeight: 1.2 }}>
          Aa Bb Cc
        </span>
      </div>
    )
  }

  return (
    <div style={{ padding: '10px 10px 0' }}>
      <Input
        placeholder="Search fonts…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10, borderRadius: 8 }}
      />
      <button
        onClick={() => fileRef.current?.click()}
        style={{
          width: '100%', padding: '8px', marginBottom: 10,
          background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
          border: '1px dashed color-mix(in srgb, var(--color-primary) 35%, transparent)',
          borderRadius: 8, color: 'var(--color-primary)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontSize: 12, fontWeight: 600,
          outline: 'none',
        }}
      >
        <UploadOutlined /> Upload Custom Font (.ttf / .otf / .woff)
      </button>
      <input ref={fileRef} type="file" accept=".ttf,.otf,.woff,.woff2" style={{ display: 'none' }} onChange={handleUpload} />

      {customFonts.length > 0 && (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Custom</div>
          {customFonts.map(f => <FontTile key={f} name={f} isCustom />)}
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '10px 0 6px' }}>Google Fonts</div>
        </>
      )}

      {filtered.map(f => <FontTile key={f} name={f} />)}
    </div>
  )
}
