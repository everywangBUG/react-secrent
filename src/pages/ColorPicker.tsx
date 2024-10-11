import { ColorPicker } from "../components/ColorPicker/ColorPicker"
import { ColorPicker as AntdColorPicker } from "antd"

export const ColorPickerPage: React.FC = () => {
  return (
    <>
      <ColorPicker />
      <AntdColorPicker />
    </>
  )
}
