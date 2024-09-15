// 浏览器提供了 MutationObserver 的 api，可以监听 dom 的变化，包括子节点的变化、属性的变化。
import { useEffect } from "react"

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ["style", "class"]
}

export const useMutateObserve = (
  targetNode: HTMLElement,
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!targetNode) { return }

    let instance: MutationObserver

    const nodeList = Array.isArray(targetNode) ? targetNode : [targetNode]

    if ("MutationObserver" in window) {
      instance = new MutationObserver(callback)

      nodeList.forEach(ele => {
        instance.observe(ele, options)
      })
    }

    return () => {
      instance?.takeRecords()
      instance?.disconnect()
    }
  }, [options, targetNode])
}

