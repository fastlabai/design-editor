import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

/** Describes a font family available to the editor. */
interface FontDescriptor {
    family: string;
    source: 'google' | 'custom';
    url?: string;
}
type FontChangeHandler = () => void;
/**
 * Plug in your own font source. The editor calls `list` to populate the font
 * picker, `load` when the user selects a font, `upload` to add a custom font
 * from a file, and `onChange` to subscribe to updates (e.g. after an upload).
 */
interface FontProvider {
    /** Return the full list of available fonts. */
    list(): Promise<FontDescriptor[]>;
    /** Load a font family so it can be rendered on canvas. */
    load(family: string): Promise<void>;
    /** Upload a font file and register it as a custom font. */
    upload(file: File): Promise<FontDescriptor>;
    /** Subscribe to changes (e.g. new uploads). Returns an unsubscribe function. */
    onChange?(handler: FontChangeHandler): () => void;
}

/**
 * Plug in a background-removal backend. The default provider uses the
 * optional `@imgly/background-removal` peer dep to run in-browser; you can
 * supply a server-side provider here instead.
 */
interface BackgroundRemovalProvider {
    /** Remove the background from the given image and return a transparent-PNG Blob. */
    remove(input: string | Blob, opts?: {
        signal?: AbortSignal;
        onProgress?: (pct: number) => void;
    }): Promise<Blob>;
}

interface TimeRange {
    from?: number;
    to?: number;
}

type ILayerType = "StaticVector" | "StaticGroup" | "DynamicGroup" | "StaticPath" | "DynamicPath" | "StaticImage" | "BackgroundImage" | "StaticVideo" | "StaticAudio" | "DynamicImage" | "StaticText" | "DynamicText" | "Background" | "Frame" | "Group" | "activeSelection";
interface IKeyValue {
    key: string;
    value: string;
}
interface IShadow {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
    affectStroke?: boolean;
    nonScaling?: boolean;
}
interface Param {
    key: string;
    name: string;
}
interface LayerBaseOptions {
    id: string;
    name?: string;
    type: ILayerType | string;
    top?: number;
    left?: number;
    angle?: number;
    width?: number;
    height?: number;
    originX?: string;
    originY?: string;
    scaleX?: number;
    scaleY?: number;
    opacity?: number;
    flipX?: boolean;
    flipY?: boolean;
    skewX?: number;
    skewY?: number;
    stroke?: string;
    strokeWidth?: number;
    watermark?: string;
    visible?: boolean;
    shadow?: IShadow;
    metadata?: Record<string, string | number | boolean>;
    animation?: Animation;
    clipPath?: ILayer;
    strokeDashArray?: number[] | undefined;
    strokeLineCap?: string | undefined;
    strokeLineJoin?: string | undefined;
    strokeUniform?: boolean;
    strokeMiterLimit?: number | undefined;
    strokeDashOffset?: number;
    clipToFrame?: boolean;
    preview?: string;
    duration?: number;
    display?: TimeRange;
    cut?: TimeRange;
    params?: Param[];
}
interface Animation {
    type: string;
}
interface IStaticText extends LayerBaseOptions {
    fontURL?: string;
    textAlign?: string;
    fontFamily?: string;
    fontSize?: number;
    charSpacing?: number;
    lineHeight?: number;
    underline?: boolean;
    text: string;
    fill?: string;
}
interface IDynamicText extends IStaticText {
    keyValues: IKeyValue[];
}
interface IStaticImage extends LayerBaseOptions {
    src: string;
    cropX?: number;
    cropY?: number;
}
interface IBackgroundImage extends IStaticImage {
}
interface IDynamicImage extends LayerBaseOptions {
    key: string;
}
interface IGroup extends LayerBaseOptions {
    objects: ILayer[];
}
interface IStaticPath extends LayerBaseOptions {
    path: number[][];
    fill: string;
}
interface IStaticVector extends LayerBaseOptions {
    src: string;
    colorMap: Record<string, string>;
}
interface IStaticVideo extends LayerBaseOptions {
    src: string;
    speedFactor: number;
}
interface IStaticAudio extends LayerBaseOptions {
    src: string;
    speedFactor: number;
}
interface IBackground extends LayerBaseOptions {
    fill: string;
}
type ILayer = IStaticText | IDynamicText | IStaticImage | IDynamicImage | IStaticPath | IBackground | IStaticAudio | IStaticVideo | IStaticVector | IGroup | IBackgroundImage;

