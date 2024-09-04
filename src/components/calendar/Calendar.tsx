export const Calendar: React.FC = () => {
  const weekMap = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <div flex w-full>
      {weekMap.map(week => <div key={week}>{week}</div>)}
    </div>
  )
}
