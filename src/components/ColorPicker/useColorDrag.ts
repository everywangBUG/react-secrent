import { useEffect, useRef, useState } from "react"
import { TransformOffset } from "./Transform"
import { Color } from "./Color";

type EventType =
  | MouseEvent
  | React.MouseEvent<Element, MouseEvent>

type EventHandle = (e: EventType) => void;

interface useColorDragProps {
  color?: Color
  offset?: TransformOffset
  containerRef: React.RefObject<HTMLDivElement>
  targetRef: React.RefObject<HTMLDivElement>
  direction?: "x" | "y"
  onDragChange?: (offset: TransformOffset) => void
  calculate?: () => TransformOffset
}

export const useColorDrag = (props: useColorDragProps): [TransformOffset, EventHandle] => {
  const { offset, containerRef, targetRef, direction, onDragChange, color, calculate } = props
  
  const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 })

  const dragRef = useRef({ flag: false })

  useEffect(() => {
    if (!dragRef.current.flag) {
      const calcOffset = calculate?.()
      if (calcOffset) {
        setOffsetValue(calcOffset)
      }
    }
  }, [color])

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