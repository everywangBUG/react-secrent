import { useState } from "react"
import { Position, MessageProps } from "./MessageProvider"

type MessageList = {
  top: MessageProps[]
  bottom: MessageProps[]
}

const initialState = { top: [], bottom: [] }

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
      setMessageList((preState) => {
        if (messageProps?.id) {
          const position = getMessagePosition(messageProps.id, preState)
          if (position) return preState
        }

        const position = messageProps.position || defaultPosition
        const isTop = position.includes("top")
        const messages = isTop
          ? [{ ...messageProps, id }, ...(preState[position] ?? [])]
          : [...(preState[position] ?? []), { ...messageProps, id }]

        return {
          ...preState,
          [position]: messages,
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
    update: (id: number, messageProps: MessageProps) => {
      if (!id) return
      setMessageList(prev => {
        const nextState = { ...prev }
        const { position, index } = findMessage(id, messageList)
        if (position && index !== -1) {
          nextState[position][index] = {
            ...nextState[position][index],
            ...messageProps
          }
        }
        return nextState
      })
    },
    clearAll: () => {
      setMessageList(initialState)
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

/**
 * 遍历top和bottom的数组，查找有没有对应的Message
 * @param id 弹窗id
 * @param messageList 弹窗列表
 * @returns
 */
export const getMessagePosition = (id: number, messageList: MessageList) => {
  for(const [position, list] of Object.entries(messageList)) {
    if (list.find(item => item.id === id)) {
      return position as Position
    }
  }
}

/**
 * 
 * @param id 
 * @param messageList 
 * @returns 
 */
export const findMessage = (id: numebr, messageList: MessageList) => {
  const position = getMessagePosition(id, messageList)
  const index = position ? messageList[position].findIndex(item => item.id === id) : -1
  return {
    position,
    index
  }
}
