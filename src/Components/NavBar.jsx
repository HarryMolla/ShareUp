import { Navigate, NavLink } from "react-router";
import logo from "../assets/react.svg";
import { LucideArrowDownNarrowWide, PlusIcon, PodcastIcon } from "lucide-react";

const NavBar = () => {

  return (
    <div className="flex justify-between bg-white py-3 md:px-40 px-2 items-center shadow-xs">
      <NavLink to={"/"}>
        <img src={logo} alt="Logo" />
      </NavLink>
      <div className="flex gap-8">
       <NavLink
      to="/guide"
      className="text-gray-500 font-semibold py-2 hover:text-green-500"
    >
    Guide
    </NavLink>

        <NavLink
  to="/contact"
 className="text-gray-500 font-semibold py-2 hover:text-green-500"
    >
  Contact
</NavLink>
        <NavLink
          to={"/about"}
          className="text-gray-500 font-semibold py-2 hover:text-green-500"
    >
          About Us
        </NavLink>
      </div>

      <NavLink
        to={"/login"}
        className={
          "px-4 py-2 border-2 hover:border-2  border-gray-400 hover:border-green-500 hover:bg-green-500  text-gray-400 hover:text-white font-bold rounded-md "
        }
      >
         <p className="flex gap-2"><PlusIcon /> Add Product</p>
      </NavLink>
    </div>
  );
};

export default NavBar;
