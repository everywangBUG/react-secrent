import {
  useHover,
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  offset,
  arrow,
  flip,
  FloatingArrow,
  Side,
  AlignedPlacement } from "@floating-ui/react"
import { PropsWithChildren, useRef, useState, CSSProperties, ReactNode } from "react"

interface PopoverProps extends PropsWithChildren {
  content: ReactNode,
  trigger?: "hover" | "click"
  placement?: Side | AlignedPlacement,
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
  className?: string;
  style?: CSSProperties
}

export const Popover: React.FC<PopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { content, trigger = "hover", placement, open, onOpenChange, className, style } = props
  const arrowRef = useRef(null)


  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right",
    // 弹窗和父元素之前的间隔
    middleware: [
      offset(20),
      arrow({ element: arrowRef }),
      flip()
    ],
  })

  const interaction = trigger === "hover" ? useHover(context) : useClick(context)


  const dismiss = useDismiss(context)
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    interaction,
    dismiss
  ])

  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()}>
        hello
      </button>
      {
        isOpen &&
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {content}
          <FloatingArrow ref={arrowRef} context={context} fill="#fff" stroke="#000" strokeWidth={1} />
        </div>
      }
    </div>
  )
}
