import { PropsWithChildren, useCallback, useMemo } from "react"
import { animated, useTransition } from "@react-spring/web"

const DURATION = 300

interface SlideProps extends PropsWithChildren {
  isVisible: boolean
  from?: "right" | "down"
}

export const Slide: React.FC<SlideProps> = (props) => {
  const { isVisible, from = "right", children } = props

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
              fixed top-0 right-0 bottom-0 left-0 bg="[rgba(0,0,0,0.3)]" z-10
              style={{transform: props.x.to((x) => (x === 0 ? "none" : translate(x))), opacity: props.opacity}}
            >
              <div h-100px>{JSON.stringify(props.x)}</div>
              {children}
            </animated.div>
          ))
        )
      }
    </div>
  )
}
