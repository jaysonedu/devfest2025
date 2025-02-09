"use client";
import React, { useState, useEffect } from "react";
import YesNoQuestion from "../../../components/YesNoQuestion";
import Header from "../../../components/Header";
import { useRouter } from "next/navigation";

function Page() {
  const [hasIncome, setHasIncome] = useState(null);
  const [isIneligible, setIsIneligible] = useState(null);
  const [isUnfitToWork, setIsUnfitToWork] = useState(null);
  const [hasGovtAsst, setHasGovtAsst] = useState(null);
  const [attendsCuny, setAttendsCuny] = useState(null);
  const [works20Hrs, setWorks20Hrs] = useState(null);
  const [hasWS, setHasWS] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (
      (hasIncome === "no" && isUnfitToWork === "no" && hasGovtAsst === "no") ||
      (attendsCuny == "no" && works20Hrs == "no" && hasWS == "no")
    ) {
      setIsIneligible(true);
    } else if (
      (hasIncome !== null && isUnfitToWork !== null && hasGovtAsst !== null) ||
      (attendsCuny !== null && works20Hrs !== null && hasWS !== null)
    ) {
      setIsIneligible(false);
    }
  }, [hasIncome, isUnfitToWork, hasGovtAsst, attendsCuny, hasWS, works20Hrs]);

  const handleClick = (e) => {
    e.preventDefault();
    if (isIneligible == null) {
      return;
    } else if (isIneligible == true) {
      router.push("/quiz/ineligible");
    } else {
      router.push("/quiz/meal-plan");
    }
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
              Tell us about your income
            </h3>
            <YesNoQuestion
              question="Do you have an income?"
              onSelect={setHasIncome}
            />
            {hasIncome == "no" && (
              <div>
                <YesNoQuestion
                  question="Are you physically or mentally unfit to work?"
                  onSelect={(ans) => setIsUnfitToWork(ans)}
                />
                <YesNoQuestion
                  question="Do you receive the following Temporary Assistance for Needy Families (TANF) OR unemployment benefits?"
                  onSelect={(ans) => setHasGovtAsst(ans)}
                />
              </div>
            )}
            {hasIncome == "yes" && (
              <div>
                <YesNoQuestion
                  question="Do you attend a SUNY/CUNY community college or technology college and enroll in a qualified certificate or degree CTE program?"
                  onSelect={(ans) => setAttendsCuny(ans)}
                />
                <YesNoQuestion
                  question="Are you employed or self-employed an average of 20 hours a week or more?"
                  onSelect={(ans) => setWorks20Hrs(ans)}
                />
                <YesNoQuestion
                  question="Do you participate in state or federal work-study?"
                  onSelect={(ans) => setHasWS(ans)}
                />
                <YesNoQuestion
                  question="Do you receive the following Temporary Assistance for Needy Families (TANF) OR unemployment benefits?"
                  onSelect={(ans) => setHasGovtAsst(ans)}
                />
              </div>
            )}
            <button
              onClick={handleClick}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
