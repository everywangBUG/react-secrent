import { useState } from "react"
import { Slide } from "../components/Slide"

export const SlidePage: React.FC = () => {
  const [show, setShow] = useState(false)
  
  return (
    <>
      <button
        type="button"
        onClick={() => {setShow(true)}}
      >
        开启
      </button>
      <Slide 
        isVisible={show}
        from="right"
      >
        <div>
          <button type='button' onClick={() => {setShow(false)}}>
            关闭
          </button>
        </div>
      </Slide>
    </>
  )
}
