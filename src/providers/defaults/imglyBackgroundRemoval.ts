import type { BackgroundRemovalProvider } from '../backgroundRemoval'
import { importOptionalPeer } from '../../internal/dynamicImport'

export function createImglyBackgroundRemoval(): BackgroundRemovalProvider {
  return {
    async remove(input, opts) {
      let removeBackground: typeof import('@imgly/background-removal').removeBackground
      try {
        ;({ removeBackground } = await importOptionalPeer<
          typeof import('@imgly/background-removal')
        >('@imgly/background-removal'))
      } catch {
        throw new Error(
          '@imgly/background-removal is not installed. Either install it as a peer dependency or pass a custom backgroundRemovalProvider prop.',
        )
      }
      return removeBackground(input, {
        progress: opts?.onProgress
          ? (_key: string, current: number, total: number) => opts.onProgress!(current / total)
          : undefined,
      })
    },
  }
}
