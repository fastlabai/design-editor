'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { App } from 'antd'
import { Tooltip, Popover } from './primitives'
import {
  ScissorOutlined, CopyOutlined, DeleteOutlined,
  VerticalAlignTopOutlined, VerticalAlignBottomOutlined,
  SwapOutlined, BoldOutlined, ItalicOutlined,
  AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined,
} from '@ant-design/icons'
import { PDivider, PBtn } from './primitives'

interface Props {
  activeObj: any
  editor: any
  removingBg: boolean
  onRemoveBg: () => void
}

export function ObjectPropertiesBar({ activeObj, editor, removingBg, onRemoveBg }: Props) {
  const type    = activeObj?.type as string | undefined
  const isImage = type === 'StaticImage' || type === 'BackgroundImage'
  const isText  = type === 'StaticText'  || type === 'DynamicText'
  const isShape = type === 'StaticPath'  || type === 'StaticVector'

  const [opacity, setOpacity] = useState(() => Math.round((activeObj?.opacity ?? 1) * 100))
  useEffect(() => {
    setOpacity(Math.round((activeObj?.opacity ?? 1) * 100))
  }, [activeObj?.id])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Drag state — null means use default centered position
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  const onDragStart = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'SELECT') return
    e.preventDefault()
    const bar = (e.currentTarget as HTMLDivElement).parentElement!
    const rect = bar.getBoundingClientRect()
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: rect.left, origY: rect.top }
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      setPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy })
    }
    const onUp = () => { dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  const label = isImage ? 'Image' : isText ? 'Text' : isShape ? 'Shape' : 'Object'

  const posStyle: React.CSSProperties = isMobile
    ? { position: 'absolute', bottom: 12, left: 12, right: 12, transform: 'none', width: 'auto' }
    : pos
      ? { position: 'absolute', left: pos.x, top: pos.y, transform: 'none', bottom: 'auto' }
      : { position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }

  return (
    <div 
      className="scrollbar-hide"
      style={{
        ...posStyle,
        zIndex: 30, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px',
        background: 'color-mix(in srgb, var(--color-surface) 94%, transparent)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--color-border)',
        borderRadius: 14,
        boxShadow: '0 8px 32px var(--shadow-color)',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
      }}
    >
      {/* Drag handle */}
      <div
        onMouseDown={onDragStart}
        style={{ cursor: 'grab', padding: '0 4px', color: 'var(--color-text-muted)', fontSize: 12, flexShrink: 0, userSelect: 'none' }}
        title="Drag to move"
      >⠿</div>
      {/* Type badge */}
      <div style={{
        background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', borderRadius: 6, padding: '3px 9px',
        fontSize: 10, fontWeight: 800, color: 'var(--color-primary)',
        textTransform: 'uppercase', letterSpacing: '0.07em', flexShrink: 0,
      }}>
        {label}
      </div>

      <PDivider />

      {/* Opacity — all types */}
      <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>Opacity</span>
      <input
        type="range" min={0} max={100} value={opacity}
        style={{ width: 72, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
        onChange={(e) => {
          const v = Number(e.target.value)
          setOpacity(v)
          editor?.objects.update({ opacity: v / 100 })
        }}
      />
      <span style={{ fontSize: 11, color: 'var(--color-text)', minWidth: 30, textAlign: 'right' }}>
        {opacity}%
      </span>

      {/* ── Image controls ─────────────────────────── */}
      {isImage && (
        <>
          <PDivider />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <PBtn title="Flip horizontal" onClick={() => editor?.objects.update({ flipX: !(activeObj?.flipX) })}>
                <SwapOutlined />
              </PBtn>
              <PBtn title="Flip vertical" onClick={() => editor?.objects.update({ flipY: !(activeObj?.flipY) })}>
                <SwapOutlined style={{ transform: 'rotate(90deg)' }} />
              </PBtn>
              <PBtn
                title="Remove image background (runs in-browser)"
                onClick={onRemoveBg}
                style={{
                  fontSize: 11, fontWeight: 600, padding: '0 10px',
                  background: removingBg ? 'color-mix(in srgb, var(--color-text) 5%, transparent)' : 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                  border: `1px solid ${removingBg ? 'var(--color-border)' : 'var(--color-primary)'}`,
                  color: removingBg ? 'var(--color-text-muted)' : 'var(--color-primary)',
                }}
              >
                <ScissorOutlined style={{ fontSize: 12 }} />
                {removingBg ? 'Removing…' : 'Remove BG'}
              </PBtn>
            </div>
            
            {/* Shape Image Specific Controls: Scaling/Cropping Simulation */}
            {activeObj?.clipPath && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0 }}>Img Scale</span>
                <input
                  type="range" min={0.1} max={3} step={0.1}
                  defaultValue={activeObj?.scaleX || 1}
                  style={{ width: 60, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    // In a standard setup, scaling the object scales the clippath too. 
                    // Layerhub/Fabric natively requires editing the inner image pattern for true "cropping inside clipPath",
                    // but we can scale the object container as an approximation of resizing.
                    editor?.objects.update({ scaleX: v, scaleY: v })
                  }}
                />
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0 }}>Crop X/Y</span>
                <input
                  type="range" min={-100} max={100} step={1}
                  defaultValue={0}
                  style={{ width: 40, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                  onChange={(e) => {
                    // Simulating crop offset by adjusting image pan if supported, or just letting the user move it manually
                    // Real cropping requires entering a crop mode in Fabric JS.
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Text controls ──────────────────────────── */}
      {isText && (
        <>
          <PDivider />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>Font</span>
          <select
            key={activeObj?.id + '-ff'}
            defaultValue={activeObj?.fontFamily ?? 'sans-serif'}
            style={{
              background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 6,
              color: 'var(--color-text)', fontSize: 11, padding: '4px 6px', maxWidth: 120, cursor: 'pointer',
              outline: 'none',
            }}
            onChange={(e) => editor?.objects.update({ fontFamily: e.target.value })}
          >
            {['sans-serif','serif','monospace','Roboto','Open Sans','Montserrat','Lato','Oswald',
              'Playfair Display','Pacifico','Lobster','Dancing Script','Bebas Neue','Anton'].map(f =>
              <option key={f} value={f} style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>{f}</option>
            )}
          </select>
          <PDivider />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>Size</span>
          <input
            key={activeObj?.id + '-fs'}
            type="number" min={6} max={500}
            defaultValue={activeObj?.fontSize ?? 32}
            style={{
              width: 52, background: 'var(--color-bg)', border: '1px solid var(--color-border)',
              borderRadius: 6, color: 'var(--color-text)', fontSize: 12,
              padding: '4px 6px', textAlign: 'center', outline: 'none',
            }}
            onChange={(e) => editor?.objects.update({ fontSize: Number(e.target.value) })}
          />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>Color</span>
          <PropertyColorPicker
            color={typeof activeObj?.fill === 'string' ? activeObj.fill : '#000000'}
            onChange={(c) => editor?.objects.update({ fill: c })}
            tooltip="Text color"
            activeObjId={activeObj?.id}
          />
          <PDivider />
          <PBtn
            title="Bold"
            onClick={() => editor?.objects.update({ fontWeight: activeObj?.fontWeight === 'bold' ? 'normal' : 'bold' })}
            active={activeObj?.fontWeight === 'bold'}
          >
            <BoldOutlined />
          </PBtn>
          <PBtn
            title="Italic"
            onClick={() => editor?.objects.update({ fontStyle: activeObj?.fontStyle === 'italic' ? 'normal' : 'italic' })}
            active={activeObj?.fontStyle === 'italic'}
          >
            <ItalicOutlined />
          </PBtn>
          <PDivider />
          <PBtn title="Align left"   onClick={() => editor?.objects.update({ textAlign: 'left' })}   active={activeObj?.textAlign === 'left'}>
            <AlignLeftOutlined />
          </PBtn>
          <PBtn title="Align center" onClick={() => editor?.objects.update({ textAlign: 'center' })} active={activeObj?.textAlign === 'center'}>
            <AlignCenterOutlined />
          </PBtn>
          <PBtn title="Align right"  onClick={() => editor?.objects.update({ textAlign: 'right' })}  active={activeObj?.textAlign === 'right'}>
            <AlignRightOutlined />
          </PBtn>
        </>
      )}

      {/* ── Shape controls ─────────────────────────── */}
      {(isShape || (!isImage && !isText)) && (
        <>
          <PDivider />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>Fill</span>
          <PropertyColorPicker
            color={typeof activeObj?.fill === 'string' ? activeObj.fill : '#7c3aed'}
            onChange={(c) => editor?.objects.update({ fill: c })}
            tooltip="Shape fill color"
            activeObjId={activeObj?.id}
          />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>Stroke</span>
          <PropertyColorPicker
            color={typeof activeObj?.stroke === 'string' && activeObj.stroke ? activeObj.stroke : '#ffffff'}
            onChange={(c) => editor?.objects.update({ stroke: c })}
            tooltip="Shape stroke color"
            activeObjId={activeObj?.id}
          />
          <input
            key={activeObj?.id + '-sw'}
            type="number" min={0} max={40}
            defaultValue={activeObj?.strokeWidth ?? 0}
            style={{
              width: 44, background: 'var(--color-bg)', border: '1px solid var(--color-border)',
              borderRadius: 6, color: 'var(--color-text)', fontSize: 12,
              padding: '4px 6px', textAlign: 'center', outline: 'none',
            }}
            onChange={(e) => editor?.objects.update({ strokeWidth: Number(e.target.value) })}
          />
        </>
      )}

      {/* ── Z-order + duplicate + delete — all types ── */}
      <PDivider />
      <PBtn title="Bring forward" onClick={() => editor?.objects.bringForward()}>
        <VerticalAlignTopOutlined />
      </PBtn>
      <PBtn title="Send backward" onClick={() => editor?.objects.sendBackwards()}>
        <VerticalAlignBottomOutlined />
      </PBtn>
      <PDivider />
      <PBtn title="Duplicate" onClick={() => editor?.objects.clone()}>
        <CopyOutlined />
      </PBtn>
      <PBtn title="Delete (Del)" onClick={() => editor?.objects.remove()} danger>
        <DeleteOutlined />
      </PBtn>
    </div>
  )
}

// ─── Modern Property Color Picker ───────────────────────────────────────────────
const SWATCHES = [
  // Row 1 — Neutrals
  '#ffffff', '#f5f5f5', '#e0e0e0', '#9e9e9e', '#616161', '#212121', '#000000',
  // Row 2 — Warm
  '#ffebee', '#ef5350', '#e53935', '#c62828', '#ff7043', '#ff8f00', '#f9a825',
  // Row 3 — Cool
  '#e8f5e9', '#66bb6a', '#2e7d32', '#26c6da', '#0288d1', '#1565c0', '#7b1fa2',
  // Row 4 — Vibrant
  '#f06292', '#ba68c8', '#7986cb', '#4dd0e1', '#4db6ac', '#aed581', '#fff176',
  // Row 5 — Pastels
  '#fce4ec', '#f3e5f5', '#e8eaf6', '#e1f5fe', '#e0f2f1', '#f1f8e9', '#fffde7',
]

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

interface PropertyColorPickerProps {
  color: string
  onChange: (color: string) => void
  tooltip: string
  activeObjId: string
}

function PropertyColorPicker({
  color,
  onChange,
  tooltip,
  activeObjId,
}: PropertyColorPickerProps) {
  const [hex, setHex] = useState(color)

  // Sync hex when color prop or active object changes
  useEffect(() => {
    setHex(color)
  }, [color, activeObjId])

  const commitHex = useCallback((val: string) => {
    const clean = val.startsWith('#') ? val : `#${val}`
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      onChange(clean)
      setHex(clean)
    }
  }, [onChange])

  const pickerContent = (
    <div
      style={{
        width: 220,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '4px 2px',
      }}
    >
      {/* Hue gradient bar */}
      <div
        style={{
          height: 10, borderRadius: 6,
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
          cursor: 'crosshair',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const pct = (e.clientX - rect.left) / rect.width
          const hue = Math.round(pct * 360)
          const hex6 = `#${[0,8,16].map(s => {
            const c = Math.round(hslToRgb(hue / 360, 1, 0.5)[s / 8])
            return c.toString(16).padStart(2, '0')
          }).join('')}`
          onChange(hex6)
          setHex(hex6)
        }}
      />

      {/* Swatches Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 6,
      }}>
        {SWATCHES.map(sw => (
          <button
            key={sw}
            title={sw}
            onClick={() => { onChange(sw); setHex(sw) }}
            style={{
              width: '100%', aspectRatio: '1/1',
              borderRadius: 6,
              border: color.toLowerCase() === sw.toLowerCase()
                ? '2px solid var(--color-primary)'
                : '1px solid rgba(0,0,0,0.12)',
              background: sw,
              cursor: 'pointer',
              transition: 'transform 0.1s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>

      {/* Hex + picker field */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: color,
            border: '1.5px solid var(--color-border)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            overflow: 'hidden',
          }} />
          <input
            type="color"
            value={color}
            onChange={e => { onChange(e.target.value); setHex(e.target.value) }}
            style={{
              position: 'absolute', inset: 0, opacity: 0,
              width: '100%', height: '100%', cursor: 'pointer', padding: 0, border: 'none',
            }}
          />
        </div>
        <input
          value={hex}
          onChange={e => setHex(e.target.value)}
          onBlur={e => commitHex(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && commitHex((e.target as HTMLInputElement).value)}
          maxLength={7}
          spellCheck={false}
          style={{
            flex: 1,
            height: 34,
            border: '1.5px solid var(--color-border)',
            borderRadius: 8,
            padding: '0 8px',
            fontSize: 12,
            fontFamily: 'monospace',
            fontWeight: 600,
            letterSpacing: '0.04em',
            background: 'color-mix(in srgb, var(--color-text) 4%, var(--color-surface))',
            color: 'var(--color-text)',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
          onBlurCapture={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>
    </div>
  )

  return (
    <Popover
      content={pickerContent}
      placement="top"
    >
      <Tooltip title={tooltip} placement="top">
        <button
          style={{
            height: 30,
            width: 38,
            padding: 3,
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.15s ease',
            outline: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-text) 30%, var(--color-border))'
            e.currentTarget.style.background = 'color-mix(in srgb, var(--color-text) 4%, var(--color-bg))'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.background = 'var(--color-bg)'
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: 5,
            border: '1px solid rgba(0,0,0,0.12)',
            background: color,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
          }} />
        </button>
      </Tooltip>
    </Popover>
  )
}
