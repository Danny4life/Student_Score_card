import { AiOutlineUser } from "react-icons/ai"
import { GiPadlock } from "react-icons/gi"
import { FiLogOut } from "react-icons/fi"


const accountSettingsData = [
 {
  id: 0,
  link: '/admin-dashboard/profile',
  icon: <AiOutlineUser />,
  name: 'Profile'
 },
 {
  id: 1,
  link: '/admin-dashboard/change-password',
  icon: <GiPadlock />,
  name: 'Change Password'
 }
]

export default accountSettingsData