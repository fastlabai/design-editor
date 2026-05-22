---
title: "Function: DesignEditor()"
---

[**@fastlabai/design-editor**](../README.md)

***

[@fastlabai/design-editor](../README.md) / DesignEditor

# Function: DesignEditor()

> **DesignEditor**(`__namedParameters`): `Element`

Defined in: [components/DesignEditor.tsx:400](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/components/DesignEditor.tsx#L400)

The top-level image design editor. Renders a full-screen canvas-based editor
with toolbar, side panels, layer panel, and object properties bar.

Configure host integration via the provider props
(`mediaProvider`, `fontProvider`, `backgroundRemovalProvider`, `persistenceProvider`).

## Parameters

### \_\_namedParameters

[`DesignEditorProps`](../interfaces/DesignEditorProps.md)

## Returns

`Element`

## Example

```tsx
import { DesignEditor } from '@fastlabai/design-editor'
import '@fastlabai/design-editor/theme.css'

export default function App() {
  return <DesignEditor />
}
```
