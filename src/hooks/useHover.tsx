import { cloneElement, useState } from "react"

export type Element = ((state: boolean) => React.ReactElement) | React.ReactElement

export const useHover = (element: Element) => {
  const [hover, setHover] = useState(false)
  
  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    originalOnMouseEnter?.(event)
    setHover(true)
  }

  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    originalOnMouseLeave?.(event)
    setHover(false)
  }

  if (typeof element === "function") {
    element = element(hover)
  }

  const el = cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave)
  })

  return [el, hover]
}