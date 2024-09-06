import React from "react"
import { Icon, IconProps } from "./Icon"

const loadedSet = new Set<string>()

export const CreateIconFont = (scriptUrl: string) => {
  if (
    typeof scriptUrl === "string"
    && scriptUrl.length
    && !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement("scr  ipt")
    script.setAttribute("src", scriptUrl)
    script.setAttribute("data-namespace", scriptUrl)
    document.body.appendChild(script)

    loadedSet.add(scriptUrl)
  }

  console.log(111, "placeholder")
  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props

    return (
      <Icon {...rest} ref={ref}>
        { type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    )
  })

  return Iconfont
}