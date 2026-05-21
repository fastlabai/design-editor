// Type augmentations for fabric.js custom subclasses registered at runtime
// via `fabric.util.createClass`. These add the constructor signature and
// `fromObject` static so TS sees them on the `fabric` namespace.
import "fabric"

declare module "fabric" {
  namespace fabric {
    class Frame extends fabric.Rect {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class Background extends fabric.Rect {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class BackgroundImage extends fabric.Image {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class StaticImage extends fabric.Image {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class StaticVideo extends fabric.Image {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class StaticAudio extends fabric.Object {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class StaticText extends fabric.Textbox {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class StaticPath extends fabric.Path {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
    class StaticVector extends fabric.Group {
      constructor(...args: any[])
      static fromObject(options: any, callback: Function): any
    }
  }
}
