import React, { useState, useContext, useEffect } from "react";
import Configure from "../components/Configure";
import Submissions from "../components/Submissions";
import { AuthContext } from "../contexts/AuthContext";

const Form = ({ isDark, ...props }) => {
  const formId = props.match.params.id;
  const [showConfig, setShowConfig] = useState(true);
  const [showSubmissions, setShowSubmissions] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser == null) {
      window.location.href = "/signin";
      return <div>Redirecting...</div>;
    }
  }, [currentUser]);

  const handleConfig = () => {
    setShowSubmissions(false);
    setShowConfig(true);
  };
  const handleSub = () => {
    setShowConfig(false);
    setShowSubmissions(true);
  };

  return (
    <div className="dark:bg-black transition-colors duration-200 ease-linear  dark:text-white h-screen flex justify-center items-start pt-32">
      <div className="w-11/12 max-h-11/12 overflow-x-hidden overflow-y-scroll bigScreen:w-10/12 p-4 border border-mygrey dark:border-mygrey2 rounded-lg dark:bg-black flex flex-col justify-start items-center ">
        <div className="w-full flex justify-evenly bg-green-50 dark:bg-myblack rounded-md mb-4">
          <div
            className={`text-center px-3 py-1 cursor-pointer  font-Nunito font-semibold text-xl ${
              showConfig ? `text-mygreen2` : ``
            }`}
            onClick={handleConfig}
          >
            Configure
          </div>
          <div
            className={`text-center px-3 py-1 cursor-pointer font-Nunito font-semibold text-xl ${
              showSubmissions ? ` text-mygreen2` : ``
            }`}
            onClick={handleSub}
          >
            Submissions
          </div>
        </div>
        {showConfig && (
          <Configure formId={formId} isDark={isDark} history={props.history} />
        )}
        {showSubmissions && <Submissions formId={formId} isDark={isDark} />}
      </div>
    </div>
  );
};

export default Form;
