import { describe, it, expect } from 'vitest'
import { createGoogleFontsProvider } from '../googleFonts'

describe('googleFontsProvider', () => {
  it('returns curated fonts when no API key is provided', async () => {
    const p = createGoogleFontsProvider()
    const fonts = await p.list()
    expect(fonts.length).toBeGreaterThan(0)
    expect(fonts.some(f => f.family === 'Inter')).toBe(true)
  })

  it('filters curated fonts by search term', async () => {
    const p = createGoogleFontsProvider()
    const fonts = await p.list({ search: 'robo' })
    expect(fonts.length).toBe(1)
    expect(fonts[0].family).toBe('Roboto')
  })
})
