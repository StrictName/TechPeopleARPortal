import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Authorization works based on the variables in local storage if deleted
  // user needs to log in again
  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      return navigate("/signin");
    }, 1500);
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 w-screen bg-[#f7f5f5] ">
      <img
        className="md:h-24 md:w-24 h-16 w-16 "
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
      />
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-[#094B83] font-semibold md:text-5xl sm:text-4xl text-base">
          TechPeople AR Portal
        </h1>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={() => logout()}
          className="bg-[#094B83] hover:bg-[#539ddb] text-white font-bold md:text-base text-xs md:py-3 md:px-4 py-2 px-3 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
