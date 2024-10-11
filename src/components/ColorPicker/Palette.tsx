import { useRef } from "react"
import { Color } from "./Color"
import { Handler } from "./Handler"
import "./Palette.scss"
import { Transform } from "./Transform"

export const Palette: React.FC<{color: Color}> = ({color}) => {
  const transformRef = useRef<HTMLDivElement>(null)

  return (
    <div className="color-picker-panel-palette">
        <Transform ref={transformRef} offset={{x: 50, y: 50}}>
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
