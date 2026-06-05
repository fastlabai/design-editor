'use client'

import dynamic from 'next/dynamic'

const DesignEditor = dynamic(
  () => import('@fastlabai/design-editor').then((mod) => mod.DesignEditor),
  { ssr: false }
)

export default function Home() {
  return (
    <main style={{ height: '100vh' }}>
      <DesignEditor
        title="FastlabAI Studio (App Router)"
        sceneKey="nextjs-app-scene-1"
        onExport={async (blob, format) => {
          console.log(`Exported ${format} file: ${blob.size} bytes`)
          alert(`Exported ${format} file: ${blob.size} bytes`)
        }}
      />
    </main>
  )
}
