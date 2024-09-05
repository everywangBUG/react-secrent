import dayjs, { Dayjs } from "dayjs"
import { Calendar } from "../components/calendar/Calendar"
import { useState } from "react"

export const Home: React.FC = () => {
  const [value, setValue] = useState<Dayjs>(dayjs())
  return (
    <div>
      {/* 非受控模式 */}
      <Calendar
        value={dayjs("2024-09-05")}
        dateInnerContent={(value) => {
          return <div h-30px>{value.format("YYYY-MM-DD")}</div>
        }}
        // dateRender={(value) => {
        //   return <div>{value.format("YYYY-MM-DD")}</div>
        // }}
        onChange={(date) => {
          console.log(date.format("YYYY-MM-DD"))
        }}
        locale="en-US"
      />
      {/* 受控模式 */}
      <Calendar 
        value={value}
        onChange={(val) => {
          setValue(val)
        }}
      />
    </div>
  )
}
