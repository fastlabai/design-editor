import dynamic from 'next/dynamic'

// The editor manipulates <canvas> and browser APIs, so disable SSR.
const DesignEditor = dynamic(
  () => import('@fastlab-ai/design-editor').then((m) => m.DesignEditor),
  { ssr: false },
)

export default function Home() {
  return (
    <div style={{ height: '100vh' }}>
      <DesignEditor />
    </div>
  )
}
