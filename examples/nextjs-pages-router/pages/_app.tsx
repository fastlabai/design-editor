import type { AppProps } from 'next/app'
import '@fastlab-ai/design-editor/theme.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
