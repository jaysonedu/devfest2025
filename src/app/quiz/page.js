"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/zip-code");
  };
  return (
    <div className="min-h-screen bg-white pb-6">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 text-gray-900">
        <h2 className="text-4xl font-normal mb-8">Take the Eligibility Quiz</h2>

        <div className="bg-white rounded-lg border border-gray-300 p-8">
          <h3 className="text-xl font-bold mb-4">How to use this quiz</h3>

          <p className="mb-4">
            The information you give is completely anonymous and will not be
            shared. Please note that the information provided is not from a
            legal or civic body and may be inaccurate. For official information,
            visit the official{" "}
            <a
              href="https://www.nyc.gov/site/hra/help/snap-benefits-food-program.page"
              className="underline text-blue-600 hover:text-blue-800"
            >
              Access HRA page for SNAP
            </a>
            .
          </p>

          <p className="font-bold mb-4">This is not an application.</p>

          <p className="mb-4">This quiz assumes the following:</p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>You are a full-time student living in New York City</li>
            <li>
              You do not live with relatives who purchase and prepare food for
              you
            </li>
            <li>
              You are a U.S. citizen or lawfully present non-citizen (
              <a
                href="https://www.fns.usda.gov/snap/recipient/eligibility/non-citizen"
                className="underline text-blue-600 hover:text-blue-800"
              >
                read here for more information about SNAP eligibility for
                non-citizens)
              </a>
            </li>
          </ul>

          <p className="mb-6">
            The following quiz will take about 10 minutes to complete and does
            not require any official documents.
          </p>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-5 w-5 rounded border-gray-400"
              />
              <span className="font-bold">
                I have read and understand the terms outlined above.
              </span>
            </label>

            <button
              className={`px-4 py-2 rounded ${
                termsAccepted
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!termsAccepted}
              onClick={handleClick}
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
