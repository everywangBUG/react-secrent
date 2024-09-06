import React from "react"

export type sizeType = "small" | "middle" | "large" | number | string

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
  size?: sizeType | [sizeType, sizeType]
  direction?: "horizontal" | "vertical"
  align?: "start" | "end" | "center" | "baseline"
  split?: React.ReactNode
  wrap?: boolean
}

export const Space: React.FC<SpaceProps> = (props) => {
  const { className, style, ...otherProps } = props
  // 对 children 做扁平化，防止sort的时候报错
  const childrenNodes = React.Children.toArray(props.children)
  const nodes = childrenNodes.map((child: any, index) => {
    const key = child && child.key || `space-item-${i}`
    return (
      <div className="space-item" key={key}>
        {child}
      </div>
    )
  })
  return (
    <div
      className={className}
      style={style}
      {...otherProps}
    >
      {nodes}
    </div>
  )
}
