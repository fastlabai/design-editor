import { ILayer } from "../../types"
import { fabric } from "fabric"
import { defaultFrameOptions, LayerType, defaultBackgroundOptions } from "../common/constants"
import { ControllerOptions, Dimension, GradientOptions } from "../common/interfaces"
import setObjectGradient from "../utils/fabric"
import Base from "./Base"

class Frame extends Base {
  constructor(props: ControllerOptions) {
    super(props)
    this.initialize()
  }

  initialize() {
    const frame = new fabric.Frame({
      ...defaultFrameOptions,
      absolutePositioned: this.config.clipToFrame,
    })
    const background = new fabric.Background({
      ...defaultBackgroundOptions,
      shadow: this.config.shadow,
    })

    this.canvas.add(frame, background)
    const center = this.canvas.getCenter()
    frame.center()
    background.center()

    this.state.setFrame({
      height: defaultFrameOptions.width,
      width: defaultFrameOptions.height,
    })

    setTimeout(() => {
      this.editor.zoom.zoomToFit()
      this.editor.history.initialize()
    }, 50)
  }

  get frame() {
    return this.canvas.getObjects().find((object) => object.type === LayerType.FRAME) as Required<fabric.Frame>
  }

  get background() {
    return this.canvas
      .getObjects()
      .find((object) => object.type === LayerType.BACKGROUND) as Required<fabric.Background>
  }

  get options(): Required<ILayer> {
    const options = this.frame.toJSON(this.config.propertiesToInclude)
    return options as unknown as Required<ILayer>
  }

  public resize({ height, width }: Dimension) {
    this.state.setFrame({
      height,
      width,
    })
    const frame = this.frame
    const background = this.background
    frame.set({ width, height })
    frame.center()
    if (background) {
      background.set({ width, height })
      background.center()
    }
    this.editor.zoom.zoomToFit()
  }

  public setHoverCursor = (cursor: string) => {
    const background = this.background
    if (background) {
      background.set("hoverCursor", cursor)
    }
  }

  public setBackgroundColor = (color: string) => {
    let background = this.background
    if (!background) {
      background = new fabric.Background({
        type: LayerType.BACKGROUND,
        name: "Initial Frame",
        fill: color,
        id: "background",
        selectable: false,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
        strokeWidth: 0,
        padding: 0,
        evented: false,
        width: this.frame.width,
        height: this.frame.height,
        left: this.frame.left,
        top: this.frame.top,
        originX: this.frame.originX,
        originY: this.frame.originY,
        shadow: this.config.shadow,
      }) as Required<fabric.Background>
      this.canvas.insertAt(background, 1, false)
    } else {
      background.set({ fill: color })
      background.dirty = true
    }
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  public setBackgroundGradient = ({ angle, colors }: GradientOptions) => {
    let background = this.background
    if (!background) {
      background = new fabric.Background({
        type: LayerType.BACKGROUND,
        name: "Initial Frame",
        fill: "#ffffff",
        id: "background",
        selectable: false,
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
        strokeWidth: 0,
        padding: 0,
        evented: false,
        width: this.frame.width,
        height: this.frame.height,
        left: this.frame.left,
        top: this.frame.top,
        originX: this.frame.originX,
        originY: this.frame.originY,
        shadow: this.config.shadow,
      }) as Required<fabric.Background>
      this.canvas.insertAt(background, 1, false)
    }
    setObjectGradient(background, angle, colors)
    background.dirty = true
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  public getBoundingClientRect() {
    const frame = this.frame
    return frame.getBoundingRect()
  }

  get fitRatio() {
    const options = this.frame as Required<fabric.Frame>
    const canvasWidth = this.canvas.getWidth() - this.config.frameMargin
    const canvasHeight = this.canvas.getHeight() - this.config.frameMargin
    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height
    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}
export default Frame
