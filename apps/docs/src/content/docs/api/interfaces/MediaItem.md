---
title: "Interface: MediaItem"
---

[**@fastlabai/design-editor**](../README.md)

***

[@fastlabai/design-editor](../README.md) / MediaItem

# Interface: MediaItem

Defined in: [providers/media.ts:2](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L2)

A single media library item — image, video, or other asset.

## Properties

### height?

> `optional` **height?**: `number`

Defined in: [providers/media.ts:10](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L10)

***

### id

> **id**: `string`

Defined in: [providers/media.ts:4](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L4)

Stable unique identifier for this item.

***

### mimeType?

> `optional` **mimeType?**: `string`

Defined in: [providers/media.ts:13](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L13)

MIME type, e.g. `image/png` or `video/mp4`.

***

### name?

> `optional` **name?**: `string`

Defined in: [providers/media.ts:11](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L11)

***

### thumbnailUrl?

> `optional` **thumbnailUrl?**: `string`

Defined in: [providers/media.ts:8](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L8)

Optional thumbnail URL — falls back to `url` if omitted.

***

### url

> **url**: `string`

Defined in: [providers/media.ts:6](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L6)

Absolute or app-relative URL to the asset.

***

### width?

> `optional` **width?**: `number`

Defined in: [providers/media.ts:9](https://github.com/fastlabai/design-editor/blob/68d0ac81904a572d2be2f5ee4f6e6c015b8db98a/src/providers/media.ts#L9)
