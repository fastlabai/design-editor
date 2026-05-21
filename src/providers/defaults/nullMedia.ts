import type { MediaProvider } from '../media'

export function createNullMediaProvider(): MediaProvider {
  return {
    async list() { return { items: [] } },
    async upload() {
      throw new Error(
        'No mediaProvider configured. Pass a mediaProvider prop to <DesignEditor /> to enable uploads.',
      )
    },
  }
}
