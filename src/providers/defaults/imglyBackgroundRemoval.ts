import type { BackgroundRemovalProvider } from '../backgroundRemoval'


export function createImglyBackgroundRemoval(): BackgroundRemovalProvider {
  return {
    async remove(input, opts) {
      let removeBackground: any
      try {
        // @ts-ignore: Dynamic HTTP imports are not typed in standard TS config
        const mod = await import('https://esm.sh/@imgly/background-removal@1.7.0')
        removeBackground = mod.removeBackground
      } catch (e) {
        console.error(e)
        throw new Error(
          '@imgly/background-removal could not be loaded from CDN. Please check your internet connection or pass a custom backgroundRemovalProvider.',
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
