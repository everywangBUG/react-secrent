import { useEffect, useState } from "react"
import { WatermarkProps } from "./Watermark"
export type WatermarkOptions = Omit<WatermarkProps, "className" | "style" | "children">
import { merge } from "lodash-es"

export const useWatermark = (params: WatermarkOptions) => {
  const [options, setOptions] = useState(params || {})

  const drawWatermark = () => {

  }

  useEffect(() => {
    drawWatermark()
  }, [options])

  return {
    generateWatermark: (newOptions: WatermarkOptions) => {
      setOptions(merge({}, options, newOptions))
    },
    destory: () => {
      
    }
  }
}