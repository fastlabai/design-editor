'use client'
import * as React from 'react'
import { useEditor } from '../../../engine/react'
import type { DesignTemplate } from '../../../providers/templates'

const cache = new Map<string, string>()
const inFlight = new Map<string, Promise<string>>()

interface UseTemplateThumbnailResult {
  src: string | undefined
  loading: boolean
}

/**
 * Resolves a usable image src for a template thumbnail. If the template has a
 * `thumbnailUrl`, that wins. Otherwise, the scene is rendered via
 * `editor.renderer.toDataURL` once the element scrolls into view, and the
 * result is cached by template id for the lifetime of the page.
 *
 * The third arg is for tests; in real usage we read the editor from context.
 */
export function useTemplateThumbnail(
  template: DesignTemplate,
  ref: React.RefObject<HTMLElement>,
  editorOverride?: { renderer?: { toDataURL: (scene: any, opts: any) => Promise<string> } },
): UseTemplateThumbnailResult {
  const hookEditor = useEditor() as any
  const editor = editorOverride ?? hookEditor

  const [src, setSrc] = React.useState<string | undefined>(() => {
    if (template.thumbnailUrl) return template.thumbnailUrl
    return cache.get(template.id)
  })
  const [loading, setLoading] = React.useState<boolean>(() => !src && !template.thumbnailUrl)

  React.useEffect(() => {
    if (template.thumbnailUrl) {
      setSrc(template.thumbnailUrl)
      setLoading(false)
      return
    }
    const cached = cache.get(template.id)
    if (cached) {
      setSrc(cached)
      setLoading(false)
      return
    }
    if (!ref.current || !editor?.renderer?.toDataURL) return

    let cancelled = false
    const observer = new IntersectionObserver(async (entries) => {
      const visible = entries.some(e => e.isIntersecting)
      if (!visible) return
      observer.disconnect()

      // Deduplicate concurrent renders for the same template
      const existing = inFlight.get(template.id)
      if (existing) {
        setLoading(true)
        try {
          const dataUrl = await existing
          if (!cancelled) { setSrc(dataUrl); setLoading(false) }
        } catch {
          if (!cancelled) setLoading(false)
        }
        return
      }

      setLoading(true)
      const promise = editor.renderer.toDataURL(template.scene, {
        format: 'png',
        quality: 0.85,
        multiplier: 0.5,
        backgroundColor: template.canvasBg ?? '#ffffff',
      })
      inFlight.set(template.id, promise)
      try {
        const dataUrl = await promise
        cache.set(template.id, dataUrl)
        inFlight.delete(template.id)
        if (cancelled) return
        setSrc(dataUrl)
      } catch {
        inFlight.delete(template.id)
        if (!cancelled) setSrc(undefined)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })
    observer.observe(ref.current)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [template.id, template.thumbnailUrl, template.scene, template.canvasBg, editor, ref])

  return { src, loading }
}
