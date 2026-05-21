/** Describes a font family available to the editor. */
export interface FontDescriptor {
  family: string
  weights?: number[]
  styles?: ('normal' | 'italic')[]
  category?: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace'
  previewUrl?: string
}

/**
 * Plug in your own font source. The editor calls `list` to populate the Fonts
 * panel and `load` when the user selects a font (the provider is responsible
 * for injecting the @font-face declaration or stylesheet).
 */
export interface FontProvider {
  /** Return the list of available fonts, optionally filtered by search. */
  list(opts?: { search?: string; signal?: AbortSignal }): Promise<FontDescriptor[]>
  /** Load a font family (and optional weight/style) so it can be rendered on canvas. */
  load(family: string, opts?: { weight?: number; style?: string }): Promise<void>
}
