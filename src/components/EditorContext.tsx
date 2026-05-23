'use client'
import * as React from 'react'
import type {
  FontProvider,
  BackgroundRemovalProvider,
  PersistenceProvider,
  TemplateProvider,
} from '../providers'

export interface EditorContextValue {
  fontProvider: FontProvider
  backgroundRemovalProvider: BackgroundRemovalProvider
  persistenceProvider: PersistenceProvider
  templateProvider: TemplateProvider
  sceneKey?: string
  onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg', scene: any) => void | Promise<void>
  onBack?: () => void
}

const Ctx = React.createContext<EditorContextValue | null>(null)
export function useEditorContext() {
  const v = React.useContext(Ctx)
  if (!v) throw new Error('useEditorContext must be used inside <DesignEditor>')
  return v
}
export const EditorContextProvider = Ctx.Provider
