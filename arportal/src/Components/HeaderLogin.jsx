import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center py-4 px-6 w-screen bg-[#f7f5f5] ">
  
      <img className="h-24 w-24 " src={logo} alt="Logo" onClick={() => navigate("/")} />
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-[#094B83] font-semibold md:text-5xl sm:text-4xl text-base">
          TechPeople AR Portal
        </h1>
      </div>
      
    </header>
  );
};

export default Header;
