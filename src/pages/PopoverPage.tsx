import { Popover } from "../components/Popover"

export const PopoverPage: React.FC = () => {
  const popoverContent = <div>
    Hello World
    <button onClick={() => {alert(1)}}>111</button>
  </div>

  return <Popover
    content={popoverContent}
    placement='bottom'
    trigger='click'
    style={{margin: "200px"}}
  >
    <button>点我点我</button>
  </Popover>
}
