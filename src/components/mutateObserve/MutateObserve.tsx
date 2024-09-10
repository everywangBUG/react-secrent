import React, { cloneElement, useLayoutEffect, useState }  from "react"
import { useMutateObserve } from "./useMutateObserve"

interface MutationObserveProps {
  options?: MutationObserverInit
  onMutate?: (mutations: MutationRecord[], observe: MutationObserver) => void
  children: React.ReactElement
}

export const MutateObserve: React.FC<MutationObserveProps> = (props) => {
  const { options, onMutate = () => {}, children } = props

  const elementRef = React.useRef<HTMLElement>(null)
  
  const [target, setTarget] = useState<HTMLElement>()

  useMutateObserve(target!, onMutate, options)

  useLayoutEffect(() => {
    setTarget(elementRef.current!)
  }, [])

  if (!children) {
    return
  }

  return cloneElement(children, { ref: elementRef })
}

export default MutateObserve
