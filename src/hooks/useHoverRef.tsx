import { RefObject, useEffect, useState } from "react"

export interface Options {
  onEnter?: () => void
  onLeave?: () => void
  onChange?: (isHovering: boolean) => void
}
export const useHoverRef = (ref: RefObject<HTMLElement>, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {}
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", () => {
      onEnter?.()
      setIsHover(true)
      onChange?.(true)
    })

    ref.current?.addEventListener("mouseleave", () => {
      onLeave?.()
      setIsHover(false)
      onChange?.(false)
    })
  }, [])

  return isHover
}