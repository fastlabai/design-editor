'use client'

import dynamic from 'next/dynamic'

const DesignEditor = dynamic(
  () => import('@fastlabai/design-editor').then((mod) => mod.DesignEditor),
  { ssr: false }
)

export default function Home() {
  return (
    <main style={{ height: '100vh' }}>
      <DesignEditor title="FastlabAI Studio" sceneKey="example-scene-1" />
    </main>
  )
}
