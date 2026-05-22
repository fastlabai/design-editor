---
title: "Function: DesignEditor()"
---

[**@fastlab-ai/design-editor**](../README.md)

***

[@fastlab-ai/design-editor](../README.md) / DesignEditor

# Function: DesignEditor()

> **DesignEditor**(`__namedParameters`): `Element`

Defined in: [components/DesignEditor.tsx:364](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/components/DesignEditor.tsx#L364)

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
import { DesignEditor } from '@fastlab-ai/design-editor'
import '@fastlab-ai/design-editor/theme.css'

export default function App() {
  return <DesignEditor />
}
```
