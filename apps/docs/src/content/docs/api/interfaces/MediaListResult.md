---
title: "Interface: MediaListResult"
---

[**@fastlabai/design-editor**](../README.md)

***

[@fastlabai/design-editor](../README.md) / MediaListResult

# Interface: MediaListResult

Defined in: [providers/media.ts:17](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/providers/media.ts#L17)

Paginated result returned by [MediaProvider.list](MediaProvider.md#list).

## Properties

### items

> **items**: [`MediaItem`](MediaItem.md)[]

Defined in: [providers/media.ts:18](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/providers/media.ts#L18)

***

### nextCursor?

> `optional` **nextCursor?**: `string`

Defined in: [providers/media.ts:20](https://github.com/fastlabai/design-editor/blob/d34b8234ba228c6b125e5206c129cbb9982505d2/src/providers/media.ts#L20)

Opaque cursor for the next page, or undefined if no more pages.
