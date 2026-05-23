# Changelog

## Unreleased

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
