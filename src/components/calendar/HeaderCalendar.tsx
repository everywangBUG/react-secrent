import dayjs, { Dayjs } from "dayjs"
import LocaleContext from "./localContext"
import { useContext } from "react"
import allLocales from "./local"

interface HeaderCalendarProps {
  curMonth: Dayjs
  handlePrevMonth: () => void
  handleNextMonth: () => void
  handleToday: () => void
}

export const HeaderCalendar: React.FC<HeaderCalendarProps> = (props) => {
  const { curMonth, handlePrevMonth, handleNextMonth, handleToday } = props
  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]

  return (
    <div flex gap-x-30px p-y-10px items-center>
      <div w-28px h-28px cursor-pointer hover:bg="#ccc" text-center onClick={handlePrevMonth}>&lt;</div>
      <div font-700>{dayjs(curMonth).format(CalendarLocale.formatMonth)}</div>
      <div w-28px h-28px cursor-pointer hover:bg="#ccc" text-center onClick={handleNextMonth}>&gt;</div>
      <button type="button" b-none p-x-10px hover:bg="#ccc" onClick={handleToday}>{CalendarLocale.today}</button>
    </div>
  )
}
