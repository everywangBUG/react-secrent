import React, { CSSProperties, ReactNode, useMemo, forwardRef } from "react"
import { useStore } from "./useStore"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import s from "./MessageProvider.module.scss"
import "./MessageProvider.scss"
import { createPortal } from "react-dom"
import { useTimer } from "./useTimer"

export type Position = "top" | "bottom"

export interface MessageProps {
  style?: CSSProperties
  className?: string
  content: ReactNode
  onClose?: (...args: any) => void
  duration?: number
  id?: number
  position?: Position
}

export const MessageItem: React.FC<MessageProps> = (props) => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: props.id!,
    duration: props.duration,
    remove: props.onClose!
  })

  return (
    <div className={s["message-item"]} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {props.content}
    </div>
  )
}


export interface MessageRef {
  add: (props: MessageProps) => void
  update: (id: number, props: MessageProps) => void
  remove: (id: number) => void
  clearAll: () => void
}

export const MessageProvider: React.FC<{}> = forwardRef<MessageRef, {}>((props, ref) => {

  const { messageList, add, update, remove, clearAll } = useStore("top")

  // useEffect(() => {
  //   setInterval(() => {
  //     add({
  //       content: Math.random().toString().slice(2, 8) 
  //     })
  //   }, 4000)
  // }, [])

  if ("current" in ref!) {
    ref.current= {
      add,
      update,
      remove,
      clearAll
    }
  }
  
  // useImperativeHandle(ref, () => {
  //   return {
  //     add,
  //     update,
  //     remove,
  //     clearAll
  //   }
  // }, [])

  const positions = Object.keys(messageList) as Position[]

  const messageWrapper =
    <div className={s["message-wrapper"]}>
      {
        positions.map(direction => (
          <TransitionGroup className={s[`message-wrapper-${direction}`]} key={direction}>
            {
              messageList[direction].map(item => {
                return <CSSTransition key={item.id} timeout={300} classNames="message">
                  <MessageItem {...item} onClose={remove} />
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
})
