---
title: "Interface: MediaProvider"
---

[**@fastlabai/design-editor**](../README.md)

***

[@fastlabai/design-editor](../README.md) / MediaProvider

# Interface: MediaProvider

Defined in: [providers/media.ts:27](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L27)

Plug in your own media library backend. The editor calls `list` to populate
the Library panel and `upload` when the user drops a file into the Upload panel.

## Methods

### list()

> **list**(`opts`): `Promise`\<[`MediaListResult`](MediaListResult.md)\>

Defined in: [providers/media.ts:29](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L29)

List media items, optionally paginated and filtered by search.

#### Parameters

##### opts

###### cursor?

`string`

###### search?

`string`

###### signal?

`AbortSignal`

#### Returns

`Promise`\<[`MediaListResult`](MediaListResult.md)\>

***

### upload()

> **upload**(`file`, `opts?`): `Promise`\<[`MediaItem`](MediaItem.md)\>

Defined in: [providers/media.ts:36](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L36)

Upload a file and return the resulting media item.

#### Parameters

##### file

`File`

##### opts?

###### onProgress?

(`pct`) => `void`

###### signal?

`AbortSignal`

#### Returns

`Promise`\<[`MediaItem`](MediaItem.md)\>