interface IFrame {
    width: number;
    height: number;
}
interface IScene {
    id: string;
    frame: IFrame;
    name?: string;
    description?: string;
    layers: Partial<ILayer>[];
    metadata: Record<string, any>;
    preview?: string;
    duration?: number;
    display?: TimeRange;
}

declare module "fabric" {
    interface Frame {
    }
}

declare module "fabric" {
    interface StaticText {
    }
}

declare module "fabric" {
    interface StaticImage {
    }
}

declare module "fabric" {
    interface StaticVector {
    }
}

declare module "fabric" {
    interface StaticPath {
    }
}

declare module "fabric" {
    interface Background {
    }
}

declare module "fabric" {
    interface BackgroundImage {
    }
}

declare module "fabric" {
    interface StaticVideo {
    }
}

declare module "fabric" {
    interface StaticAudio {
    }
}

declare module "fabric" {
    interface Canvas {
        __fire: any;
        enableEvents: () => void;
        disableEvents: () => void;
    }
    interface Object {
        id: string;
        name: string;
        locked: boolean;
        duration?: {
            start?: number;
            stop?: number;
        };
        metadata?: Record<string, any>;
    }
}

/**
 * Plug in a persistence backend for autosave/load. The default provider stores
 * scenes in `localStorage`; you can supply a server-side adapter here.
 */
interface PersistenceProvider {
    /** Persist the given scene under the provided key. */
    save(sceneKey: string, scene: IScene): Promise<void>;
    /** Load a previously saved scene, or null if none exists. */
    load(sceneKey: string): Promise<IScene | null>;
    /** Optional: enumerate stored scenes (used by host-app scene pickers). */
    list?(): Promise<{
        sceneKey: string;
        updatedAt: number;
        thumbnailUrl?: string;
    }[]>;
}

declare function createLocalStoragePersistence(opts?: {
    prefix?: string;
}): PersistenceProvider;

declare function createImglyBackgroundRemoval(): BackgroundRemovalProvider;

/** A single design template — a fully composed scene the user can apply as a starting point. */
interface DesignTemplate {
    id: string;
    name: string;
    categoryId: string;
    /** Pre-rendered thumbnail. If omitted, the editor renders one at runtime from `scene`. */
    thumbnailUrl?: string;
    scene: IScene;
    /** Canvas background colour applied when this template is clicked. */
    canvasBg?: string;
    /** Workspace background colour applied when this template is clicked. */
    workspaceBg?: string;
    /** Free-text tags used for search matching alongside `name`. */
    tags?: string[];
}
/** A grouping of templates (e.g. "Social Media", "Posters"). */
interface TemplateCategory {
    id: string;
    name: string;
    description?: string;
    /** Lower values sort earlier in the panel. */
    order?: number;
}
interface TemplateListOpts {
    categoryId?: string;
    search?: string;
    cursor?: string;
    /** Defaults to 12 if omitted. */
    limit?: number;
    signal?: AbortSignal;
}
interface TemplateListResult {
    items: DesignTemplate[];
    /** Opaque cursor for the next page. Undefined when no more pages. */
    nextCursor?: string;
}
/**
 * Plug in your own template library. The editor calls `categories()` once
 * to render the panel, then `list()` per category, per search query,
 * and on "Load more".
 */
interface TemplateProvider {
    categories(opts?: {
        signal?: AbortSignal;
    }): Promise<TemplateCategory[]>;
    list(opts: TemplateListOpts): Promise<TemplateListResult>;
}

/**
 * The default template provider — backed by a small bundled JSON.
 * Host apps should supply their own `TemplateProvider` for production use.
 */
declare function createDefaultTemplateProvider(): TemplateProvider;

/** A single text design — a pre-composed text layout the user can apply as a starting point. */
interface TextDesign {
    id: string;
    name: string;
    categoryId: string;
    /** Pre-rendered thumbnail. If omitted, the editor renders one at runtime from `scene`. */
    thumbnailUrl?: string;
    scene: IScene;
    /** Canvas background colour applied when this design is clicked. */
    canvasBg?: string;
    /** Free-text tags used for search matching alongside `name`. */
    tags?: string[];
}
/** A grouping of text designs (e.g. "Headings", "Quotes"). */
interface TextDesignCategory {
    id: string;
    name: string;
    description?: string;
    /** Lower values sort earlier in the panel. */
    order?: number;
}
interface TextDesignListOpts {
    categoryId?: string;
    search?: string;
    cursor?: string;
    /** Defaults to 12 if omitted. */
    limit?: number;
    signal?: AbortSignal;
}
interface TextDesignListResult {
    items: TextDesign[];
    /** Opaque cursor for the next page. Undefined when no more pages. */
    nextCursor?: string;
}
/**
 * Plug in your own text design library. The editor calls `categories()` once
 * to render the panel, then `list()` per category, per search query,
 * and on "Load more".
 */
