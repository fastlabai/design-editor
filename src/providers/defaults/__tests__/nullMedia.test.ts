import { describe, it, expect } from 'vitest'
import { createNullMediaProvider } from '../nullMedia'

describe('nullMediaProvider', () => {
  it('returns empty list', async () => {
    const p = createNullMediaProvider()
    const result = await p.list()
    expect(result.items).toEqual([])
  })

  it('throws on upload', async () => {
    const p = createNullMediaProvider()
    await expect(p.upload(new File([], 'test.png'))).rejects.toThrow(/No mediaProvider configured/)
  })
})
