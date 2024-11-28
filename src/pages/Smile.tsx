import { useTrail, useChain, useSprings, animated, useSpringRef } from "@react-spring/web"
import { useEffect } from "react"

const MAX_HEIGHT = 150
const MAX_WIDTH = 150
const strokeWidth = 0.5

const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50]
]

export const Smile: React.FC = () => {
  const gridApi = useSpringRef()

  const boxApi = useSpringRef()

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT
    }
  })

  const [boxSprings] = useSprings(7, i => ({ 
    ref: boxApi,
    from: {
      scale: 0
    },
    to: {
      scale: 1
    },
    delay: i * 200,
    config: {
      mass: 2,
      tension: 220
    }
  }))

  console.log(boxSprings, "88")

  useChain([gridApi, boxApi], [0, 1], 1500)

  useEffect(() => {
    gridApi.start()
  })

  console.log(gridSprings, "111")
  
  return (
    <div h-screen flex justify-center items-center>
      <div color-white bg-blue h-500px w-500px>
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {
              gridSprings.map(({x2}, i) => (
                <animated.line
                  key={i}
                  x1={0}
                  y1={i * 10}
                  x2={x2}
                  y2={i * 10}
                  strokeWidth={strokeWidth}
                  stroke="currentColor"
                />
              ))
            }
            {
              gridSprings.map(({y2}, i) => (
                <animated.line
                  key={i}
                  x1={i * 10}
                  y1={0}
                  x2={i * 10}
                  y2={y2}
                  strokeWidth={strokeWidth}
                  stroke="currentColor"
                />
              ))
            }
          </g>
          {
            boxSprings.map(({scale}, i) => (
              <animated.rect
                key={i}
                width={10}
                height={10}
                fill="currentColor"
                style={{
                  transform: `translate(${COORDS[i][0]}px, ${COORDS[i][1]}px)`,
                  transformOrigin: "5px 5px",
                  scale
                }}
              />
            ))
          }
        </svg>
      </div>
    </div>
  )
}
