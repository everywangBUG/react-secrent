import { Portal } from "../components/Portal" 
import { useRef, useEffect } from "react"

export const Foo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // 通过ref获取内部容器dom
  useEffect(() => {
    console.log(containerRef.current)
  }, [])

  const content = <div className="btn">
    <button type="button">按钮</button>
  </div>

  
  return (
    <Portal
      attach={document.body}
      ref={containerRef}>
      {content}
    </Portal>
  )
}
