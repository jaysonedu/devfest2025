"use client";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">
              <a href="/">SNAP for Students</a>
            </h1>
            <nav className="flex space-x-6">
              <a
                href="/forum"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                forum
              </a>
              <a
                href="/chatbot"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                chat
              </a>
              <a
                href="/quiz"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                eligibility quiz
              </a>
            </nav>
          </div>
          <div className="relative flex-1 max-w-lg ml-8">
            <input
              type="text"
              placeholder="Search the forum"
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <FaSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
