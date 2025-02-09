import Link from "next/link";
import Chatbot from "../../components/Chatbot";
import Header from '../../components/Header'; // Import the Header component

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header /> {/* Include the Header component */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">
          Chat with Our AI Assistant
        </h2>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">How Can We Help You?</h3>
          <p className="text-gray-800 mb-6">
            Our AI assistant is here to answer your questions about SNAP, help
            you understand eligibility requirements, and guide you through the
            application process. Feel free to ask anything related to SNAP for
            Students!
          </p>
        </section>

        {/* Chatbot Component */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <Chatbot />
        </div>
      </main>
    </div>
  );
}
