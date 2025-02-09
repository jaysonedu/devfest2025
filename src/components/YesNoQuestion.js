import React, { useState } from "react";

function YesNoQuestion({ question, isActive }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      <h3>{question}</h3>
      <div>
        <button
          className={`px-4 py-2 rounded ${
            isClicked ? "bg-gray-400" : "bg-gray-200"
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 rounded"
          onClick={() => setIsClicked(!isClicked)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default YesNoQuestion;
