"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import YesNoQuestion from "../../../components/YesNoQuestion";
import { useRouter } from "next/navigation";

function Page() {
  const [hasMealPlan, setHasMealPlan] = useState(null);
  const [hasSemester, setHasSemester] = useState(null);
  const [mealsPerTerm, setMealsPerTerm] = useState(0);
  const [pointsPerTerm, setPointsPerTerm] = useState(0);
  const [pointsToMeal, setPointsToMeal] = useState(0);
  const [isMealPlanEligible, setIsMealPlanEligible] = useState(null);
  const [mealsPerDay, setMealsPerDay] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const calculatedMealsPerDay = calculateMealsPerDay();
    setMealsPerDay(calculatedMealsPerDay);
  }, [hasSemester, mealsPerTerm, pointsPerTerm, pointsPerTerm, pointsToMeal]);

  const calculateMealsPerDay = () => {
    let mealsPerDay;
    if (hasSemester) {
      mealsPerDay = (mealsPerTerm + pointsPerTerm / pointsToMeal) / 105;
    } else {
      mealsPerDay = (mealsPerTerm + pointsPerTerm / pointsToMeal) / 70;
    }
    setIsMealPlanEligible(mealsPerDay <= 1.5);
    return mealsPerDay.toFixed(1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (hasMealPlan == null) {
      return;
    }
    router.push("/quiz/eligible");
  };

  const isFormComplete =
    mealsPerTerm > 0 &&
    pointsPerTerm > 0 &&
    pointsToMeal > 0 &&
    hasSemester !== null;

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
              Tell us about your meal plan
            </h3>
            <YesNoQuestion
              question="Are you on a university meal plan?"
              onSelect={(ans) => {
                setHasMealPlan(ans);
                setMealsPerTerm(0);
              }}
            />
            {hasMealPlan === "yes" && (
              <div className="mt-4 space-y-4 mb-4">
                <div className="flex flex-wrap items-center space-x-2">
                  <p className="text-sm font-semibold">I receive</p>
                  <input
                    id="meals-per-term"
                    type="number"
                    className="p-2 border border-gray-300 rounded mt-1 w-1/5"
                    onChange={(e) => setMealsPerTerm(Number(e.target.value))}
                  />
                  <p>per</p>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        className="ml-4"
                        type="radio"
                        name="meal-time"
                        value="semester"
                        checked={hasSemester == "semester"}
                        onChange={(e) => setHasSemester(e.target.value)}
                      />
                      Semester
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="meal-time"
                        value="quarter"
                        checked={hasSemester == "quarter"}
                        onChange={(e) => setHasSemester(e.target.value)}
                      />
                      Quarter
                    </label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold">I receive</p>
                  <input
                    id="points-per-term"
                    type="number"
                    className="p-2 border border-gray-300 rounded mt-1 w-1/5"
                    onChange={(e) => setPointsPerTerm(Number(e.target.value))}
                  />
                  <p>dining points per term</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold">and</p>
                  <input
                    id="points-equal-one-meal"
                    type="number"
                    className="p-2 border border-gray-300 rounded mt-1 w-1/5"
                    onChange={(e) => setPointsToMeal(Number(e.target.value))}
                  />
                  <p>points equal one meal.</p>
                </div>
              </div>
            )}
            {hasMealPlan == "yes" && isFormComplete && (
              <div className="mb-4">
                {isMealPlanEligible ? (
                  <p>
                    According to the information you provided, you receive about
                    {` ${mealsPerDay}`} meals a day provided by your
                    institution. By SNAP guidelines, you must receive less than
                    50% of your daily meals from your university, based on 3
                    meals for seven days equaling 21 meals.
                    <strong>
                      This means you most likely satisfy this requirement.
                    </strong>
                  </p>
                ) : (
                  <p>
                    According to the information you provided, you receive about
                    {` ${mealsPerDay}`} meals a day provided by your
                    institution. By SNAP guidelines, you must receive less than
                    50% of your daily meals from your university, based on 3
                    meals for seven days equaling 21 meals.
                    <strong>
                      However, there's no harm in applying anyway, as this
                      calculation may be imprecise.
                    </strong>
                  </p>
                )}
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
