[**@fastlab-ai/design-editor**](../README.md)

***

[@fastlab-ai/design-editor](../README.md) / DesignEditorProps

# Interface: DesignEditorProps

Defined in: [components/DesignEditor.tsx:324](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L324)

Props for the top-level [DesignEditor](../functions/DesignEditor.md) component.

## Properties

### backgroundRemovalProvider?

> `optional` **backgroundRemovalProvider?**: [`BackgroundRemovalProvider`](BackgroundRemovalProvider.md)

Defined in: [components/DesignEditor.tsx:338](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L338)

Background removal provider. Defaults to `@imgly/background-removal` if installed.

***

### className?

> `optional` **className?**: `string`

Defined in: [components/DesignEditor.tsx:342](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L342)

Optional className applied to the editor root for outer styling.

***

### fontProvider?

> `optional` **fontProvider?**: [`FontProvider`](FontProvider.md)

Defined in: [components/DesignEditor.tsx:336](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L336)

Font provider. Defaults to a Google Fonts provider.

***

### initialScene?

> `optional` **initialScene?**: `any`

Defined in: [components/DesignEditor.tsx:326](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L326)

A serialized scene to load on mount, or any scene-shaped object with optional `canvasBg`/`workspaceBg`.

***

### libraryPanel?

> `optional` **libraryPanel?**: `LibraryPanelRenderProp`

Defined in: [components/DesignEditor.tsx:344](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L344)

Custom render override for the Library panel — useful to inject host-app media UI.

***

### mediaProvider?

> `optional` **mediaProvider?**: [`MediaProvider`](MediaProvider.md)

Defined in: [components/DesignEditor.tsx:334](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L334)

Media library provider. Defaults to a null provider (empty Library panel).

***

### onBack?

> `optional` **onBack?**: () => `void`

Defined in: [components/DesignEditor.tsx:330](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L330)

Called when the user clicks the back button in the toolbar.

#### Returns

`void`

***

### onExport?

> `optional` **onExport?**: (`blob`, `format`) => `void` \| `Promise`\<`void`\>

Defined in: [components/DesignEditor.tsx:332](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L332)

Called when the user exports the design. Receives the rendered Blob and the output format.

#### Parameters

##### blob

`Blob`

##### format

`"svg"` \| `"png"` \| `"jpg"`

#### Returns

`void` \| `Promise`\<`void`\>

***

### persistenceProvider?

> `optional` **persistenceProvider?**: [`PersistenceProvider`](PersistenceProvider.md)

Defined in: [components/DesignEditor.tsx:340](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L340)

Autosave/scene persistence provider. Defaults to a `localStorage` provider.

***

### sceneKey?

> `optional` **sceneKey?**: `string`

Defined in: [components/DesignEditor.tsx:328](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L328)

Stable key identifying the scene for persistence; passed to the persistence provider.
