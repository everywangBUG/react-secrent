import { useCallback, useEffect, useRef } from "react"


export const useTimeout = (fn: () => void, delay?: number) => {
  const fnRef = useRef<Function>(fn)

  // 保存回调函数，每次调用更新，避免闭包陷阱
  fnRef.current = fn

  const timeRef = useRef<number>()

  const clear = useCallback(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }
  }, [])

  useEffect(() => {
    timeRef.current = setTimeout(fnRef.current, delay)

    return clear
  }, [delay])

  return clear
}