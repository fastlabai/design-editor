'use client'
import React, { useState } from 'react'

interface Props {
  onAddText: (text: string, fontSize: number) => void
}

const PRESETS = [
  { label: 'Add Heading',    displaySize: 22, weight: 800, fontSize: 72 },
  { label: 'Add Subheading', displaySize: 15, weight: 600, fontSize: 48 },
  { label: 'Add Body Text',  displaySize: 13, weight: 400, fontSize: 28 },
] as const

export function TextPanel({ onAddText }: Props) {
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 11, margin: '4px 0 8px', lineHeight: 1.4 }}>
        Click to add text, then double-click on canvas to edit.
      </p>
      {PRESETS.map(({ label, displaySize, weight, fontSize }) => (
        <TextPresetBtn
          key={label}
          label={label}
          size={displaySize}
          weight={weight}
          onClick={() => onAddText(label.replace('Add ', ''), fontSize)}
        />
      ))}
    </div>
  )
}

function TextPresetBtn({ label, size, weight, onClick }: {
  label: string; size: number; weight: number; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
        background: hov
          ? 'color-mix(in srgb, var(--color-primary) 12%, var(--color-surface-2))'
          : 'color-mix(in srgb, var(--color-text) 4%, var(--color-surface-2))',
        border: `1px solid ${hov ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: 10, color: 'var(--color-text)', fontSize: size, fontWeight: weight,
        transition: 'all 0.15s',
        outline: 'none',
      }}
    >
      {label}
    </button>
  )
}
