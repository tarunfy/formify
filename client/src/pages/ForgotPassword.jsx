import React, { useState, useEffect } from "react";
import img from "../images/fpassword1.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { authService } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = ({ isDark }) => {
  const [email, setEmail] = useState("");

  useEffect(() => AOS.init({ duration: 1000 }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authService.forgotPassword(email);
    if (res.isSuccessful()) {
      toast.success(`${res.data} 🦄`);
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
          src={img}
          alt="img"
          className="h-customHeight w-customWidth xl:block hidden"
        />
        <div
          data-aos="flip-right"
          className="bg-white dark:bg-myblack lg:w-96 w-80 pt-10 pb-8 px-10 shadow-customDark2 rounded-lg"
        >
          <form
            className="mb-0 space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <h1 className="dark:text-white font-Nunito mb-5 text-2xl font-bold text-center">
                Enter your email
              </h1>
              <div className="mb-2">
                <div className="mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    autoComplete="off"
                    required
                    className="w-full text-center border border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
                  />
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

export default ForgotPassword;
