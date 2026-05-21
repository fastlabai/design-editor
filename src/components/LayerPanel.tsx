'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  PictureOutlined, FontSizeOutlined, VideoCameraOutlined,
  AppstoreOutlined, CloseOutlined, EyeOutlined, EyeInvisibleOutlined,
  DeleteOutlined, CopyOutlined, FolderOutlined, RightOutlined, DownOutlined,
} from '@ant-design/icons'
import { Tooltip } from './primitives'
import type { LayerItem } from '../hooks/useLayerPanel'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  StaticImage:    <PictureOutlined />,
  BackgroundImage:<PictureOutlined />,
  StaticText:     <FontSizeOutlined />,
  DynamicText:    <FontSizeOutlined />,
  StaticVideo:    <VideoCameraOutlined />,
  StaticPath:     <AppstoreOutlined />,
  StaticVector:   <AppstoreOutlined />,
  Group:          <FolderOutlined />,
}

interface Props {
  layers: LayerItem[]
  activeId: string | null
  editor: any
  onClose: () => void
}

export function LayerPanel({ layers, activeId, editor, onClose }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelect = (id: string, multi: boolean) => {
    if (multi) {
      setSelectedIds(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })
    } else {
      setSelectedIds(new Set([id]))
      editor?.objects.select(id)
    }
  }

  const handleGroup = () => {
    if (selectedIds.size < 2) return
    editor?.objects.group?.([...selectedIds])
    setSelectedIds(new Set())
  }

  return (
    <div 
      className="absolute top-[56px] bottom-[66px] right-0 z-40 w-full md:relative md:top-0 md:bottom-0 md:w-[230px] md:z-auto shrink-0 animate-[panelSlideIn_0.2s_cubic-bezier(0.4,0,0.2,1)]"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 97%, transparent)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderLeft: '1px solid var(--color-border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '-8px 0 40px var(--shadow-color)',
      }}
    >
      {/* Header */}
      <div style={{
        height: 50, flexShrink: 0, display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 8,
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 12%, transparent) 0%, transparent 100%)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ width: 3, height: 16, borderRadius: 2,
          background: 'var(--color-primary)', flexShrink: 0 }} />
        <span style={{
          flex: 1, fontSize: 11, fontWeight: 800, color: 'var(--color-primary)',
          textTransform: 'uppercase', letterSpacing: '0.09em',
        }}>
          Layers
        </span>
        {selectedIds.size >= 2 && (
          <Tooltip title="Group selected layers">
            <button onClick={handleGroup} style={ICON_BTN}>
              <FolderOutlined style={{ fontSize: 12 }} />
            </button>
          </Tooltip>
        )}
        <Tooltip title="Close layers panel">
          <button
            onClick={onClose}
            style={{ ...ICON_BTN, color: 'var(--color-text-muted)' }}
          >
            <CloseOutlined style={{ fontSize: 12 }} />
          </button>
        </Tooltip>
      </div>

      {/* Layer list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {layers.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 12 }}>
            No layers yet.<br />Add content to the canvas.
          </div>
        ) : (
          layers.map((layer) => (
            <LayerRow
              key={layer.id}
              layer={layer}
              isActive={layer.id === activeId}
              isSelected={selectedIds.has(layer.id)}
              depth={0}
              onSelect={(multi) => toggleSelect(layer.id, multi)}
              onToggleVisible={() => editor?.objects.update({ visible: !layer.visible }, layer.id)}
              onDelete={() => editor?.objects.remove(layer.id)}
              onCopy={() => editor?.objects.copyById?.(layer.id) ?? editor?.objects.clone?.()}
              onRename={(name) => editor?.objects.update({ name }, layer.id)}
              editor={editor}
            />
          ))
        )}
      </div>

      <div style={{
        padding: '8px 12px', borderTop: '1px solid var(--color-border)',
        fontSize: 9, color: 'var(--color-text-muted)', lineHeight: 1.5,
      }}>
        Click to select · Shift-click to multi-select · Double-click to rename
      </div>
    </div>
  )
}

function LayerRow({ layer, isActive, isSelected, depth, onSelect, onToggleVisible, onDelete, onCopy, onRename, editor }: {
  layer: LayerItem
  isActive: boolean
  isSelected: boolean
  depth: number
  onSelect: (multi: boolean) => void
  onToggleVisible: () => void
  onDelete: () => void
  onCopy: () => void
  onRename: (name: string) => void
  editor: any
}) {
  const [hov, setHov] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(layer.name)
  const [collapsed, setCollapsed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

  const commitRename = () => {
    const trimmed = editVal.trim()
    if (trimmed && trimmed !== layer.name) onRename(trimmed)
    else setEditVal(layer.name)
    setEditing(false)
  }

  const hasChildren = layer.children && layer.children.length > 0

  return (
    <>
      <div
        onClick={(e) => { if (!editing) onSelect(e.shiftKey) }}
        onDoubleClick={() => { setEditing(true); setEditVal(layer.name) }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: 36, display: 'flex', alignItems: 'center', gap: 6,
          paddingLeft: 12 + depth * 16, paddingRight: 8, cursor: 'pointer',
          background: isSelected
            ? 'color-mix(in srgb, var(--color-primary) 22%, transparent)'
            : isActive ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)' : hov ? 'color-mix(in srgb, var(--color-text) 3%, transparent)' : 'transparent',
          transition: 'all 0.12s',
          borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
          boxShadow: isActive ? 'inset 0 0 20px color-mix(in srgb, var(--color-primary) 6%, transparent)' : 'none',
        }}
      >
        {/* Collapse toggle for groups */}
        {hasChildren ? (
          <span
            onClick={(e) => { e.stopPropagation(); setCollapsed(c => !c) }}
            style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0, cursor: 'pointer' }}
          >
            {collapsed ? <RightOutlined /> : <DownOutlined />}
          </span>
        ) : <span style={{ width: 10 }} />}

        <span style={{ fontSize: 12, color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)', flexShrink: 0 }}>
          {TYPE_ICONS[layer.type] ?? <AppstoreOutlined />}
        </span>

        {editing ? (
          <input
            ref={inputRef}
            value={editVal}
            onChange={e => setEditVal(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setEditVal(layer.name); setEditing(false) } }}
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-primary)', borderRadius: 4,
              color: 'var(--color-text)', fontSize: 11, padding: '2px 6px', outline: 'none',
            }}
          />
        ) : (
          <span style={{
            flex: 1, fontSize: 11,
            color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            opacity: layer.visible ? 1 : 0.45,
          }}>
            {layer.name}
          </span>
        )}

        {(hov || isActive) && !editing && (
          <div style={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Tooltip title={layer.visible ? 'Hide' : 'Show'}>
              <button onClick={(e) => { e.stopPropagation(); onToggleVisible() }} style={ICON_BTN}>
                {layer.visible ? <EyeOutlined style={{ fontSize: 10 }} /> : <EyeInvisibleOutlined style={{ fontSize: 10 }} />}
              </button>
            </Tooltip>
            <Tooltip title="Duplicate">
              <button onClick={(e) => { e.stopPropagation(); onCopy() }} style={ICON_BTN}>
                <CopyOutlined style={{ fontSize: 10 }} />
              </button>
            </Tooltip>
            <Tooltip title="Delete">
              <button onClick={(e) => { e.stopPropagation(); onDelete() }} style={{ ...ICON_BTN, color: 'var(--color-danger)' }}>
                <DeleteOutlined style={{ fontSize: 10 }} />
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Nested children (for Group type) */}
      {hasChildren && !collapsed && layer.children!.map(child => (
        <LayerRow
          key={child.id}
          layer={child}
          isActive={false}
          isSelected={false}
          depth={depth + 1}
          onSelect={() => editor?.objects.select(child.id)}
          onToggleVisible={() => editor?.objects.update({ visible: !child.visible }, child.id)}
          onDelete={() => editor?.objects.remove(child.id)}
          onCopy={() => editor?.objects.copyById?.(child.id) ?? editor?.objects.clone?.()}
          onRename={(name) => editor?.objects.update({ name }, child.id)}
          editor={editor}
        />
      ))}
    </>
  )
}

const ICON_BTN: React.CSSProperties = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  color: 'var(--color-text-muted)', padding: 3, borderRadius: 4,
  display: 'flex', alignItems: 'center',
}
