import React from "react";

function YesNoQuestion(props) {
  return (
    <div>
      <h3>{props.question}</h3>
      <div>
        <button className="px-4 py-2 rounded">Yes</button>
        <button className="px-4 py-2 rounded">No</button>
      </div>
    </div>
  );
}

export default YesNoQuestion;
