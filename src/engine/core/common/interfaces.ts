// @ts-ignore
import { Canvas as FabricCanvasClass, Point, ShadowProps } from "fabric"
import type { TPointerEventInfo } from "fabric"
import { Editor } from "../editor"
import { EditorConfig } from "../../types"

export type Direction = "top" | "left"
export type Size = "width" | "height"
export type ScaleType = "fit" | "fill"

export interface FabricWheelEvent extends TPointerEventInfo {
}

export interface Dimension {
  width: number
  height: number
}

// export interface RootHandlerOptions

export interface ControllerOptions {
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
  state: EditorState
}

export interface CanvasOptions {
  width: number
  height: number
}

export interface FabricCanvasOption {
  wrapperEl: HTMLElement
}

export type FabricCanvas<T extends any = FabricCanvasClass> = T & FabricCanvasOption

//  Template

export interface Template {
  id: string
  name: string
  preview: string
  background: any
  frame: {
    width: number
    height: number
  }
  objects: any[]
  metadata: {
    animated: boolean
  }
}

export interface GradientOptions {
  angle: number
  colors: string[]
}

export interface ShadowOptions extends ShadowProps {
  enabled: boolean
}

export interface EditorState {
  frame: any
  activeObject: any
  objects: any[]
  zoomRatio: number
  contextMenuRequest: any
  editor: Editor | null
  setFrame: (o: any) => void
  setActiveObject: (o: any) => void
  setObjects: (o: any) => void
  setZoomRatio: (o: any) => void
  setContextMenuRequest: (o: any) => void
  setEditor: (o: any) => void
}
