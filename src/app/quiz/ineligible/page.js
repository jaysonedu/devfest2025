import React from "react";
import Header from "../../../components/Header";
function page() {
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
              According to your answers, you are ineligible to apply for SNAP as
              a student. Please know this is an informal screening and may be
              incorrect.{" "}
              <a
                href="We encourage you to visit the official Access HRA page
              for SNAP."
                className="underline text-blue-600 hover:text-blue-800"
              >
                We encourage you to visit the official Access HRA page for SNAP.
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
