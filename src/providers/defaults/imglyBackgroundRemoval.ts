import type { BackgroundRemovalProvider } from '../backgroundRemoval'


export function createImglyBackgroundRemoval(): BackgroundRemovalProvider {
  return {
    async remove(input, opts) {
      let removeBackground: typeof import('@imgly/background-removal').removeBackground
      try {
        const mod = await import('@imgly/background-removal')
        removeBackground = mod.removeBackground
      } catch (e) {
        console.error(e)
        throw new Error(
          '@imgly/background-removal is not installed. Either install it as a peer dependency or pass a custom backgroundRemovalProvider prop.',
        )
      }
      return removeBackground(input, {
        publicPath: 'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/',
        progress: opts?.onProgress
          ? (_key: string, current: number, total: number) => opts.onProgress!(current / total)
          : undefined,
      })
    },
  }
}