interface TextDesignProvider {
    categories(opts?: {
        signal?: AbortSignal;
    }): Promise<TextDesignCategory[]>;
    list(opts: TextDesignListOpts): Promise<TextDesignListResult>;
}

/**
 * The default text design provider — backed by a small bundled JSON.
 * Host apps should supply their own `TextDesignProvider` for production use.
 */
declare function createDefaultTextDesignProvider(): TextDesignProvider;

/**
 * Default font provider: 30+ Google Font families + custom uploaded fonts.
 * Each factory call returns an independent provider instance with its own state.
 */
declare function createDefaultFontProvider(): FontProvider;

type TemplatesPanelRenderProp = React.ReactNode | ((props: {
    onApplyTemplate: (t: DesignTemplate) => void;
}) => React.ReactNode);
type LibraryPanelRenderProp = React.ReactNode | ((props: {
    onAddMedia: (url: string) => void;
}) => React.ReactNode);
/** Props for the top-level {@link DesignEditor} component. */
interface DesignEditorProps {
    /** A serialized scene to load on mount, or any scene-shaped object with optional `canvasBg`/`workspaceBg`. */
    initialScene?: IScene | any;
    /** Stable key identifying the scene for persistence; passed to the persistence provider. */
    sceneKey?: string;
    /** Called when the user clicks the back button in the toolbar. */
    onBack?: () => void;
    /** Called when the user exports the design. Receives the rendered Blob, output format, and raw scene JSON. */
    onExport?: (blob: Blob, format: 'png' | 'jpg' | 'svg', scene: IScene) => void | Promise<void>;
    /** Template provider. Defaults to a small bundled starter set. */
    templateProvider?: TemplateProvider;
    /** Text design provider. Defaults to the bundled text designs set. */
    textDesignProvider?: TextDesignProvider;
    /** Font provider. Defaults to a Google Fonts provider. */
    fontProvider?: FontProvider;
    /** Background removal provider. Defaults to `@imgly/background-removal` if installed. */
    backgroundRemovalProvider?: BackgroundRemovalProvider;
    /** Autosave/scene persistence provider. Defaults to a `localStorage` provider. */
    persistenceProvider?: PersistenceProvider;
    /** Optional className applied to the editor root for outer styling. */
    className?: string;
    /** Custom render override for the Templates panel — useful to inject host-app template UI. */
    templatesPanel?: TemplatesPanelRenderProp;
    /** Custom render override for the Upload/Library panel — useful to inject host-app media library UI. */
    libraryPanel?: LibraryPanelRenderProp;
    /** Optional title to display in the toolbar. Defaults to "FastlabAI Design Studio". */
    title?: React.ReactNode;
}
/**
 * The top-level image design editor. Renders a full-screen canvas-based editor
 * with toolbar, side panels, layer panel, and object properties bar.
 *
 * Configure host integration via the provider props
 * (`templateProvider`, `fontProvider`, `backgroundRemovalProvider`, `persistenceProvider`).
 *
 * @example
 * ```tsx
 * import { DesignEditor } from '@fastlabai/design-editor'
 * import '@fastlabai/design-editor/theme.css'
 *
 * export default function App() {
 *   return <DesignEditor />
 * }
 * ```
 */
declare function DesignEditor({ initialScene, sceneKey, onBack, onExport, templateProvider, textDesignProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, className, templatesPanel, libraryPanel, title, }: DesignEditorProps): react_jsx_runtime.JSX.Element;

/**
 * @fastlabai/design-editor
 *
 * An open-source image design editor for React and Next.js.
 * Plug into your own media library, fonts, and storage backend via simple
 * provider interfaces.
 *
 * @packageDocumentation
 */
/** Current package version. */
declare const VERSION = "1.0.0-beta.10";

export { type BackgroundRemovalProvider, DesignEditor, type DesignEditorProps, type DesignTemplate, type FontChangeHandler, type FontDescriptor, type FontProvider, type ILayer, type IScene, type PersistenceProvider, type TemplateCategory, type TemplateListOpts, type TemplateListResult, type TemplateProvider, type TextDesign, type TextDesignCategory, type TextDesignListOpts, type TextDesignListResult, type TextDesignProvider, VERSION, createDefaultFontProvider, createDefaultTemplateProvider, createDefaultTextDesignProvider, createImglyBackgroundRemoval, createLocalStoragePersistence };
