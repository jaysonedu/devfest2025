"use client";

function Review(props) {
  //make a function to uniformly process dates?
  return (
    <div className="bg-slate-200 flex flex-col py-5 px-7 my-10">
      <div className="flex justify-between mb-3">
        <h3 className="text-xl">{props.name}</h3>
        <h6 className="mr-2">{props.date}</h6>
      </div>
      <p>{props.review}</p>
    </div>
  );
}

export default Review;
