"use client"; // Mark this as a Client Component

import React, { useState } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add the user's message to the chat
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setIsLoading(true);

    // Call the OpenAI API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      const botMessage: Message = { text: data.content, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chatbot</h2>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 bg-gray-100 rounded mr-auto">Thinking...</div>
        )}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border rounded-l"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
