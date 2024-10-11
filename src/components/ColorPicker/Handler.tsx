import classNames from "classnames"

type HandlerSize = "small" | "default"

interface HandlerProps {
  size?: HandlerSize
  color?: string
}

export const Handler: React.FC<HandlerProps> = ({ size = "default", color }) => {

  return (
    <div
      className={classNames("color-picker-panel-palette-handler", {
        ["color-picker-panel-palette-handler-sm"]: size === "small",
      })}
      style={{
        backgroundColor: color,
      }}
    >
    </div>
  )
}


