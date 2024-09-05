import { Dayjs } from "dayjs"
import { MonthCalendar } from "./MonthCalendar"
import { HeaderCalendar } from "./HeaderCalendar"
import { CSSProperties, ReactNode } from "react"
import LocaleContext from "./LocalContext"

export interface CalendarProps {
  value: Dayjs
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
  const { className, style, locale } = props

  return (
    <LocaleContext.Provider value={{locale: locale || navigator.language}}>
      <div className={className} style={style}>
        <HeaderCalendar />
        <MonthCalendar {...props} />
      </div>
    </LocaleContext.Provider>
  )
}
