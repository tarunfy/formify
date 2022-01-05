import React, { useEffect } from "react";
import hero from "../images/hero.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => AOS.init({ duration: 1000 }), []);
  return (
    <>
      <div className="dark:bg-black transition-colors duration-200 ease-linear flex mt-20 justify-center items-center flex-col  font-Roboto text-center h-screen home">
        <p id="heading" data-aos="fade" className="text-6xl  dark:text-white">
          Make{" "}
          <span className="dark:text-mygreen text-mygreen3">
            &#60;form&#62;
          </span>{" "}
          our problem. Not yours.
        </p>
        <p
          data-aos="fade"
          className="leading-8 mt-8 font-Nunito text-mygrey2 dark:text-mygrey font-medium text-2xl"
        >
          Formify completely automates your HTML &#60;form&#62; <br />
          So you can focus on your most important work. <br />
          Easy to set-up & free to use.
        </p>
        <img data-aos="fade" src={hero} alt="hero" className="h-80 w-80" />
      </div>
      <div className="h-screen flex flex-col justify-evenly dark:bg-black">
        <div
          data-aos="fade-up"
          className="container mx-auto dark:bg-black font-Roboto text-center "
        >
          <p id="heading" className="font-bold text-5xl dark:text-white">
            Stress free HTML forms.
          </p>
          <p className="mt-8 text-mygrey2 dark:text-mygrey leading-8 font-medium font-Nunito text-2xl">
            Collect form submissions from your HTML form without any backend
            code
            <br />
            and enjoy our best features that will save you a lot of time.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="container dark:bg-black mx-auto px-24 flex items-center font-Roboto text-center w-full"
        >
          <div className="flex flex-col text-left justify-start w-2/4">
            <p id="heading" className="text-4xl dark:text-white">
              Easy to setup.
            </p>
            <p className="mt-8 text-mygrey2 dark:text-mygrey font-medium font-Nunito text-2xl">
              Get your unique endpoint URL from formify.
              <br />
              Add name attribute to each of your input field.
              <br />
              Start collecting submissions.
            </p>
          </div>
          <div className="w-2/4 flex dark:bg-black items-center justify-end">
            <code className="text-left dark:text-white dark:bg-myblack leading-8 px-8 py-4 rounded-xl shadow-customDark2">
              &#60;form <strong>action="</strong>
              <span className="text-mygreen">
                https://formify-app.herokuapp.com/f/XXXXXX
              </span>
              <strong>"</strong>
              <br /> method="POST" enctype="multipart/form-data"&#62;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#60;input type="email" name="email"&#62;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#60;input type="file" name="photo"&#62;
              <br />
              &nbsp;&nbsp;&nbsp; &#60;
              <strong>button type="submit"&#62;Submit&#60;/button&#62;</strong>
              <br />
              &#60;&#8725;form&#62;
            </code>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
