'use client'

import dynamic from 'next/dynamic'

const DesignEditor = dynamic(
  () => import('@fastlab-ai/design-editor').then((mod) => mod.DesignEditor),
  { ssr: false }
)

export default function Home() {
  return (
    <main style={{ height: '100vh' }}>
      <DesignEditor />
    </main>
  )
}
