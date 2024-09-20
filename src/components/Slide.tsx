import { CSSProperties, PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react"
import { animated, useTransition } from "@react-spring/web"

const DURATION = 300

interface SlideProps extends PropsWithChildren {
  isVisible: boolean
  from?: "right" | "down"
  className?: string
  style?: CSSProperties
  onEnter?: () => void
  onExit?: () => void
}

export const Slide: React.FC<SlideProps> = (props) => {
  const { isVisible, from = "right", children, className, style, onEnter, onExit } = props
  const visibleRef = useRef(isVisible)

  useEffect(() => {
    let timer = null
    if (isVisible && onEnter !== null) {
      timer = setTimeout(onEnter, DURATION)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isVisible, onEnter])

  useEffect(() => {
    let timer = null
    if (!isVisible && onExit !== null && visibleRef.current) {
      timer = setTimeout(onExit, DURATION)
    }

    visibleRef.current = isVisible

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  })

  const x = useMemo(
    () => (
      from === "right" ? window.screen.width : window.screen.height
    ), [from])

  const transitions = useTransition(isVisible, {
    x,
    opacity: 1,
    from: {
      x,
      opacity: 1
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x,
      opacity: 0,
    },
    config: {
      duration: DURATION
    }
  })

  const translate = useCallback(
    (x: number) => {
      switch(from) {
        case "right":
          return `translateX(${x}px)`
        case "down":
          return `translateY(${x}px)`
      }
    }, [from])

  return (
    <div>
      {
        transitions((props, isVisible) => (
          isVisible && (
            <animated.div
              className={className}
              fixed top-0 right-0 bottom-0 left-0 bg="[rgba(0,0,0,0.3)]" z-10
              style={{
                ...style,
                transform: props.x.to((x) => (x === 0 ? "none" : translate(x))),
                opacity: props.opacity}}
            >
              {children}
            </animated.div>
          ))
        )
      }
    </div>
  )
}
