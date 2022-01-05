import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiSun, HiMoon } from "react-icons/hi";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const location = useLocation();

  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isBallRight, setIsBallRight] = useState(false);

  const logout = async () => {
    await authService.signOut();
    setCurrentUser(null);
  };

  return (
    <div
      className={`navbar transition-colors duration-200 ease-linear bg-white  z-40 dark:bg-black fixed top-0 w-full flex justify-between  items-center px-14 py-6`}
    >
      <Link
        to="/"
        className=" dark:text-white font-extrabold font-Montserrat text-4xl"
      >
        &#60;formify&#62;
      </Link>
      <div className="flex justify-between items-center">
        <div className="mr-11 cursor-pointer">
          <input
            type="checkbox"
            id="checkbox"
            onChange={() => toggleTheme()}
            className="opacity-0 absolute"
            onClick={() => setIsBallRight((right) => !right)}
          />
          <label
            htmlFor="checkbox"
            className="w-14 h-7 bg-black transition-colors duration-200 ease-linear  dark:bg-white relative  flex rounded-3xl items-center p-2 justify-between"
            id="label"
          >
            <HiSun className="h-5 w-5" fill="#f5d313" />
            <HiMoon className="h-5 w-5" fill="#f1c40f" />
            <div
              id="ball"
              className={`w-6 h-6 cursor-pointer   bg-white dark:bg-black transition-transform transform duration-200 ease-linear absolute top-0.5 rounded-full ${
                isDark ? `translate-x-5` : `-translate-x-1`
              }`}
            ></div>
          </label>
        </div>

        {currentUser ? (
          <>
            <div
              className="font-bold cursor-pointer text-xl font-Nunito dark:text-white hover:scale-95 transition-transform duration-300 transform ease-in-out"
              onClick={logout}
            >
              Logout
            </div>
            <Link
              to="/dashboard"
              className="rounded-3xl ml-11 font-bold text-white font-Nunito dark:text-black text-xl bg-mygreen3 px-6 py-2 shadow-custom4 hover:shadow-custom2 transition-shadow ease-in duration-300"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className={`font-bold text-xl font-Nunito dark:text-white hover:scale-95 transition-transform duration-300 transform ease-in-out ${
                location.pathname === "/reset-password" && `hidden`
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`rounded-3xl ml-11 font-bold text-white font-Nunito dark:text-black text-xl bg-mygreen3 px-6 py-2 shadow-custom hover:shadow-custom2 transition-shadow ease-in duration-300 ${
                location.pathname === "/reset-password" && `hidden`
              }`}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
