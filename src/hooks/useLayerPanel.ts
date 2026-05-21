'use client'
import { useObjects, useActiveObject } from '../engine/react'

const TYPE_LABELS: Record<string, string> = {
  StaticImage:    'Image',
  BackgroundImage:'Image',
  StaticText:     'Text',
  DynamicText:    'Text',
  StaticVideo:    'Video',
  StaticPath:     'Shape',
  StaticVector:   'Shape',
  Group:          'Group',
}

export interface LayerItem {
  id: string
  type: string
  name: string
  visible: boolean
  children?: LayerItem[]
}

function toLayerItem(obj: any, idx: number): LayerItem {
  const children = Array.isArray(obj.objects)
    ? obj.objects.map((c: any, ci: number) => toLayerItem(c, ci))
    : undefined
  return {
    id: String(obj.id ?? idx),
    type: String(obj.type ?? 'Object'),
    name: obj.name ?? `${TYPE_LABELS[obj.type] ?? 'Object'} ${idx + 1}`,
    visible: obj.visible !== false,
    children,
  }
}

export function useLayerPanel() {
  const objects = (useObjects<any[]>() ?? []) as any[]
  const activeObj = useActiveObject() as any

  const layers: LayerItem[] = [...objects].reverse().map(toLayerItem)
  const activeId = activeObj?.id ? String(activeObj.id) : null

  return { layers, activeId }
}
