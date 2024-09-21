import { useHover, useFloating, useInteractions, useClick, useDismiss, offset, arrow } from "@floating-ui/react"
import { useState } from "react"

export const Popover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right",
    middleware: [
      offset(5),
      arrow({ element: arrowRef })
    ]
  })

  // const hover = useHover(context)
  const click = useClick(context)
  const dismiss = useDismiss(context)
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
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
          你好你好
        </div>
      }
    </div>
  )
}
