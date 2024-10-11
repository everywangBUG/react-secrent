import React, { forwardRef } from "react"

export interface TransformOffset {
  x: number
  y: number
}

export interface TransformProps {
  children?: React.ReactNode
  offset?: TransformOffset
}

export const Transform = forwardRef<HTMLDivElement, TransformProps>((props, ref) => {
  const { offset, children } = props

  return (
     <div
        ref={ref}
        style={{
          position: "absolute",
          left: offset?.x ?? 0,
          top: offset?.y ?? 0,
          zIndex: 1,
        }}
     >
      {children}
     </div>
  )
})