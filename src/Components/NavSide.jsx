import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/react.svg";
import { LogOutIcon } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // adjust to your Firebase config path

const NavSide = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="hidden md:block bg-white md:w-1/4 rounded-2xl h-fit p-6">
      <NavLink to={"/"}>
        <img src={logo} alt="Logo" />
      </NavLink>
      <p>This is good</p>
      <button
        onClick={handleLogout}
        className="flex gap-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 
                   focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                   text-sm p-2 px-6 text-center w-fit"
      >
        Logout <span><LogOutIcon /></span>
      </button>
    </div>
  );
};

export default NavSide;
