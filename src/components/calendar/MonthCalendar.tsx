import { Dayjs } from "dayjs"
import { CalendarProps } from "./Calendar"
import { useContext } from "react"
import LocaleContext from "./localContext"
import allLocales from "./local"
import s from "./MonthCalendar.module.scss"

interface MonthCalendarProps extends CalendarProps {
  selectedHandle: (date: Dayjs) => void
  curMonth: Dayjs
}

const getAllDays = (date: Dayjs) => {
  const startDate = date.startOf("month")
  const day = startDate.day()

  const daysInfo: Array<{date: Dayjs, isCurrentMonth: boolean}> = new Array(6 * 7)
  Array.from({length: day}).forEach((_, i) => {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      isCurrentMonth: false
    }
  })
  Array.from({length: daysInfo.length}).forEach((_, i) => {
    const calcDate = startDate.add(i - day, "day")
    daysInfo[i] = {
      date: startDate.add(i - day, "day"),
      isCurrentMonth: calcDate.month() === date.month()
    }
  })

  return daysInfo
}


export const MonthCalendar: React.FC<MonthCalendarProps> = (props) => {
  const { dateRender, dateInnerContent, value, selectedHandle, curMonth } = props
  const weekList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]
  
  const allDays = getAllDays(curMonth)
  const renderDays = (
    days: Array<{date: Dayjs, isCurrentMonth: boolean}>,
  ) => {
    const rows = []
    for (let i = 0; i < 6; i++) {
      const row = []
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j]
        row[j] =
        <div
          key={j}
          className={item.isCurrentMonth ? s.thisMonth : s.otherMonth}
          flex-1 b-1px b-solid b="#eee" cursor-pointer="true"
          onClick={() => selectedHandle(item.date)}
        >
          {
            dateRender
            ?
            dateRender(item.date)
            :
            (
              <>
                <div p-10px>
                  <span className={value?.toISOString() === item.date.toISOString() ? s.selectedDate : ""}>
                    {item.date.date()}
                  </span>
                </div>
                <div p-10px>{dateInnerContent?.(item.date)}</div>
              </>
            )
          }
        </div>
      }
      rows.push(row)
    }
    return rows.map((row, i) => <div key={i} h-100px flex flex-row>{row}</div>)
  }

  return (
    <>
      <div flex w-full justify-evenly box-border b-1px b-solid b="#ccc" overflow-hidden>
        {
          weekList.map(week =>
            <div key={week} p-y-20px p-x-16px color="#7d7ddf" flex-1 text-center>
              {CalendarLocale.week[week]}
            </div>)
        }
      </div>
      <div>
        {renderDays(allDays)}
      </div>
    </>
  )
}
