'use client'
import { useEffect, useRef, useState } from 'react'

export const AUTOSAVE_KEY = 'design_autosave'

export function useAutoSave(editor: any, canvasBg: string, workspaceBg: string) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // Setup beforeunload to prevent accidental exit
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  // Track fabric.js changes
  useEffect(() => {
    if (!editor) return
    const canvas = (editor.canvas as any)?.canvas
    if (!canvas) return
    const schedule = () => {
      setHasUnsavedChanges(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        try {
          const payload = {
            scene: editor.scene.exportToJSON(),
            canvasBg,
            workspaceBg
          }
          localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(payload))
        } catch {}
      }, 1500)
    }
    canvas.on('object:modified', schedule)
    canvas.on('object:added',    schedule)
    canvas.on('object:removed',  schedule)
    return () => {
      canvas.off('object:modified', schedule)
      canvas.off('object:added',    schedule)
      canvas.off('object:removed',  schedule)
      clearTimeout(timerRef.current)
    }
  }, [editor, canvasBg, workspaceBg])

  // Track background changes explicitly
  useEffect(() => {
    if (!editor) return
    setHasUnsavedChanges(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      try {
        const payload = {
          scene: editor.scene.exportToJSON(),
          canvasBg,
          workspaceBg
        }
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(payload))
      } catch {}
    }, 1500)
  }, [canvasBg, workspaceBg, editor])

  return { hasUnsavedChanges, setHasUnsavedChanges }
}

export function loadAutosave(): any | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearAutosave() {
  localStorage.removeItem(AUTOSAVE_KEY)
}
