# Changelog

## Unreleased

### Fixed
- Fixed an issue where the canvas would turn blank on Undo/Redo after the Fabric.js v6 migration. Replaced the `util.enlivenObjects` approach with `canvas.loadFromJSON` as the official Fabric v6 method, and fixed `Cannot set property type of [object Object] which has only a getter` crashes during object deserialization by supplying `set type` no-ops to all custom classes (`Frame`, `Background`, `BackgroundImage`, `StaticImage`, `StaticText`, `StaticPath`, `StaticVector`, `StaticVideo`, `StaticAudio`).
- Fixed a `_drawClipPath` crash by stripping `clipPath` from history JSON snapshots, as `loadFromJSON` handles it internally and the editor re-applies it automatically on restore.
- Fixed a React console warning (`Function components cannot be given refs`) in `PBtn` by using `React.forwardRef`.

## [1.0.0-beta.6] - 2026-05-23

### Added
- Added 15 new Best-in-Class designs to the bundled `TemplatesPanel` dataset for 'TV & Horizontal Ads' and 'Industry Signage' categories.
- Added a unified close button header to all sub-panels (Templates, Shapes, Text, etc.) inside `<DesignEditor>`.

### Fixed
- Fixed an asynchronous race condition where `canvasBg` colors on imported templates were being overwritten and reset back to white, causing white text to disappear.
- Fixed a bug where native stickers were improperly cropped in the canvas due to hardcoded image dimensions conflicting with intrinsic image resolutions.
- Re-enabled keeping the side panel open upon clicking a template or component, instead of automatically closing it.

## [1.0.0-beta.5] - 2026-05-23

### Added
- Complete modern documentation re-styling with glassmorphism, dynamic gradients, and custom fonts.
- Rebranded positioning as "A lightweight React/Next.js editor SDK for embedding brand-safe template editing into SaaS products".
- Updated `publishConfig` to target GitHub NPM registry.

## [1.0.0-beta.4] - 2026-05-23

### Breaking changes

- Removed `mediaProvider`, `libraryPanel`, `MediaProvider`, `MediaItem`, `MediaListResult`,
  and `createNullMediaProvider` from the public API.
- `PanelKey` value `'library'` is now `'templates'`.

### Added

- New `TemplateProvider` interface and `createDefaultTemplateProvider()`.
- New `templateProvider` and `templatesPanel` props on `<DesignEditor>`.
- Templates side panel with browse / category-detail / search modes.

### Migration

Host apps that previously supplied `mediaProvider` to inject an asset picker
must move that UI outside the editor (or render it inside a custom panel using
the engine API). The editor's left rail now opens a Templates panel by default;
host apps can override it via the `templatesPanel` render-prop.
