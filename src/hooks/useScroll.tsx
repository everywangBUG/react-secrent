import { RefObject, useEffect, useState } from "react"

export const useScroll = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState<boolean>(false)

  useEffect(() => {
    if (ref.current) {
      let scrollTimer: number

      const handleScrollEnd = () => {
        setScrolling(false)
      }

      const handleScroll = () => {
        setScrolling(true)
        clearTimeout(scrollTimer)
        scrollTimer = setTimeout(handleScrollEnd, 200) as unknown as number
      }

      ref.current?.addEventListener("scroll", handleScroll)

      return () => {
        ref.current?.removeEventListener("scroll", handleScroll)
      }
    }
    return () => {}
  }, [ref])

  return scrolling
}