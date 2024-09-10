import React, { ReactElement } from "react"
import copy from "copy-to-clipboard"

interface CopyToClipboardProps {
  text: string
  onCopy?: (text: string, result: boolean) => void
  children: ReactElement
  options?: {
    debug?: boolean
    message?: string
    format?: string
  }
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = (props) => {
  const { text, onCopy, children, options } = props
  
  const elem = React.Children.only(children)

  const onClick = (e: MouseEvent) => {
    const elem = React.Children.only(children)

    const result = copy(text, options)

    if (onCopy) {
      onCopy(text, result)
    }

    if (typeof elem?.props?.onClick === "function") {
      elem.props.onClick(e)
    }
  }

  return React.cloneElement(elem, { onClick })
}
