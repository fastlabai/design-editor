import dynamic from 'next/dynamic'

// The editor manipulates <canvas> and browser APIs, so disable SSR.
const DesignEditor = dynamic(
  () => import('@fastlabai/design-editor').then((m) => m.DesignEditor),
  { ssr: false },
)

export default function Home() {
  return (
    <main style={{ height: '100vh' }}>
        <DesignEditor
          title="FastlabAI Studio (Pages Router)"
          sceneKey="nextjs-pages-scene-1"
          onExport={async (blob, format) => {
            console.log(`Exported ${format} file: ${blob.size} bytes`)
            alert(`Exported ${format} file: ${blob.size} bytes`)
          }}
        />
    </main>
  )
}
