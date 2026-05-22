---
title: "Interface: DesignEditorProps"
---

[**@fastlabai/design-editor**](../README.md)

***

[@fastlabai/design-editor](../README.md) / DesignEditorProps

# Interface: DesignEditorProps

Defined in: [components/DesignEditor.tsx:358](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L358)

Props for the top-level [DesignEditor](../functions/DesignEditor.md) component.

## Properties

### backgroundRemovalProvider?

> `optional` **backgroundRemovalProvider?**: [`BackgroundRemovalProvider`](BackgroundRemovalProvider.md)

Defined in: [components/DesignEditor.tsx:372](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L372)

Background removal provider. Defaults to `@imgly/background-removal` if installed.

***

### className?

> `optional` **className?**: `string`

Defined in: [components/DesignEditor.tsx:376](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L376)

Optional className applied to the editor root for outer styling.

***

### fontProvider?

> `optional` **fontProvider?**: [`FontProvider`](FontProvider.md)

Defined in: [components/DesignEditor.tsx:370](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L370)

Font provider. Defaults to a Google Fonts provider.

***

### initialScene?

> `optional` **initialScene?**: `any`

Defined in: [components/DesignEditor.tsx:360](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L360)

A serialized scene to load on mount, or any scene-shaped object with optional `canvasBg`/`workspaceBg`.

***

### libraryPanel?

> `optional` **libraryPanel?**: `LibraryPanelRenderProp`

Defined in: [components/DesignEditor.tsx:378](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L378)

Custom render override for the Library panel — useful to inject host-app media UI.

***

### mediaProvider?

> `optional` **mediaProvider?**: [`MediaProvider`](MediaProvider.md)

Defined in: [components/DesignEditor.tsx:368](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L368)

Media library provider. Defaults to a null provider (empty Library panel).

***

### onBack?

> `optional` **onBack?**: () => `void`

Defined in: [components/DesignEditor.tsx:364](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L364)

Called when the user clicks the back button in the toolbar.

#### Returns

`void`

***

### onExport?

> `optional` **onExport?**: (`blob`, `format`, `scene`) => `void` \| `Promise`\<`void`\>

Defined in: [components/DesignEditor.tsx:366](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L366)

Called when the user exports the design. Receives the rendered Blob, output format, and raw scene JSON.

#### Parameters

##### blob

`Blob`

##### format

`"svg"` \| `"png"` \| `"jpg"`

##### scene

[`IScene`](IScene.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### persistenceProvider?

> `optional` **persistenceProvider?**: [`PersistenceProvider`](PersistenceProvider.md)

Defined in: [components/DesignEditor.tsx:374](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L374)

Autosave/scene persistence provider. Defaults to a `localStorage` provider.

***

### sceneKey?

> `optional` **sceneKey?**: `string`

Defined in: [components/DesignEditor.tsx:362](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L362)

Stable key identifying the scene for persistence; passed to the persistence provider.

***

### title?

> `optional` **title?**: `ReactNode`

Defined in: [components/DesignEditor.tsx:380](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L380)

Optional title to display in the toolbar. Defaults to "FastlabAI Design Studio".
