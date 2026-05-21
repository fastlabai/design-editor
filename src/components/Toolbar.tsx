'use client'
import React, { CSSProperties, useState, useRef, useEffect, useCallback } from 'react'
import { InputNumber, Modal, Switch } from 'antd'
import { Tooltip, Select, Popover, Button } from './primitives'
import {
  ArrowLeftOutlined, UndoOutlined, RedoOutlined,
  ZoomInOutlined, ZoomOutOutlined, SaveOutlined,
  AppstoreOutlined, SettingOutlined,
} from '@ant-design/icons'
import { HDivider } from './primitives'
import { AD_SIZES } from '../hooks/useCanvasSize'


interface Props {
  editor: any
  zoomPct: number
  size: string
  customOpen: boolean
  setCustomOpen: (v: boolean) => void
  customW: number
  setCustomW: (v: number) => void
  customH: number
  setCustomH: (v: number) => void
  handleSizeChange: (v: string) => void
  handleApplyCustom: () => void
  layerPanelOpen: boolean
  onToggleLayers: () => void
  exporting: boolean
  onExport: () => void
  onBack: () => void
  settings?: any
  onSettings: (patch: Partial<any>) => void
  canvasBg: string
  onBgChange: (color: string) => void
  workspaceBg: string
  onWorkspaceBgChange: (color: string) => void
}

const TOOL_BTN: CSSProperties = {
  width: 34, height: 34, border: 'none', borderRadius: 9, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
  background: 'color-mix(in srgb, var(--color-text) 5%, transparent)', color: 'var(--color-text-muted)',
  transition: 'all 0.15s', outline: 'none',
}

const TOOL_BTN_ACTIVE: CSSProperties = {
  ...TOOL_BTN,
  background: 'color-mix(in srgb, var(--color-primary) 18%, transparent)',
  color: 'var(--color-primary)',
  boxShadow: '0 0 0 1px var(--color-primary)',
}

export function Toolbar({
  editor, zoomPct, size, customOpen, setCustomOpen,
  customW, setCustomW, customH, setCustomH,
  handleSizeChange, handleApplyCustom,
  layerPanelOpen, onToggleLayers, exporting, onExport, onBack,
  settings, onSettings, canvasBg, onBgChange, workspaceBg, onWorkspaceBgChange,
}: Props) {
  const settingsContent = (
    <div style={{ width: 230, display: 'flex', flexDirection: 'column', gap: 14,
      background: 'var(--color-surface)', borderRadius: 12, padding: 16,
      border: '1px solid var(--color-border)', boxShadow: '0 10px 30px var(--shadow-color)' }}>
      <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Editor Settings
      </div>
      {[
        { label: 'Grid overlay', key: 'showGrid' as const },
        { label: 'Snap to grid', key: 'snapGrid' as const },
      ].map(({ label, key }) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{label}</span>
          <Switch
            size="small"
            checked={settings[key]}
            onChange={v => onSettings({ [key]: v })}
            style={{ background: settings[key] ? 'var(--color-primary)' : undefined }}
          />
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 12 }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Panel Rail
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['left', 'right'] as const).map(side => (
            <button
              key={side}
              onClick={() => onSettings({ railSide: side })}
              style={{
                flex: 1, padding: '7px 0', borderRadius: 8, cursor: 'pointer',
                border: settings.railSide === side ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: settings.railSide === side ? 'color-mix(in srgb, var(--color-primary) 18%, transparent)' : 'color-mix(in srgb, var(--color-text) 3%, transparent)',
                color: settings.railSide === side ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontSize: 12, fontWeight: 700, textTransform: 'capitalize',
                outline: 'none',
              }}
            >
              {side}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div 
      className="flex items-center shrink-0 h-[56px] px-[16px] gap-1 z-50 overflow-x-auto whitespace-nowrap scrollbar-hide"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 96%, transparent)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 1px 0 var(--color-border), 0 4px 20px var(--shadow-color)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Back */}
      <button
        onClick={() => Modal.confirm({
          title: 'Leave without saving?',
          content: 'Any unsaved changes will be lost.',
          okText: 'Leave', cancelText: 'Stay', onOk: onBack,
        })}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
          border: '1px solid var(--color-border)',
          borderRadius: 9, padding: '6px 13px', cursor: 'pointer',
          color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 600,
          transition: 'all 0.15s',
          outline: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
          (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in srgb, var(--color-text) 10%, transparent)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
          (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in srgb, var(--color-text) 5%, transparent)';
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 11 }} /> <span className="hidden md:inline">Back</span>
      </button>

      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8, marginRight: 4 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em',
        }}>
          A
        </div>
        <span className="hidden md:inline" style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
          Adspot Design Studio
        </span>
      </div>

      <HDivider />

      {/* Undo / Redo */}
      <Tooltip title="Undo (Ctrl+Z)" placement="bottom">
        <button onClick={() => editor?.history.undo()} style={TOOL_BTN}>
          <UndoOutlined />
        </button>
      </Tooltip>
      <Tooltip title="Redo (Ctrl+Y)" placement="bottom">
        <button onClick={() => editor?.history.redo()} style={TOOL_BTN}>
          <RedoOutlined />
        </button>
      </Tooltip>

      <HDivider />

      {/* Zoom */}
      <Tooltip title="Zoom out" placement="bottom">
        <button onClick={() => editor?.zoom.zoomOut()} style={TOOL_BTN}>
          <ZoomOutOutlined />
        </button>
      </Tooltip>
      <div style={{
        minWidth: 50, textAlign: 'center', fontSize: 12, fontWeight: 700,
        color: 'var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
        borderRadius: 7, padding: '4px 8px', userSelect: 'none',
        border: '1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)',
      }}>
        {zoomPct}%
      </div>
      <Tooltip title="Zoom in" placement="bottom">
        <button onClick={() => editor?.zoom.zoomIn()} style={TOOL_BTN}>
          <ZoomInOutlined />
        </button>
      </Tooltip>

      <HDivider />

      {/* ── BG + Canvas color pickers ────────────────────────────────────── */}
      <ColorPickerBtn
        color={canvasBg}
        onChange={onBgChange}
        label="BG"
        tooltip="Outer workspace background"
        checkerboard
      />
      <ColorPickerBtn
        color={workspaceBg}
        onChange={onWorkspaceBgChange}
        label="Canvas"
        tooltip="Canvas frame interior color"
      />

      <div style={{ flex: 1 }} />

      {/* Canvas size selector */}
      <Popover
        open={customOpen}
        onOpenChange={(open) => !open && setCustomOpen(false)}
        placement="bottom"
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220, padding: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Custom Canvas Size
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <InputNumber
                min={100} max={8000} value={customW}
                onChange={(v) => setCustomW(v ?? 100)}
                style={{ flex: 1 }} addonAfter="px" placeholder="Width"
              />
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>×</span>
              <InputNumber
                min={100} max={8000} value={customH}
                onChange={(v) => setCustomH(v ?? 100)}
                style={{ flex: 1 }} addonAfter="px" placeholder="Height"
              />
            </div>
            <Button variant="primary" size="sm" onClick={handleApplyCustom} style={{ width: '100%' }}>
              Apply
            </Button>
          </div>
        }
      >
        <Select
          value={size}
          onValueChange={handleSizeChange}
          options={AD_SIZES}
          style={{ width: 140 }}
          className="studio-size-select md:w-[200px]"
        />
      </Popover>

      <HDivider />

      {/* Settings */}
      <Popover
        content={settingsContent}
        placement="bottom"
      >
        <button style={TOOL_BTN}><SettingOutlined /></button>
      </Popover>

      {/* Layers toggle */}
      <Tooltip title="Toggle layers panel" placement="bottom">
        <button
          onClick={onToggleLayers}
          style={layerPanelOpen ? TOOL_BTN_ACTIVE : TOOL_BTN}
        >
          <AppstoreOutlined />
        </button>
      </Tooltip>

      <HDivider />

      {/* Save */}
      <button
        onClick={onExport}
        disabled={exporting}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: exporting ? 'color-mix(in srgb, var(--color-primary) 30%, transparent)' : 'var(--color-primary)',
          border: 'none', borderRadius: 10, padding: '8px 20px',
          color: 'var(--color-primary-text)', fontWeight: 700, fontSize: 13,
          cursor: exporting ? 'wait' : 'pointer',
          boxShadow: exporting ? 'none' : '0 0 20px color-mix(in srgb, var(--color-primary) 35%, transparent), 0 4px 12px var(--shadow-color)',
          transition: 'all 0.2s',
          letterSpacing: '-0.01em',
          outline: 'none',
        }}
      >
        <SaveOutlined style={{ fontSize: 13 }} />
        <span className="hidden md:inline">{exporting ? 'Saving…' : 'Save to Library'}</span>
        <span className="md:hidden">{exporting ? '…' : 'Save'}</span>
      </button>
    </div>
  )
}

