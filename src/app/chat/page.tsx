import Link from "next/link";
import Chatbot from "../../components/Chatbot";
import Header from '../../components/Header'; // Import the Header component


export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Header /> {/* Include the Header component */}
      <Chatbot />
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Go to Home
      </Link>
    </div>
  );
}
