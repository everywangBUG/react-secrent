import enUS from "./en-US"
import zhCN from "./zh-cn"
import { CalendarType } from "./interface"

const allLocales: Record<string, CalendarType>= {
  "zh-CN": zhCN,
  "en-US": enUS
}

export default allLocales