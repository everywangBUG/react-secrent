import React, { forwardRef } from "react"
import { IconProps, Icon } from "./Icon"

interface CreateIconOptions {
  content: React.ReactNode
  iconProps?: IconProps
  viewBox?: string | undefined
}

export const CreateIcon = (options: CreateIconOptions) => {
  const { content, iconProps, viewBox } = options

  return forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <Icon {...props} {...iconProps} viewBox={viewBox} ref={ref}>
      {content}
    </Icon>
  ))
}
