import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/react.svg";
import { AppWindow, LogOutIcon } from 'lucide-react';
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
    <div className="hidden md:block bg-white md:w-1/4 rounded-2xl h-screen p-6 sticky top-0">
      <div className='grid grid-cols-1 justify-items-center gap-8'>
        <div className='grid grid-cols-1 gap-3'>
            <NavLink to={"/"}>
        <img src={logo} alt="Logo" className='w-20 h-auto flex'/>
      </NavLink>
      <p>This is good</p>
        </div>
      <div className='h-0.5 w-full rounded-full bg-gray-50'></div>
      <div className='grid grid-cols-1 gap-1 w-full px-2'>
        <NavLink to={''}>
          <p className='p-3 text-green-50 bg-green-500 w-full text-center rounded-lg font-medium gap-2 flex'>
            <span><AppWindow></AppWindow></span>Somthing
          </p>
        </NavLink>
        <NavLink to={''}>
          <p className='p-3 text-green-950 hover:text-green-50 hover:bg-green-400 w-full text-center rounded-lg font-medium gap-2 flex'>
            <span><AppWindow></AppWindow></span>Somthing
          </p>
        </NavLink>
        <NavLink to={''}>
          <p className='p-3 text-green-950 hover:text-green-50 hover:bg-green-400 w-full text-center rounded-lg font-medium gap-2 flex'>
            <span><AppWindow></AppWindow></span>Somthing
          </p>
        </NavLink>
        <NavLink to={''}>
          <p className='p-3 text-green-950 hover:text-green-50 hover:bg-green-400 w-full text-center rounded-lg font-medium gap-2 flex'>
            <span><AppWindow></AppWindow></span>Somthing
          </p>
        </NavLink>
       
        <button
        onClick={handleLogout}
        className="flex gap-2 text-white bg-red-500 hover:bg-red-600
                font-medium rounded-lg 
                   text-sm py-3 text-center w-full justify-center"
      >
        Logout <span><LogOutIcon /></span>
      </button>
      </div>
      </div>
    </div>
  );
};

export default NavSide;
