import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import blob1 from "../images/blob1.svg";
import blob2 from "../images/blob2.svg";
import Atropos from "atropos/react/atropos-react.esm";
import "atropos/atropos.css";

const Card = ({ name, createdAt, id, isDark }) => {
  return (
    <>
      <Atropos
        className="my-atropos w-full h-52 "
        shadowScale={0}
        highlight={false}
      >
        <div
          className="h-48 w-full py-2 px-4 overflow-hidden shadow-customDark2 rounded-lg dark:text-white dark:bg-myblack transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-start"
          data-atropos-offset="-5"
        >
          <img
            src={isDark ? blob2 : blob1}
            alt=""
            className="z-0 bg-center absolute -top-10 left-0 bg-fixed"
            data-atropos-offset="-5"
          />
          <div className="z-20" data-atropos-offset="5">
            <h1 className="font-Nunito font-bold text-2xl overflow-hidden">
              {name}
            </h1>
            <p className="font-Nunito text-xs font-medium dark:text-gray-100 text-gray-800">
              {moment(createdAt).startOf("ss").fromNow()}
            </p>
          </div>
          <Link
            to={`/form/${id}`}
            className="hover:bg-mygreen transition-colors duration-300 ease-in-out w-full text-center px-4 py-2 absolute bottom-0 self-center rounded-bl-lg rounded-br-lg font-medium z-10"
            data-atropos-offset="0"
          >
            See Details
          </Link>
        </div>
      </Atropos>
    </>
  );
};

export default Card;
