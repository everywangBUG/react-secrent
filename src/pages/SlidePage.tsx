import { useState } from "react"
import { Slide } from "../components/Slide"

export const SlidePage: React.FC = () => {
  const [showRight, setShowRight] = useState(false)
  const [showDown, setShowDown] = useState(false)
  
  return (
    <>
      <button
        type="button"
        onClick={() => {setShowRight(true)}}
      >
        开启左边滑块
      </button>
      <Slide
        isVisible={showRight}
        from="right"
        className="bg-blue-2"
        style={{ border: "1px solid pink" }}
        onEnter={() => alert("左边进入")}
        onExit={() => alert("左边退出")}
      >
        <div>
          <button type='button' onClick={() => {setShowRight(false)}}>
            关闭左边滑块
          </button>
        </div>
      </Slide>
      <button
        type="button"
        onClick={() => {setShowDown(true)}}
      >
        开启下面滑块
      </button>
      <Slide 
        isVisible={showDown}
        from="down"
        className="bg-red-2"
        style={{ border: "1px solid skyblue"}}
      >
        <div>
          <button type='button' onClick={() => {setShowDown(false)}}>
            关闭下面滑块
          </button>
        </div>
      </Slide>
    </>
  )
}
