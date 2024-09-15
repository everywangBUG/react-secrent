
import { useCountDown } from "../hooks/useCountDown"
export const  CountDown: React.FC = () => {
  const [formattedRes, timeLeft] = useCountDown({
    targetDate: `${new Date().getFullYear()}-12-31 00:00:00`,
  })

  const { days, hours, minutes, seconds, milliseconds } = formattedRes

  return (
    <div>
      <p>距离今年年底还剩下{days}天{hours}小时{minutes}分{seconds}秒{milliseconds}毫秒</p>
    </div>
  )
}
