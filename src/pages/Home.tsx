import dayjs from "dayjs"
import { Calendar } from "../components/calendar/Calendar"

export const Home: React.FC = () => {
  return (
    <div>
      <Calendar value={dayjs("2024-09-05")}
        // dateRender={(value) => {
        //   return <div>{value.format("YYYY-MM-DD")}</div>
        // }}
        dateInnerContent={(value) => {
          return <div h-30px>{value.format("YYYY-MM-DD")}</div>
        }}
        onChange={(date) => {
          console.log(date.format("YYYY-MM-DD"))
        }}
        locale="en-US"
      />
    </div>
  )
}
