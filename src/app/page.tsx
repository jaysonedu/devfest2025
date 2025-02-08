// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600">Welcome to the Main Page</h1>
      <p className="mt-2 text-gray-700">This is the home page of the website.</p>
      <Link href="/chatbot" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go to Chatbot
      </Link>
    </div>
  );
}
