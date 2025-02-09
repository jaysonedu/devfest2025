"use client";
import { FaSearch } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (pathname !== "/forum") {
      router.push(`/forum?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set("search", searchTerm);
      window.history.pushState({}, "", url);
      // Trigger forum search via URL change
      window.dispatchEvent(new Event("popstate"));
    }
  };

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
                href="/chat"
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
          <form onSubmit={handleSearch} className="relative flex-1 max-w-lg ml-8">
            <input
              type="text"
              placeholder="Search the forum"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <button type="submit" className="absolute right-3 top-2.5">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
