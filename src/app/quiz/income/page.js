"use client";
import React, { useState } from "react";
import YesNoQuestion from "../../../components/YesNoQuestion";
import Header from "../../../components/Header";

function page() {
  const [activeButton, setActiveButton] = useState(false);
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
              Tell us about your income
            </h3>
            <YesNoQuestion question="Do you have an income?" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
