import React from "react"
import c from "classnames"
import "./Space.scss"

export type sizeType = "small" | "middle" | "large" | number | undefined

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
  size?: sizeType | [sizeType, sizeType]
  direction?: "horizontal" | "vertical"
  align?: "start" | "end" | "center" | "baseline"
  split?: React.ReactNode
  wrap?: boolean
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
}

const getNumberSize = (size: sizeType): number => {
  return typeof size === "string" && size in spaceSize ? spaceSize[size] : Number(size)
}

export const Space: React.FC<SpaceProps> = (props) => {
  const { className, style, size, direction, align, wrap = false, split, ...otherProps } = props
  const mergeAlign = direction === "horizontal" && align === undefined ? "center" : align
  const cn = c(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergeAlign}`]: mergeAlign
    },
    className
  )
  // 对 children 做扁平化，防止sort的时候报错
  const childrenNodes = React.Children.toArray(props.children)
  const nodes = childrenNodes.map((child: any, index) => {
    const key = child && child.key || `space-item-${index}`
    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {
          split && index < childrenNodes.length - 1 && (
            <div className={`${className}-split`} key={`space-split-${index}`} style={style}>
              {split}
            </div>
          )
        }
      </>
    )
  })
  const otherStyles: React.CSSProperties = {}
  const [horizontalSize, verticalSize] = React.useMemo(() => (
    ((Array.isArray(size) ? size : [size, size]) as [sizeType, sizeType]).map(item => getNumberSize(item))
  ), [size])
  otherStyles.columnGap = horizontalSize
  otherStyles.rowGap = verticalSize
  if (wrap) {
    otherStyles.flexWrap = "wrap"
  }
  return (
    <div
      className={cn}
      style={{
        ...style,
        ...otherStyles
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  )
}
