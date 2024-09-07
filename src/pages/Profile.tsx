import { CreateIconFont } from "../components/Icon/CreateIconFont"
import { IconAdd } from "../components/IconsShape/IconAdd"
import { IconEmail } from "../components/IconsShape/IconEmail"
import { Space } from "../components/Space/Space"

const IconFont = CreateIconFont("//at.alicdn.com/t/c/font_4676376_65g5ppi9wye.js")

export const Profile: React.FC = () => {
  return (
    <div>
      <Space direction="horizontal" align="end" className="container" wrap={true} size={["large", "small"]} split={<div color-red>|</div>}>
        <IconAdd style={{color: "skyblue", fontSize: "50px"}} />
        <IconEmail spin style={{color: "skyblue", fontSize: "50px"}} />
        <IconFont type="icon-adduser" fill="skyblue" size="40px" />
        <div>111</div>
        <div>222</div>
      </Space>
    </div>
  )
}
