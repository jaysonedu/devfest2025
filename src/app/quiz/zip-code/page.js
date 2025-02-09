"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const zip = parseInt(input);
    console.log(zip);
    if (
      (zip > 10000 && zip < 10500) ||
      zip === 11004 ||
      zip === 11005 ||
      (zip > 11000 && zip < 11500) ||
      (zip > 11600 && zip < 11700)
    ) {
      router.push("/quiz/income");
    } else {
      setErrorMessage("A valid New York City zip code is required");
    }
  };
  return (
    <div className="min-h-screen bg-white pb-6">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 text-gray-900">
        <h2 className="text-4xl font-normal mb-8">Take the Eligibility Quiz</h2>

        <div className="bg-white rounded-lg border border-gray-300 p-8">
          <h3 className="text-xl font-bold mb-4">Confirm your location</h3>
          <p>What is your zip code?</p>
          <input
            type="text"
            className="border border-gray-400 rounded mt-2 p-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick(e);
              }
            }}
          />
          <button
            onClick={handleClick}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-1 ml-3 rounded"
          >
            Continue
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </main>
    </div>
  );
}

export default page;
