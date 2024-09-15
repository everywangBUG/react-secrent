import dayjs from "dayjs"
import { set } from "lodash-es"
import { useEffect, useMemo, useRef, useState } from "react"

export type TDate = dayjs.ConfigType

export interface Options {
  leftTime?: number
  targetDate?: TDate
  interval?: number
  onEnd?: () => void
}

export interface FormattedRes {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

const calcLeft = (target: TDate) => {
  if (!target) {
    return 0
  }

  const left = dayjs(target).valueOf() - Date.now()

  return left < 0 ? 0 : left
}

const parseMs = (ms: number): FormattedRes => {
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = Math.floor(ms %1000)
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

export const useCountDown = (options: Options = {}) => {
  const { leftTime = 0, targetDate = dayjs(), interval = 1000, onEnd = () => {} } = options

  const memeLeftTime = useMemo(() => {
    return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined
  }, [leftTime])

  const target = "leftTime" in options ? memeLeftTime : targetDate

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target))

  const onEndLeft = useRef(onEnd)
  onEndLeft.current = onEnd

  useEffect(() => {
    if (!target) {
      setTimeLeft(0)
      return
    }

    setTimeLeft(calcLeft(target))

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target)
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)
        onEndLeft.current?.()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, interval])

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft])


  return [formattedRes, timeLeft] as const
}