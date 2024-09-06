import { CreateIconFont } from "../components/Icon/CreateIconFont"
import { IconAdd } from "../components/IconsShape/IconAdd"
import { IconEmail } from "../components/IconsShape/IconEmail"

const IconFont = CreateIconFont("//at.alicdn.com/t/c/font_4676376_65g5ppi9wye.js")

export const Profile: React.FC = () => {
  return (
    <div>
      <IconAdd style={{color: "skyblue", fontSize: "50px"}} width={"100px"} height={"100px"} />
      <IconEmail spin style={{color: "skyblue", fontSize: "50px"}} width={"100px"} height={"100px"} />
      <IconFont type="icon-adduser" fill="skyblue" size="40px" />
    </div>
  )
}
