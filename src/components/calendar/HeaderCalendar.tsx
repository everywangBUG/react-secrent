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
      <div w-28px h-28px cursor-pointer hover:bg-themeColor text-center rounded-2px leading-28px onClick={handlePrevMonth}>&lt;</div>
      <div font-700>{dayjs(curMonth).format(CalendarLocale.formatMonth)}</div>
      <div w-28px h-28px cursor-pointer hover:bg-themeColor text-center rounded-2px leading-28px onClick={handleNextMonth}>&gt;</div>
      <button type="button" cursor-pointer b-none p-x-10px p-y-2px hover:bg-themeColor rounded-2px onClick={handleToday}>{CalendarLocale.today}</button>
    </div>
  )
}
