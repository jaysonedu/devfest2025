"use client";
import React from "react";
import Header from "../../../components/Header";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("https://a069-access.nyc.gov/accesshra/");
  };

  return (
    <div>
      <div className="min-h-screen bg-white pb-6">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8 text-gray-900">
          <h2 className="text-4xl font-normal mb-8">
            Take the Eligibility Quiz
          </h2>
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <h3 className="text-xl font-bold mb-4">
              You have completed the quiz.
            </h3>
            <p>
              According to your answers, you may be eligible to apply for SNAP.
              Understand that the actual SNAP application takes into account
              other factors like cost of housing, household composition, and
              additional sources of income. Remember that being eligible to
              apply does not mean you are guaranteed SNAP benefits. Please know
              this is an informal screening and may be incorrect.{" "}
              <a
                href="https://www.nyc.gov/site/hra/help/snap-benefits-food-program.page"
                className="underline text-blue-600 hover:text-blue-800"
              >
                We encourage you to visit the official Access HRA page for SNAP.
              </a>
            </p>
            <button
              onClick={handleClick}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mt-4"
            >
              Apply today through Access HRA!
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
