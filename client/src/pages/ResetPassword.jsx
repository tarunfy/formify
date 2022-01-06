import React, { useState, useEffect } from "react";
import imgLight from "../images/resetpasslight.svg";
import imgDark from "../images/resetpassdark.svg";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { authService } from "../services";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = ({ isDark, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();

  useEffect(() => AOS.init({ duration: 1000 }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = location.search;
    const token = new URLSearchParams(search).get("token");
    const res = await authService.resetPassword({
      password,
      confirmPassword,
      token,
    });
    if (res.isSuccessful()) {
      toast.success(`${res.data} 🦄`);
      setTimeout(() => {
        props.history.push("/signin");
      }, 1500);
    }
    if (res.hasError()) {
      toast.error(`${res.error} 😥`);
    }
  };

  return (
    <>
      <div className="flex transition-colors duration-200 ease-linear  dark:bg-black xl:justify-evenly items-center justify-center h-screen">
        <img
          data-aos="fade"
          src={isDark ? imgDark : imgLight}
          alt="img"
          className="h-customHeight w-customWidth xl:block hidden"
        />
        <div
          data-aos="flip-left"
          className="bg-white dark:bg-myblack lg:w-96 w-80 pt-10 pb-8 px-10 shadow-customDark2 rounded-lg"
        >
          <form
            className="mb-0 space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <h1 className="dark:text-white font-Nunito mb-5 text-2xl font-bold text-center">
                Reset your password
              </h1>
              <div className="mb-2">
                <div className="mt-1 flex items-center">
                  <input
                    type={showPassword ? `text` : `password`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border text-center border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
                  />
                  {showPassword ? (
                    <RiEyeFill
                      className={"h-5 w-5 -ml-8 dark:text-white text-black "}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <RiEyeOffFill
                      className={"h-5 w-5 -ml-8 dark:text-white text-black"}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
                <div className="mt-2 flex items-center">
                  <input
                    type={showConfirmPassword ? `text` : `password`}
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border text-center border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
                  />
                  {showConfirmPassword ? (
                    <RiEyeFill
                      className={"h-5 w-5 -ml-8 dark:text-white text-black "}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                  ) : (
                    <RiEyeOffFill
                      className={"h-5 w-5 -ml-8 dark:text-white text-black"}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <button
                type="submit"
                className="w-2/4 flex justify-center py-3 px-4 border border-transparent bg-mygreen3 hover:opacity-95 shadow-xl font-semibold text-white text-center text-lg rounded-lg duration-300 ease focus:outline-none font-Nunito  focus:border-mygreen3 transition-opacity
               dark:text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={`${isDark ? `dark` : `light`}`}
      />
    </>
  );
};

export default ResetPassword;
