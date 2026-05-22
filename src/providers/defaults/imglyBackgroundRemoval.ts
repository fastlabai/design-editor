import type { BackgroundRemovalProvider } from '../backgroundRemoval'

export function createImglyBackgroundRemoval(): BackgroundRemovalProvider {
  return {
    async remove(input, opts) {
      try {
        const dynamicImport = new Function(
          'm',
          'return import(m)',
        ) as (m: string) => Promise<any>

        const { removeBackground } = await dynamicImport(
          '@imgly/background-removal',
        )

        return removeBackground(input, {
          progress: opts?.onProgress
            ? (_key: string, current: number, total: number) =>
                opts.onProgress!(current / total)
            : undefined,
        })
      } catch {
        throw new Error(
          '@imgly/background-removal is not installed. Either install it as a peer dependency or pass a custom backgroundRemovalProvider prop.',
        )
      }
    },
  }
}