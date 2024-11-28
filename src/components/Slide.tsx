import { CSSProperties, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { animated, useSpring, useTransition } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"

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
      timer = setTimeout(onEnter ?? (() => {}), DURATION)
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
      timer = setTimeout(onExit ?? (() => {}), DURATION)
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
      console.log(x, "x888")
      switch(from) {
      case "right":
        return `translateX(${x}px)`
      case "down":
        return `translateY(${x}px)`
      default:
        return "none"
      }
    }, [from])

  const [{x: springX, y: springY}, api] = useSpring(() => ({x: 0, y: 0}))

  const bind = useDrag(({active, movement: [mx, my], direction: [xDir, yDir], cancel}) => {
    const isX = from === "right"
    const isY = from === "down"
    if (isX) {
      if (active && xDir > 0) {
        api.start({ x: isX ? mx : 0, y: isX ? 0 : my })
      } else if (Math.abs(mx) > x / 2 && xDir > 0) {
        api.start({ x: xDir > 0 ? x : -x, y: 0 })
      } else {
        api.start({ x: 0, y: 0 })
      }
    }

    if (isY) {
      if (active && yDir > 0) {
        api.start({ x: isY ? mx : 0, y: isY ? my : 0 })
      } else if (Math.abs(my) > x / 2 && xDir > 0) {
        api.start({ x: 0, y: xDir > 0 ? x : -x })
      } else {
        api.start({ x:0, y: 0 })
      }
    }
  })

  return (
    <div>
      {
        transitions((props, isVisible) => (
          isVisible && (
            <animated.div
              className={className}
              fixed top-0 right-0 bottom-0 left-0 bg="[rgba(0,0,0,0.3)]" z-10
              {...bind()}
              style={{
                ...style,
                transform: props.x.to((x) => (x === 0 ? "none" : translate(x))),
                // transform: springX.to((x) => translate(x)),
                opacity: props.opacity,
                touchAction: "none"
              }}
            >
              {children}
            </animated.div>
          ))
        )
      }
    </div>
  )
}
