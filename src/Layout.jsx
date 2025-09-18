import { Outlet } from "react-router"
import NavBar from "./Components/NavBar"


const Layout = () => {
  return (
    <div className="bg-gray-50 flex-1 h-full w-full ">
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default Layout