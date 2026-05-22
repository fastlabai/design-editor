# @fastlabai/design-editor

[![npm version](https://img.shields.io/npm/v/@fastlabai/design-editor.svg)](https://www.npmjs.com/package/@fastlabai/design-editor)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/fastlabai/design-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/fastlabai/design-editor/actions/workflows/ci.yml)

An open-source image design editor for React and Next.js, brought to you by [FastlabAI](https://fastlab.ai). Plug in your own
media library, fonts, and storage backend via simple provider interfaces.

![Design Editor screenshot](./screenshot.png)

## Features

- Canvas-based image design editor — layers, shapes, text, stickers
- Background removal (via optional `@imgly/background-removal` peer dep)
- Undo / redo, zoom / pan, autosave
- Themable via CSS variables — bring your own colors
- TypeScript-first, strict types
- Next.js App Router compatible (components ship with `'use client'`)
- ~150 KB gzipped (excluding React and Fabric.js)

## Install

```bash
npm install @fastlabai/design-editor
# optional — enables in-browser background removal
npm install @imgly/background-removal
```

## Use

```tsx
import { DesignEditor } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'

export default function App() {
  return <DesignEditor />
}
```

## Customize

```tsx
<DesignEditor
  title="My Custom Studio Title"
  mediaProvider={myMediaProvider}
  fontProvider={myFontProvider}
  persistenceProvider={myPersistenceProvider}
  onExport={async (blob, format, scene) => {
    const url = await uploadToS3(blob)
    await saveToDatabase(scene) // Save raw JSON to re-edit later
  }}
  onBack={() => router.push('/dashboard')}
/>
```

See the [providers docs](https://fastlabai.github.io/design-editor/providers/media)
for the interfaces.

## Docs & playground

- Full documentation — <https://fastlabai.github.io/design-editor>
- Live playground — <https://fastlabai.github.io/design-editor/playground>
- Examples — [`examples/`](./examples) (Next.js App Router, Pages Router, Vite, custom providers)

## License

MIT © Fastlab.

Engine code is forked from [layerhub-io/layerhub-ce](https://github.com/layerhub-io/layerhub-ce) (MIT).
