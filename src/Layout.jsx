import { Outlet } from "react-router"
import NavBar from "./Components.jsx/NavBar"


const Layout = () => {
  return (
    <div className="bg-green-50/50 flex-0 h-screen py-1 w-full ">
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default Layout