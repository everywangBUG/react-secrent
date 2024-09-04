import type { AttributifyAttributes } from "unocss/preset-attributify"

declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    flex?: boolean,
    relative?: boolean,
    absolute?: boolean,
    text?: string,
    grid?: boolean,
    before?: string,
    after?: string,
    shadow?: boolean,
    h?: string,
    "h-screen"?: boolean,
    grow?: string,
    shrink?: string,
    top?: string
    right?: string
    left?: string
    bottom?: string
    b?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string,
    h?: string
  }
}