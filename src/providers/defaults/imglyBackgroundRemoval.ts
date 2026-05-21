import type { BackgroundRemovalProvider } from '../backgroundRemoval'

export function createImglyBackgroundRemoval(): BackgroundRemovalProvider {
  return {
    async remove(input, opts) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let removeBackground: (input: any, opts?: any) => Promise<Blob>
      try {
        // @vite-ignore is required because @imgly/background-removal is an
        // optional peer dependency that may not be installed. Without it,
        // Vite's import-analysis plugin fails at build/test time even though
        // the dynamic import is safely wrapped in try/catch.
        ({ removeBackground } = await import(/* @vite-ignore */ '@imgly/background-removal'))
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
