"use client";

import { useState } from "react";
import { Home, User, Briefcase, Cpu, DollarSign, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        {/* Logo Section */}
        <div className="flex justify-center my-4">
          <img src="HEEPL.png" alt="Logo" className="h-40" />
        </div>

        <a href="#" className="text-white flex items-center space-x-2 px-4">
         
          <span className="text-2xl font-extrabold">HITESH ENVIRO ENGINEERS PVT LTD(HEEPL)</span>
        </a>
        
        <nav>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Home className="inline-block mr-2 w-5 h-5" /> Home
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <User className="inline-block mr-2 w-5 h-5" /> User Info
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Briefcase className="inline-block mr-2 w-5 h-5" /> Plant Info
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Cpu className="inline-block mr-2 w-5 h-5" /> Equipment
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <DollarSign className="inline-block mr-2 w-5 h-5" /> Total Cost
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;