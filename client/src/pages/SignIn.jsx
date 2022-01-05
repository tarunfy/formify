import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { authService } from "../services";
import { AuthContext } from "../contexts/AuthContext";
import darkImg from "../images/signin2.svg";
import lightImg from "../images/signin1.svg";

const SignIn = ({ isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  useEffect(() => AOS.init({ duration: 1000 }), []);

  const { setCurrentUser, currentUser, setFetching } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ emailError: "", passwordError: "" });
    const result = await authService.signIn({ email, password });
    if (result.isSuccessful()) {
      setCurrentUser(result.data);
    }
    if (result.error === "User does not exists") {
      setError({ ...error, emailError: result.error, passwordError: "" });
    }
    if (result.error === "Incorrect password") {
      setError({ ...error, passwordError: result.error, emailError: "" });
    }
    setFetching(false);
  };

  return (
    <div className="flex transition-colors duration-200 ease-linear dark:bg-black flex-row-reverse justify-evenly items-center h-screen">
      <div
        data-aos="fade-right"
        className="h-customHeight w-customWidth self-center bigScreen:self-center"
      >
        <img src={isDark ? darkImg : lightImg} alt="svg" className="mt-8" />
      </div>
      <div
        data-aos="fade-left"
        className="bg-white dark:bg-myblack z-50 lg:w-96 w-80 pt-10 pb-8 px-10 shadow-customDark2 rounded-lg"
      >
        <form
          className="mb-0 space-y-6"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-myblack dark:text-white"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  autoComplete="off"
                  required
                  className="w-full border border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
                />
              </div>
              {error.emailError && (
                <div className="text-myred  font-Nunito text-left">
                  {error.emailError}
                </div>
              )}
            </div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-myblack dark:text-white"
            >
              Password
            </label>
            <div className="mt-1 flex items-center">
              <input
                type={showPassword ? `text` : `password`}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
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
            {error.passwordError && (
              <div className="text-myred  font-Nunito text-left">
                {error.passwordError}
              </div>
            )}
          </div>
          <div className="flex justify-center flex-col items-center">
            <button
              type="submit"
              className={`w-2/4 flex justify-center py-3 px-4 border border-transparent bg-mygreen3 shadow-xl font-semibold text-white text-center text-lg rounded-lg duration-300 ease focus:outline-none font-Nunito  focus:border-mygreen3 transition-opacity
               dark:text-black`}
            >
              Sign In
            </button>
            <Link
              to="/forgot-password"
              className="text-sm font-Nunito font-semibold mt-3 dark:text-white"
            >
              Forgot password?
            </Link>
          </div>
          <p className="text-center cursor-default font-Nunito dark:text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
