import { CSSProperties, useState } from "react"
import cs from "classnames"
import { Color } from "./Color.ts"
import type { ColorType } from "./interface.ts"
import { Palette } from "./Palette.tsx"

export interface ColorPickerPanel {
  className?: string
  style?: CSSProperties
  value?: ColorType
  onChange?: (color: Color) => void
}

export const ColorPickerPanel: React.FC<ColorPickerPanel> = (props) => {
  const { className, style, value, onChange } = props
  const [colorValue, setColorValue] = useState<Color>(() => {
    if (value instanceof Color) {
      return value
    }
    return new Color(value)
  })

  const classNames = cs("color-picker", className)
  
  return (
    <div className={classNames} style={style}>
      <Palette color={colorValue}/>
    </div>
  )
}
