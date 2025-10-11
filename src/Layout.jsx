import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="md:bg-gray-100 bg-gray-100 flex-1 h-full w-full md:pt-20 pt-15">
      {!shouldHideNavbar && <NavBar />}
      <Outlet />
    </div>
  );
};

export default Layout;
