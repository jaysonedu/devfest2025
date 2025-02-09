import Header from "@/components/Header";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">
          SNAP Resources and Support—for Students
        </h2>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">What is SNAP?</h3>
          <p className="text-gray-800 mb-6">
            The Supplemental Nutrition Assistance Program (SNAP) is a federal
            program that allows recipients to easily purchase food at many
            grocery stores and farmers markets through an Electronic Benefit
            Transfer (EBT) card.
          </p>
          <p className="text-gray-800 mb-6">
            Many students don't know they are eligible to apply for SNAP, a
            crucial resource for those facing food insecurity. SNAP for Students
            aims to increase awareness about eligibility requirements for the
            program.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Am I eligible?</h3>
          <p className="text-gray-800 mb-4">
            Students attending an institution of higher education half-time or
            more are only eligible for SNAP if they meet an exemption. These
            exemptions include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Being under age 18 or over age 50</li>
            <li>Working at least 20 hours a week in paid employment</li>
            <li>
              Participating in a state- or federally-financed work study program
            </li>
            <li>Having a physical or mental disability</li>
          </ul>
          <a
            href="https://hungersolutionsny.org/federal-nutrition-programs/snap/snap-eligibility-for-college-students/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Find a full list of exemptions for students here.
          </a>
        </section>

        <section>
          <p className="text-gray-800">
            On this website, you can take our eligibility quiz, contribute to
            and consult a forum filled with student experiences, and chat about
            the program with our AI assistant.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
