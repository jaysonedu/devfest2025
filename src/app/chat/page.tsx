import Link from "next/link";
import Chatbot from "../../components/Chatbot";
import Header from '../../components/Header'; // Import the Header component

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header /> {/* Include the Header component */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-normal mb-8">AI Chat</h2>

        <div>
          {/* Chatbot Component */}

          <Chatbot />
        </div>

      </main>
    </div>
  );
}

// old 25: <div className="bg-gray-100 p-6 rounded-lg shadow-md">