import { Color } from "./Color"
import "./Palette.scss"

export const Palette: React.FC<{color: Color}> = ({color}) => {
  return (
    <div
        className="color-picker-panel-palette"
        style={{
          backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
          backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
        }}
      >
      </div>
  )
}
