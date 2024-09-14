import { useState } from "react"
import { useWhyDidYouUpdate } from "../hooks/useWhyDidYouUpdate"

export const Add: React.FC<{ count: number}> = (props) => {
  const [randomNum, setRandomNum] = useState(Math.random())
  
  useWhyDidYouUpdate("add", {...props, randomNum})

  return (
    <div>
      <span>number: {props.count}</span>
      random: {randomNum}
      <button onClick={() => setRandomNum(Math.random)}>设置随机state</button>
    </div>
  )
}

export const SuperAdd: React.FC = () => {
  return (
    <div>
      <Add count={1000} />
    </div>
  )
}
