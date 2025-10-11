import { useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/react.svg";
import { PlusIcon, MenuIcon, XIcon } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white absolute shadow-xs py-3 px-4 md:px-32 w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
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
            to="/about"
            className="text-gray-500 font-semibold py-2 hover:text-green-500"
          >
            About Us
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Add Product Button (Desktop) */}
          <NavLink
            to="/login"
            className="hidden md:flex px-4 py-2 border-2 border-gray-400 hover:border-green-500 hover:bg-green-500 text-gray-400 hover:text-white font-bold rounded-md items-center gap-2 text-sm transition-all duration-200"
          >
            <PlusIcon className="w-4 h-4" /> Add Product
          </NavLink>

          {/* Add Button (Mobile) */}
          <NavLink
            to="/login"
            className="md:hidden px-2 py-1 border border-gray-400 hover:border-green-500 hover:bg-green-500 text-gray-400 hover:text-white font-bold rounded flex items-center gap-1 text-sm transition-all duration-200"
          >
            <PlusIcon className="w-6 h-6" /> Add
          </NavLink>

          {/* Menu Toggle (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-green-600 focus:outline-none transition-all duration-200"
          >
            {isOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col bg-white border-t border-gray-200 shadow-sm py-3 gap-2">
          <NavLink
            to="/guide"
            className="text-gray-600 font-semibold hover:text-green-500 text-center py-1"
            onClick={() => setIsOpen(false)}
          >
            Guide
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-600 font-semibold hover:text-green-500 text-center py-1"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-600 font-semibold hover:text-green-500 text-center py-1"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
