"use client"; // Mark this as a Client Component

import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<string[]>(['Hello! How can I help you today?']);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]); // Add the user's message to the list
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chatbot</h2>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="p-2 bg-gray-100 rounded">
            {message}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
