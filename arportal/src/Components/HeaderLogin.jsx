import React from "react";
import logo from "../assets/logo.png";

const Header = () => {


  return (
    <header className="flex justify-between items-center py-4 px-6 w-screen bg-[#f7f5f5] ">
  
      <img className="md:h-24 md:w-24 h-16 w-16 " src={logo} alt="Logo"  />
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-[#094B83] font-semibold md:text-5xl sm:text-4xl text-base">
          TechPeople AR Portal
        </h1>
      </div>
      
    </header>
  );
};

export default Header;
