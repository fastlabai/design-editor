/** A single media library item — image, video, or other asset. */
export interface MediaItem {
  /** Stable unique identifier for this item. */
  id: string
  /** Absolute or app-relative URL to the asset. */
  url: string
  /** Optional thumbnail URL — falls back to `url` if omitted. */
  thumbnailUrl?: string
  width?: number
  height?: number
  name?: string
  /** MIME type, e.g. `image/png` or `video/mp4`. */
  mimeType?: string
}

/** Paginated result returned by {@link MediaProvider.list}. */
export interface MediaListResult {
  items: MediaItem[]
  /** Opaque cursor for the next page, or undefined if no more pages. */
  nextCursor?: string
}

/**
 * Plug in your own media library backend. The editor calls `list` to populate
 * the Library panel and `upload` when the user drops a file into the Upload panel.
 */
export interface MediaProvider {
  /** List media items, optionally paginated and filtered by search. */
  list(opts: {
    cursor?: string
    search?: string
    signal?: AbortSignal
  }): Promise<MediaListResult>

  /** Upload a file and return the resulting media item. */
  upload(
    file: File,
    opts?: { signal?: AbortSignal; onProgress?: (pct: number) => void },
  ): Promise<MediaItem>
}
