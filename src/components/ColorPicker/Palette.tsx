import { useRef } from "react"
import { Color } from "./Color"
import { Handler } from "./Handler"
import "./Palette.scss"
import { Transform } from "./Transform"
import { useColorDrag } from "./useColorDrag"
import { calculateColor, calculateOffset } from "./utils"

export const Palette: React.FC<{color: Color, onChange?: (color: Color) => void}> = ({color, onChange}) => {
  const transformRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [offsetValue, DragStartHandle] = useColorDrag({
    containerRef,
    targetRef: transformRef,
    color,
    onDragChange: offsetValue => {
      const newColor = calculateColor({offset: offsetValue, color, containerRef, targetRef: transformRef})
      onChange?.(newColor)
    },
    calculate: () => {
      return calculateOffset(containerRef, transformRef, color)
    }
  })

  return (
    <div
      ref={containerRef}
      className="color-picker-panel-palette"
      onMouseDown={DragStartHandle}
    >
        <Transform ref={transformRef} offset={{x: offsetValue.x, y: offsetValue.y}}>
          <Handler color={color.toString()} />
        </Transform>
        <div
          className="color-picker-panel-palette-main"
          style={{
            backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
            backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
          }}
        >

        </div>
      </div>
  )
}
