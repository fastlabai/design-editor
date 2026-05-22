---
title: "Interface: MediaListResult"
---

[**@fastlabai/design-editor**](../README.md)

***

[@fastlabai/design-editor](../README.md) / MediaListResult

# Interface: MediaListResult

Defined in: [providers/media.ts:17](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L17)

Paginated result returned by [MediaProvider.list](MediaProvider.md#list).

## Properties

### items

> **items**: [`MediaItem`](MediaItem.md)[]

Defined in: [providers/media.ts:18](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L18)

***

### nextCursor?

> `optional` **nextCursor?**: `string`

Defined in: [providers/media.ts:20](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L20)

Opaque cursor for the next page, or undefined if no more pages.
