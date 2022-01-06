import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import blob1 from "../images/blob1.svg";
import blob2 from "../images/blob2.svg";

const Card = ({ name, createdAt, id, isDark }) => {
  return (
    <>
      <div className="h-48 w-full py-2 px-4 overflow-hidden shadow-customDark2 rounded-lg dark:text-white dark:bg-myblack transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-start">
        <img
          src={isDark ? blob2 : blob1}
          alt=""
          className="z-0 bg-center absolute top-0 left-0 bg-fixed"
        />
        <div className="z-20">
          <h1 id="cardName" className="font-Nunito font-bold text-2xl">
            {name}
          </h1>
          <p className="font-Nunito text-xs font-medium dark:text-gray-100 text-gray-800">
            {moment(createdAt).startOf("ss").fromNow()}
          </p>
        </div>
        <Link
          to={`/form/${id}`}
          className="hover:bg-mygreen transition-colors duration-300 ease-in-out w-full text-center px-4 py-2 absolute bottom-0 self-center rounded-bl-lg rounded-br-lg font-medium z-10"
        >
          See Details
        </Link>
      </div>
    </>
  );
};

export default Card;
