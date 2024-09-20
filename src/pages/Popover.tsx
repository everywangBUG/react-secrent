import { useHover, useFloating, useInteractions } from "@floating-ui/react"
import { useState } from "react"

export const Popover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })
  
  return (
    <div>
      <div ref={refs.setReference} className="bg-red-500 w-20 h-20">
      </div>
    </div>
  )
}
