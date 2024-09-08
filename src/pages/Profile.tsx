import { CreateIconFont } from "../components/Icon/CreateIconFont"
import { IconAdd } from "../components/IconsShape/IconAdd"
import { IconEmail } from "../components/IconsShape/IconEmail"
import { Space } from "../components/Space/Space"
import { ConfigProvider } from "../components/Space/SpaceProvider"


const IconFont = CreateIconFont("//at.alicdn.com/t/c/font_4676376_65g5ppi9wye.js")

export const Profile: React.FC = () => {
  return (
    <div>
      <ConfigProvider space={{size: 20}}>
        <Space direction="horizontal" align="end" className="container" wrap={true} split={<div color-red>|</div>}>
          <IconAdd style={{color: "skyblue", fontSize: "50px"}} />
          <IconEmail spin style={{color: "skyblue", fontSize: "50px"}} />
          <IconFont type="icon-adduser" fill="skyblue" size={"50px"}/>
          <div>111</div>
          <div>222</div>
        </Space>
      </ConfigProvider>
    </div>
  )
}
