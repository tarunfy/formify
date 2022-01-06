import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services";
import darkImg from "../images/signup2.svg";
import lightImg from "../images/signup1.svg";

const strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

const strengthStyle = {
  Strong: "text-mygreen",
  Medium: "text-yellow-400",
  Weak: "text-myred",
};

const SignUp = ({ isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [strength, setStrength] = useState("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { setCurrentUser, currentUser, setFetching } = useContext(AuthContext);

  useEffect(() => {
    if (password.length > 0) checkStrength();
  }, [password]);

  useEffect(() => AOS.init({ duration: 1000 }), []);

  const checkStrength = () => {
    if (strongPassword.test(password)) {
      setStrength("Strong");
    } else if (mediumPassword.test(password)) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ emailError: "", passwordError: "" });
    const result = await authService.signUp({ email, fullName, password });
    console.log(result);

    if (result.isSuccessful()) {
      setCurrentUser(result.data);
    }
    if (result.error === "Password too short") {
      setError({ ...error, passwordError: result.error, emailError: "" });
    }
    if (result.error === "User already exists") {
      setError({ ...error, emailError: result.error, passwordError: "" });
    }

    setFetching(false);
  };

  return (
    <div className="flex transition-colors duration-200 ease-linear dark:bg-black flex-row-reverse xl:justify-evenly items-center justify-center h-screen">
      <div
        data-aos="fade-left"
        className="h-customHeight self-center bigScreen:self-center w-customWidth xl:block hidden"
      >
        <img src={isDark ? darkImg : lightImg} alt="svg" className="xl:mt-8" />
      </div>
      <div
        data-aos="fade-right"
        className="bg-white dark:bg-myblack  lg:w-96 w-80 pt-10 pb-8 px-10 shadow-customDark2 rounded-lg"
      >
        <form
          className="mb-0 space-y-6"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-myblack dark:text-white"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                  required
                  className="w-full border border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
                />
              </div>
            </div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-myblack dark:text-white"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <label
              htmlFor="password"
              className="block text-sm mt-2 font-medium text-myblack dark:text-white"
            >
              Password
            </label>
            <div className="mt-1 flex items-center">
              <input
                type={showPassword ? `text` : `password`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-500 dark:bg-myblack dark:text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none"
              />
              {showPassword ? (
                <RiEyeFill
                  className={"h-5 w-5 -ml-8 dark:text-white text-black"}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <RiEyeOffFill
                  className={"h-5 w-5 -ml-8 dark:text-white text-black "}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              {error.passwordError && (
                <div className="text-myred  font-Nunito text-left">
                  {error.passwordError}
                </div>
              )}
              {password.length > 0 && (
                <div
                  className={`${strengthStyle[strength]} text-right font-Nunito`}
                >
                  {strength}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-2/4 flex justify-center py-3 px-4 border border-transparent bg-mygreen3 hover:opacity-95 font-Nunito font-semibold text-white text-center text-lg rounded-lg  focus:outline-none  focus:border-mygreen3 hover:shadow-xl shadow-lg dark:text-black"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center cursor-default font-Nunito dark:text-white">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
