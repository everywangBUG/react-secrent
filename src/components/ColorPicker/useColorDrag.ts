import { useEffect, useRef, useState } from "react"
import { TransformOffset } from "./Transform"

type EventType =
  | MouseEvent
  | React.MouseEvent<Element, MouseEvent>

type EventHandle = (e: EventType) => void;

interface useColorDragProps {
  offset?: TransformOffset
  containerRef: React.RefObject<HTMLDivElement>
  targetRef: React.RefObject<HTMLDivElement>
  direction?: "x" | "y"
  onDragChange?: (offset: TransformOffset) => void

}

export const useColorDrag = (props: useColorDragProps): [TransformOffset, EventHandle] => {
  const { offset, containerRef, targetRef, direction, onDragChange } = props
  
  const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 })

  const dragRef = useRef({ flag: false })

  useEffect(() => {
    document.removeEventListener("mousemove", onDragMove)
    document.removeEventListener("mouseup", onDragEnd)
  }, [])

  const onDragStart: EventHandle = (e) => {
    document.addEventListener("mousemove", onDragMove)
    document.addEventListener("mouseup", onDragEnd)

    dragRef.current.flag = true
  }

  // 拖动过程的offset计算
  const updateOffset: EventHandle = e => {
    const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop;

    const pageX = e.pageX - scrollXOffset;
    const pageY = e.pageY - scrollYOffset;

    const { 
        x: rectX,
        y: rectY,
        width,
        height
    } = containerRef.current!.getBoundingClientRect();

    const { 
        width: targetWidth,
        height: targetHeight
    } = targetRef.current!.getBoundingClientRect();

    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;

    const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
    const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;

    const calcOffset = {
        x: offsetX,
        y: direction === 'x' ? offsetValue.y : offsetY,
    };

    setOffsetValue(calcOffset);
    onDragChange?.(calcOffset);
  };

  const onDragMove: EventHandle = (e) => {
    e.preventDefault()
    updateOffset(e)
  }

  const onDragEnd: EventHandle = (e) => {
    e.preventDefault()
    document.removeEventListener("mousemove", onDragMove)
    document.removeEventListener("mouseup", onDragEnd)

    dragRef.current.flag = false
  }

  return [offsetValue, onDragStart]
}