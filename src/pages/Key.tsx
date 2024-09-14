import { useRef } from "react"
import { useSize } from "../hooks/useSize"

export const Key: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  
  return (
    <div ref={ref}>
      <p bg-orange>
        width: {size?.width}<br/>
        height: {size?.height}
      </p>
    </div>
  )
}