// ─── Modern Color Picker Button ───────────────────────────────────────────────
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

function ColorPickerBtn({
  color,
  onChange,
  label,
  tooltip,
  checkerboard,
}: {
  color: string
  onChange: (c: string) => void
  label: string
  tooltip: string
  checkerboard?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [hex, setHex] = useState(color)

  // Sync hex when color prop changes externally
  useEffect(() => { setHex(color) }, [color])

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
      {/* ── Gradient hue bar (click to pick a hue quickly) ─────────────── */}
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

      {/* ── Swatch palette ──────────────────────────────────────────────── */}
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
                : '1.5px solid rgba(0,0,0,0.1)',
              background: sw,
              cursor: 'pointer',
              transition: 'transform 0.1s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.18)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>

      {/* ── Hex input + native picker ───────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: color,
            border: '2px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
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
            height: 36,
            border: '1.5px solid var(--color-border)',
            borderRadius: 8,
            padding: '0 10px',
            fontSize: 13,
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
      placement="bottom"
      open={open}
      onOpenChange={setOpen}
    >
      <div style={{ display: 'inline-block' }}>
        <Tooltip title={tooltip} placement="bottom">
          <button
            style={{
              ...TOOL_BTN,
              padding: '4px 8px',
              gap: 6,
              width: 'auto',
              background: open
                ? 'color-mix(in srgb, var(--color-primary) 18%, transparent)'
                : TOOL_BTN.background,
              boxShadow: open ? '0 0 0 1px var(--color-primary)' : 'none',
            }}
          >
            <span style={{
              display: 'inline-block',
              width: 18, height: 18,
              borderRadius: 5,
              border: '1.5px solid rgba(0,0,0,0.15)',
              background: checkerboard
                ? `linear-gradient(${color}, ${color}), repeating-conic-gradient(#bbb 0% 25%, #fff 0% 50%) 0 0 / 8px 8px`
                : color,
              flexShrink: 0,
              boxShadow: '0 1px 5px rgba(0,0,0,0.22)',
              overflow: 'hidden',
            }} />
            <span className="hidden md:inline" style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)' }}>
              {label}
            </span>
          </button>
        </Tooltip>
      </div>
    </Popover>
  )
}

// Minimal HSL→RGB helper for the hue gradient bar clicks
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}
