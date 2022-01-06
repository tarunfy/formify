import React from "react";

const SubmissionCard = ({ submission }) => {
  delete submission._id;
  delete submission.__v;
  delete submission.formId;
  delete submission.submittedAt;

  return (
    <div
      id="subCard"
      className="h-72 xl:w-96 w-full  shadow-customDark2 px-4 dark:bg-myblack2 rounded-md flex flex-col justify-evenly hover:scale-105 cursor-pointer transform transition-transform duration-300 ease-in-out"
    >
      {Object.keys(submission).map((key, index) => {
        return (
          <div
            key={index}
            className="dark:text-white flex justify-between items-center font-Nunito"
          >
            <p className="font-bold">{key}:</p>
            <p className="text-right w-2/4">{submission[key]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionCard;
