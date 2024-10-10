import { useEffect, useState } from "react"
import { Mask } from "../components/OnBoarding/Mask"
import { Popover } from "../components/Popover"

export const OnBoarding: React.FC = () => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  
  useEffect(() => {
    // 确保 DOM 已经加载完成
    const targetElement = document.getElementById("xxx")
    if (targetElement) {
      setElement(targetElement)
    } else {
      console.error("Element with ID 'xxx' not found.")
    }
  }, [])

  return (
    <>
    {
      element && 
      <Mask
        element={element}
        renderMaskContent={() => {
          return <Popover
            open={true}
            content={
              <div style={{width: 300}}>
                <p>hello</p>
                <button b-none>下一步</button>
              </div>
            }
          />
      }}
      />
    }
      <div id="xxx" w-100 m-auto>
        OnBoarding
        <div>1111</div>
        <div>2222</div>
        <div>3333</div>
      </div>
    </>
  )
}
