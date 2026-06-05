# @fastlabai/design-editor

[![npm version](https://img.shields.io/npm/v/@fastlabai/design-editor.svg)](https://www.npmjs.com/package/@fastlabai/design-editor)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/fastlabai/design-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/fastlabai/design-editor/actions/workflows/ci.yml)

An open-source image design editor for React and Next.js, brought to you by [FastlabAI](https://fastlab.ai). Plug in your own
media library, fonts, and storage backend via simple provider interfaces.

![Design Editor screenshot](https://res.cloudinary.com/ladla8602/image/upload/v1779862509/Design-Editor/design-editor-demo.gif)

## Features

- Canvas-based image design editor — layers, shapes, text, stickers
- Background removal (via optional `@imgly/background-removal` peer dep)
- Undo / redo, zoom / pan, autosave
- Themable via CSS variables — bring your own colors
- Zero-conflict CSS — styles are securely scoped to `[data-de-root]`, guaranteeing no interference with your host app's Bootstrap or Tailwind classes.
- Fully flexible UI — optional `onBack` prop (hides the back button automatically if omitted).
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
  initialScene={{ name: "New Design", layers: [], frame: { width: 1080, height: 1080 } }}
  sceneKey="my-unique-design-id"
  templateProvider={myTemplateProvider}
  templatesPanel={({ onApplyTemplate }) => <MyCustomTemplatesPanel onApply={onApplyTemplate} />}
  libraryPanel={({ onAddMedia }) => <MyCustomLibraryPanel onAddMedia={onAddMedia} />}
  fontProvider={myFontProvider}
  persistenceProvider={myPersistenceProvider}
  onExport={async (blob, format, scene) => {
    const url = await uploadToS3(blob)
    await saveToDatabase(scene) // Save raw JSON to re-edit later
  }}
  onBack={() => router.push('/dashboard')}
/>
```

See the documentation site for more examples.

## API Reference

Full typed API documentation is auto-generated and available on the docs site:
- [`<DesignEditor />`](https://fastlabai.github.io/design-editor/api/functions/designeditor)
- [`DesignEditorProps`](https://fastlabai.github.io/design-editor/api/interfaces/designeditorprops)
- [`TemplateProvider`](https://fastlabai.github.io/design-editor/api/interfaces/templateprovider)
- [`FontProvider`](https://fastlabai.github.io/design-editor/api/interfaces/fontprovider)
- [`BackgroundRemovalProvider`](https://fastlabai.github.io/design-editor/api/interfaces/backgroundremovalprovider)
- [`PersistenceProvider`](https://fastlabai.github.io/design-editor/api/interfaces/persistenceprovider)
- [`IScene`](https://fastlabai.github.io/design-editor/api/interfaces/iscene)
- [`ILayer`](https://fastlabai.github.io/design-editor/api/type-aliases/ilayer)
## Docs & playground

- Full documentation — <https://fastlabai.github.io/design-editor>
- Live playground — <https://fastlabai.github.io/design-editor/playground>
- Examples — [`examples/`](./examples) (Next.js App Router, Pages Router, React/Vite, custom providers)

## License

MIT © Fastlab.

Engine code is forked from [layerhub-io/layerhub-ce](https://github.com/layerhub-io/layerhub-ce) (MIT).
