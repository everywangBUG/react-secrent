import { TransformOffset } from "./Transform"
import { Color } from "./Color"

/**
 * according x and y to calculate color
 * @param props
 * @param props.containerRef container ref
 * @param props.targetRef target ref
 * @param props.color current color
 * @param props.offset offset
 * @returns new Color instance
 */
export const calculateColor = (props: {
    offset: TransformOffset;
    containerRef: React.RefObject<HTMLDivElement>;
    targetRef: React.RefObject<HTMLDivElement>;
    color: Color;
}): Color => {
  const { offset, targetRef, containerRef, color } = props

  const { width, height } = containerRef.current!.getBoundingClientRect()
  const { 
    width: targetWidth,
    height: targetHeight
  } = targetRef.current!.getBoundingClientRect()

  const centerOffsetX = targetWidth / 2
  const centerOffsetY = targetHeight / 2

  const saturation = (offset.x + centerOffsetX) / width
  const lightness = 1 - (offset.y + centerOffsetY) / height
  const hsv = color.toHsv()

  return new Color({
    h: hsv.h,
    s: saturation <= 0 ? 0 : saturation,
    v: lightness >= 1 ? 1 : lightness,
    a: hsv.a,
  })
}
