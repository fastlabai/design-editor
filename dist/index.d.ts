import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

/** A single media library item — image, video, or other asset. */
interface MediaItem {
    /** Stable unique identifier for this item. */
    id: string;
    /** Absolute or app-relative URL to the asset. */
    url: string;
    /** Optional thumbnail URL — falls back to `url` if omitted. */
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    name?: string;
    /** MIME type, e.g. `image/png` or `video/mp4`. */
    mimeType?: string;
}
/** Paginated result returned by {@link MediaProvider.list}. */
interface MediaListResult {
    items: MediaItem[];
    /** Opaque cursor for the next page, or undefined if no more pages. */
    nextCursor?: string;
}
/**
 * Plug in your own media library backend. The editor calls `list` to populate
 * the Library panel and `upload` when the user drops a file into the Upload panel.
 */
interface MediaProvider {
    /** List media items, optionally paginated and filtered by search. */
    list(opts: {
        cursor?: string;
        search?: string;
        signal?: AbortSignal;
    }): Promise<MediaListResult>;
    /** Upload a file and return the resulting media item. */
    upload(file: File, opts?: {
        signal?: AbortSignal;
        onProgress?: (pct: number) => void;
    }): Promise<MediaItem>;
}

/** Describes a font family available to the editor. */
interface FontDescriptor {
    family: string;
    weights?: number[];
    styles?: ('normal' | 'italic')[];
    category?: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
    previewUrl?: string;
}
/**
 * Plug in your own font source. The editor calls `list` to populate the Fonts
 * panel and `load` when the user selects a font (the provider is responsible
 * for injecting the @font-face declaration or stylesheet).
 */
interface FontProvider {
    /** Return the list of available fonts, optionally filtered by search. */
    list(opts?: {
        search?: string;
        signal?: AbortSignal;
    }): Promise<FontDescriptor[]>;
    /** Load a font family (and optional weight/style) so it can be rendered on canvas. */
    load(family: string, opts?: {
        weight?: number;
        style?: string;
    }): Promise<void>;
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
    namespace fabric {
        interface Frame {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface StaticText {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface StaticImage {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface StaticVector {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface StaticPath {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface Background {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface BackgroundImage {
        }
        interface IUtil {
            isTouchEvent(event: Event): boolean;
            getPointer(event: Event, a?: any): Point;
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface StaticVideo {
        }
    }
}

declare module "fabric" {
    namespace fabric {
        interface StaticAudio {
        }
    }
}

declare module "fabric" {
    namespace fabric {
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
            _objects?: fabric.Object[];
            metadata?: Record<string, any>;
            clipPath?: undefined | null | fabric.Object;
        }
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

declare function createGoogleFontsProvider(opts?: {
    apiKey?: string;
}): FontProvider;

declare function createImglyBackgroundRemoval(): BackgroundRemovalProvider;

declare function createNullMediaProvider(): MediaProvider;

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
    /** Media library provider. Defaults to a null provider (empty Library panel). */
    mediaProvider?: MediaProvider;
    /** Font provider. Defaults to a Google Fonts provider. */
    fontProvider?: FontProvider;
    /** Background removal provider. Defaults to `@imgly/background-removal` if installed. */
    backgroundRemovalProvider?: BackgroundRemovalProvider;
    /** Autosave/scene persistence provider. Defaults to a `localStorage` provider. */
    persistenceProvider?: PersistenceProvider;
    /** Optional className applied to the editor root for outer styling. */
    className?: string;
    /** Custom render override for the Library panel — useful to inject host-app media UI. */
    libraryPanel?: LibraryPanelRenderProp;
    /** Optional title to display in the toolbar. Defaults to "FastlabAI Design Studio". */
    title?: React.ReactNode;
}
/**
 * The top-level image design editor. Renders a full-screen canvas-based editor
 * with toolbar, side panels, layer panel, and object properties bar.
 *
 * Configure host integration via the provider props
 * (`mediaProvider`, `fontProvider`, `backgroundRemovalProvider`, `persistenceProvider`).
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
declare function DesignEditor({ initialScene, sceneKey, onBack, onExport, mediaProvider, fontProvider, backgroundRemovalProvider, persistenceProvider, className, libraryPanel, title, }: DesignEditorProps): react_jsx_runtime.JSX.Element;

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
declare const VERSION = "1.0.0-beta.3";

export { type BackgroundRemovalProvider, DesignEditor, type DesignEditorProps, type FontDescriptor, type FontProvider, type ILayer, type IScene, type MediaItem, type MediaListResult, type MediaProvider, type PersistenceProvider, VERSION, createGoogleFontsProvider, createImglyBackgroundRemoval, createLocalStoragePersistence, createNullMediaProvider };
