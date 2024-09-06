import React, { PropsWithChildren, forwardRef} from "react"
import cs from "classnames"
import "./Icon.scss"

type BaseIconProps = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
}

export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }

  const width = (size as string) || "1em"
  const height = (size as string) || "1em"

  return [width, height]
}

export const Icon: React.FC = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
  const { className, style, size, spin, children, ...rest } = props
  const [width, height] = getSize(size)
  const cn = cs(className, "icon", {
    spin: !!spin,
  })
  
  return (
    <svg ref={ref} className={cn} style={style} fill="currentColor" width={width} height={height} {...rest}>
      {children}
    </svg>
  )
})
