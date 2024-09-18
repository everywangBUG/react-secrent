import React, { CSSProperties, ReactNode } from "react"

export type Position = "top" | "bottom"

export interface MessageProps {
  style?: CSSProperties
  className?: string
  content: ReactNode
  duration?: number
  id?: number
  position?: Position
}

export const Message: React.FC = () => {
  return (
    <div>Message</div>
  )
}
