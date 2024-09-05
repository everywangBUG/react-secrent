import dayjs from "dayjs"

export const HeaderCalendar: React.FC = () => {
  return (
    <div flex gap-x-30px p-y-10px items-center>
      <div w-28px h-28px cursor-pointer hover:bg="#ccc" text-center>&lt;</div>
      <div font-700>{dayjs(new Date()).format("YYYY-MM-DD")}</div>
      <div w-28px h-28px cursor-pointer hover:bg="#ccc" text-center>&gt;</div>
      <button type="button" b-none p-x-10px hover:bg="#ccc">今天</button>
    </div>
  )
}
