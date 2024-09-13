import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"

interface LazyLoadProps {
  className?: string
  style?: CSSProperties
  placeholder?: ReactNode
  offset?: string | number
  width?: string | number
  height?: string | number
  onContentVisible?: () => void
  children?: ReactNode
}

export const LazyLoad: React.FC<LazyLoadProps> = (props) => {
  const { className, style, placeholder, offset, width, height, onContentVisible, children } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const elementObserver = useRef<IntersectionObserver>()

  const lazyLoadHandler = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    if (entry.isIntersecting) {
      setVisible(true)
      onContentVisible?.()

      const node = containerRef.current
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node)
      }
    }
  }

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
    }

    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options)

    const node = containerRef.current

    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node)
    }

    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node)
      }
    }
  }, [])

  const styles = { width, height, ...style }

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  )
}
