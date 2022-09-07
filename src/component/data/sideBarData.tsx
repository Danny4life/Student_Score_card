import { FiHome } from "react-icons/fi"
import { AiOutlineUser } from "react-icons/ai"
import { RiUserSettingsLine } from "react-icons/ri"

const sideBarData = [
 {
  id: 0,
  link: "/admin-dashboard/stack",
  icon: <FiHome />,
  name: 'Dashboard'
 },
 {
  id: 1,
  link: "/admin-dashboard/user",
  icon: <AiOutlineUser />,
  name: 'User Management'
 },
 {
  id: 2,
  link: "/admin-dashboard/create_admin",
  icon: <RiUserSettingsLine />,
  name: 'Admin Management'
 }
]

export default sideBarData