import React, { useState } from "react";

function YesNoQuestion({ question, onSelect }) {
  const [selected, setSelectedOption] = useState(null);

  const handleClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="my-5">
      <h3>{question}</h3>
      <div>
        <button
          className={`px-6 py-2 mr-3 mt-2 rounded ${
            selected === "yes" ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-300"
          }`}
          onClick={() => handleClick("yes")}
        >
          Yes
        </button>
        <button
          className={`px-6 py-2 mt-2 rounded ${
            selected === "no" ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-300"
          }`}
          onClick={() => handleClick("no")}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default YesNoQuestion;
