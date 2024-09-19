import { useMessage } from "../components/Message/useMessage"
import { ConfigProvider } from "../components/Message/ConfigProvider"

export const Aaa: React.FC = () => {
  const message = useMessage()
  
  return (
      <button onClick={() => {
        message.add({
          content: "成功",
          duration: 2000
        })
      }}>
        成功
      </button>
  )
}


export const Message: React.FC = () => {
  return (
    <ConfigProvider>
      <Aaa />
    </ConfigProvider>
  )
}
