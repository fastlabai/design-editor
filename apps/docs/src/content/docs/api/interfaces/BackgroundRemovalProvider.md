---
title: "Interface: BackgroundRemovalProvider"
---

[**@fastlab-ai/design-editor**](../README.md)

***

[@fastlab-ai/design-editor](../README.md) / BackgroundRemovalProvider

# Interface: BackgroundRemovalProvider

Defined in: [providers/backgroundRemoval.ts:6](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/backgroundRemoval.ts#L6)

Plug in a background-removal backend. The default provider uses the
optional `@imgly/background-removal` peer dep to run in-browser; you can
supply a server-side provider here instead.

## Methods

### remove()

> **remove**(`input`, `opts?`): `Promise`\<`Blob`\>

Defined in: [providers/backgroundRemoval.ts:8](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/backgroundRemoval.ts#L8)

Remove the background from the given image and return a transparent-PNG Blob.

#### Parameters

##### input

`string` \| `Blob`

##### opts?

###### onProgress?

(`pct`) => `void`

###### signal?

`AbortSignal`

#### Returns

`Promise`\<`Blob`\>
