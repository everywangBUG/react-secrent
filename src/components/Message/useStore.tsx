import { useState } from "react"
import { Position, MessageProps } from "./Message"

type MessageList = {
  top: MessageProps[]
  bottom: MessageProps[]
}

const initialState = { top: [], bottom: [], left: [], right: [] }

/**
 * 管理message消息列表
 * @param defaultPosition 默认位置
 * @returns 
 */
export const useStore = (defaultPosition: Position) => {
  const [messageList, setMessageList] = useState<MessageList>({ ...initialState })

  return {
    messageList,
    add: (messageProps: MessageProps) => {
      const id = getId(messageProps)
      setMessageList(prev => {
        const position = messageProps.position || defaultPosition
        return {
          ...prev,
          [position]: [...prev[position], { ...messageProps, id }]
        }
      })
      return id
    },
    remove: (id: number) => {
      setMessageList(prev => {
        return {
          ...prev,
          [defaultPosition]: prev[defaultPosition].filter(item => item.id !== id)
        }
      })
    },
    update: (id: number, MessageProps: MessageProps) => {
      if (!id) return
      setMessageList(prev => {
      })
    },
    clearAll: () => {
      
    }
  }
}

/**
 * 获取id和count
 * @param messageProps messageProps
 * @returns 
 */
let count = 0
const getId = (messageProps: MessageProps) => {
  if (messageProps.id) {
    return messageProps.id
  }
  count += 1
  return count
}
