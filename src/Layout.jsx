import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-gray-50 flex-1 h-full w-full">
      {!shouldHideNavbar && <NavBar />}
      <Outlet />
    </div>
  );
};

export default Layout;
