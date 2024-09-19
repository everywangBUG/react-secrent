import React, { CSSProperties, ReactNode, useEffect, useMemo } from "react"
import { useStore } from "./useStore"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import s from "./MessageProvider.module.scss"
import "./MessageProvider.scss"
import { createPortal } from "react-dom"

export type Position = "top" | "bottom"

export interface MessageProps {
  style?: CSSProperties
  className?: string
  content: ReactNode
  duration?: number
  id?: number
  position?: Position
}

export const MessageProvider: React.FC<{}> = () => {

  const { messageList, add, update, remove, clearAll } = useStore("top")

  useEffect(() => {
    setInterval(() => {
      add({
        content: Math.random().toString().slice(2, 8)
      })
    }, 2000000)
  }, [])

  const positions = Object.keys(messageList) as Position[]

  const messageWrapper =
    <div className={s["message-wrapper"]}>
      {
        positions.map(direction => (
          <TransitionGroup className={s[`message-wrapper-${direction}`]} key={direction}>
            {
              messageList[direction].map(item => {
                return <CSSTransition key={item.id} timeout={300} classNames="message">
                  <div style={{width: 100, lineHeight: "30px", border: "1px solid #000", margin: "20px"}}>
                    {item.content}
                  </div>
                </CSSTransition>
              })
            }
          </TransitionGroup>
        ))
      }
    </div>

    const el = useMemo(() => {
      const el = document.createElement("div")
      el.className = "wrapper"
      document.body.appendChild(el)
      return el
    }, [])

  return createPortal(messageWrapper, el)
}
