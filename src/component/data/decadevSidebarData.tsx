import { BiGridAlt } from "react-icons/bi"
import { AiOutlineUser } from "react-icons/ai"
// import { RiUserSettingsLine } from "react-icons/ri"

const decadevSidebarData = [
 {
  id: 0,
  link: "/decadev-dashboard/overview",
  icon: <BiGridAlt style={{ fontSize: '1.5rem' }} />,
  name: 'Dashboard'
 },
 {
  id: 1,
  link: "/decadev-dashboard/performance-tracker",
  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.6 4.7998H19.9999V10.3997H21.6V4.7998Z" fill="#21334F"/>
  <path d="M18.4001 2.3999H16.8V10.3998H18.4001V2.3999Z" fill="#21334F"/>
  <path d="M15.1999 7.2002H13.6001V10.4001H15.1999V7.2002Z" fill="#21334F"/>
  <path d="M12 11.9999V2.3999C6.69818 2.3999 2.40002 6.69806 2.40002 11.9999C2.40002 17.3015 6.69818 21.5999 12 21.5999C17.3016 21.5999 21.6 17.3015 21.6 11.9999H12ZM10.3999 4.1603V12.4686L5.80946 17.0593C4.67978 15.6796 4.0001 13.9177 4.0001 11.9999C4.0001 8.13662 6.75314 4.9043 10.3999 4.1603ZM12 19.9998C10.0817 19.9998 8.32034 19.3201 6.94058 18.1905L11.5311 13.6H19.8389C19.0961 17.2468 15.8633 19.9998 12 19.9998Z" fill="#21334F"/>
  </svg>
  ,
  name: 'Performance Report'
 }
]

export default decadevSidebarData