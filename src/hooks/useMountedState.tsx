import { useCallback, useEffect, useRef } from "react"

/**
 * useEffect在dom操作之后异步执行，这个时候已经mount
 * @returns 返回一个函数，判断当前组件是否挂载
 */
export const useMountedState = () : () => boolean => {
  const mountedRef = useRef<boolean>(false) // 状态改变不会引起重新渲染
  const get = useCallback(() => mountedRef.current, []) // useCallback作为其他组件memo传参时候不会额外渲染

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])
  
  return get
}
