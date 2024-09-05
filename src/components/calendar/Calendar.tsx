import dayjs, { Dayjs } from "dayjs"
import { MonthCalendar } from "./MonthCalendar"
import { HeaderCalendar } from "./HeaderCalendar"
import { CSSProperties, ReactNode, useState } from "react"
import LocaleContext from "./localContext"
import { useControllableValue } from "ahooks"

export interface CalendarProps {
  value?: Dayjs
  defaultValue?: Dayjs
  style?: CSSProperties
  className?: string
  // 定制日期，覆盖全部的单元格
  dateRender?: (currentDate: Dayjs) => ReactNode
  // 定制日期单元格，内容添加到单元格内，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  // 国际化
  locale?: string
  onChange?: (date: Dayjs) => void
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const { className, style, locale, onChange } = props
  const [curDate, setCurDate] = useControllableValue<Dayjs>(props, { defaultValue: dayjs() })
  const [curMonth, setCurMonth] = useState<Dayjs>(curDate)
  
  const changeDate = (date: Dayjs) => {
    setCurDate(date)
    setCurMonth(date)
    onChange?.(date)
  }
  
  const selectedHandler = (date: Dayjs) => {
    changeDate(date)
  }

  const handleNextMonth = () => {
    setCurMonth(curMonth.add(1, "month"))
  }

  const handlePrevMonth = () => {
    setCurMonth(curMonth.subtract(1, "month"))
  }

  const handleToday = () => {
    const date = dayjs(new Date())
    changeDate(date)
  }

  return (
    <LocaleContext.Provider value={{locale: locale || navigator.language}}>
      <div className={className} style={style}>
        <HeaderCalendar curMonth={curMonth} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} handleToday={handleToday}/>
        <MonthCalendar {...props} value={curDate} selectedHandle={selectedHandler} curMonth={curMonth} />
      </div>
    </LocaleContext.Provider>
  )
}
