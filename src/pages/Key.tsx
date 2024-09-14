import { useRef, useState } from "react"
import { useSize } from "../hooks/useSize"
import { useTimeout } from "../hooks/useTimeout"

export const Key: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  const [state, setState] = useState(1)
  useTimeout(() => {
    setState(state + 1)
  }, 2000)
  
  return (
    <div ref={ref}>
      <p bg-orange>
        width: {size?.width}<br/>
        height: {size?.height}
      </p>
      <span>state: {state}</span>
    </div>
  )
}
