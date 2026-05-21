import type { FontProvider, FontDescriptor } from '../fonts'

const GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts'

const CURATED_FONTS: FontDescriptor[] = [
  { family: 'Inter', category: 'sans-serif' },
  { family: 'Roboto', category: 'sans-serif' },
  { family: 'Open Sans', category: 'sans-serif' },
  { family: 'Lato', category: 'sans-serif' },
  { family: 'Montserrat', category: 'sans-serif' },
  { family: 'Playfair Display', category: 'serif' },
  { family: 'Merriweather', category: 'serif' },
  { family: 'JetBrains Mono', category: 'monospace' },
]

export function createGoogleFontsProvider(
  opts: { apiKey?: string } = {},
): FontProvider {
  const loaded = new Set<string>()
  return {
    async list({ search, signal } = {}) {
      if (!opts.apiKey) {
        return CURATED_FONTS.filter((f) =>
          !search || f.family.toLowerCase().includes(search.toLowerCase()),
        )
      }
      const url = `${GOOGLE_FONTS_API}?key=${opts.apiKey}&sort=popularity`
      const res = await fetch(url, { signal })
      const data = await res.json() as { items: any[] }
      return data.items.map((it): FontDescriptor => ({
        family: it.family,
        weights: it.variants.filter((v: string) => /^\d+$/.test(v)).map(Number),
        category: it.category,
      }))
    },
    async load(family) {
      if (loaded.has(family)) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;700&display=swap`
      document.head.appendChild(link)
      await document.fonts.ready
      loaded.add(family)
    },
  }
}
