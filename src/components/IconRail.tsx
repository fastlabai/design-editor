'use client'
import React, { useState } from 'react'
import {
  LayoutTemplate, Component, Upload,
  Type, Shapes, Smile
} from 'lucide-react'

export type PanelKey = 'templates' | 'elements' | 'upload' | 'text' | 'shapes' | 'stickers'

const ICONS: { key: PanelKey; icon: React.ReactNode; label: string }[] = [
  { key: 'templates', icon: <LayoutTemplate size={20} />, label: 'Templates' },
  { key: 'elements',  icon: <Component size={20} />,      label: 'Elements'  },
  { key: 'upload',    icon: <Upload size={20} />,         label: 'Upload'    },
  { key: 'text',      icon: <Type size={20} />,           label: 'Text'      },
  { key: 'shapes',    icon: <Shapes size={20} />,         label: 'Shapes'    },
  { key: 'stickers',  icon: <Smile size={20} />,          label: 'Stickers'  },
]

interface Props {
  activePanel: PanelKey | null
  onTogglePanel: (key: PanelKey) => void
}

export function IconRail({ activePanel, onTogglePanel }: Props) {
  return (
    <div 
      className="flex flex-row md:flex-col items-center gap-[3px] px-[10px] py-[4px] md:py-[10px] md:px-0 w-full md:w-[62px] h-[66px] md:h-auto shrink-0 overflow-x-auto md:overflow-visible z-10"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 96%, transparent)',
        borderRight: '1px solid var(--color-border)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: '0 -4px 20px var(--shadow-color)',
      }}
    >
      {ICONS.map(({ key, icon, label }) => (
        <RailButton
          key={key}
          icon={icon}
          label={label}
          active={activePanel === key}
          onClick={() => onTogglePanel(key)}
        />
      ))}
    </div>
  )
}

function RailButton({ icon, label, active, onClick }: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  const [hov, setHov] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex flex-col items-center justify-center shrink-0 border-none rounded-xl cursor-pointer relative outline-none transition-all duration-200"
      style={{
        width: 54, padding: '8px 0', gap: 4,
        background: active
          ? 'color-mix(in srgb, var(--color-primary) 18%, transparent)'
          : hov ? 'color-mix(in srgb, var(--color-text) 5%, transparent)' : 'transparent',
        color: active ? 'var(--color-primary)' : hov ? 'var(--color-text)' : 'var(--color-text-muted)',
        fontSize: 18,
        boxShadow: active
          ? '0 0 0 1px var(--color-primary)'
          : hov ? '0 0 0 1px var(--color-border)' : 'none',
        transform: active ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <span style={{
        fontSize: 17,
        transition: 'filter 0.2s',
      }}>
        {icon}
      </span>
      <span style={{
        fontSize: 8, fontWeight: 700, letterSpacing: '0.06em',
        textTransform: 'uppercase', opacity: active ? 1 : 0.7,
      }}>
        {label}
      </span>
      {/* Active indicator dot */}
      {active && (
        <div 
          className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-[22px] h-[3px] rounded-b-sm md:top-1/2 md:left-auto md:right-[-1px] md:-translate-x-0 md:-translate-y-1/2 md:w-[3px] md:h-[22px] md:rounded-l-sm md:rounded-b-none"
          style={{
            background: 'var(--color-primary)',
          }} 
        />
      )}
    </button>
  )
}

