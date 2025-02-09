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
          messages: [
            { 
              role: 'system', content: "You are an AI assistant designed to help students in New York City understand their potential eligibility for the Supplemental Nutrition Assistance Program (SNAP). You provide clear, factual information based on official guidelines, but you do not offer legal, financial, or application decisions. Always encourage students to check the official Access HRA website for confirmation. Your responses should be friendly, concise, and accessible for college students unfamiliar with SNAP.",
            },
            {
              role: 'system', content: "You should never provide financial, legal, or application guarantees. If a student asks for legal advice, redirect them to official SNAP resources. If asked misleading or abusive questions, remain neutral and refocus the conversation on SNAP assistance.",
            },
            {
              role: 'user', content: input 
            }
          ],
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
    <div className="bg-white rounded-lg border border-gray-300 p-8 max-h-[400px] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">How to use the chatbot</h3>
      <p>
            Our AI assistant is here to answer your questions about SNAP, help
            you understand eligibility requirements, and guide you through the
            application process. Feel free to ask anything related to SNAP for
            Students!
      </p>

      <h3 className="text-xl font-bold mb-8"></h3>
      <div className="space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-fit rounded ${
              message.sender === 'user' ? 'border border-gray-300 ml-auto text-right self-end p-2' : 'bg-gray-200 border border-gray-200 mr-auto p-2'
            }`}
            style={{
              display: 'block',
              maxWidth: '60%', // Adjust max width based on sender
              wordBreak: 'break-word'
            }}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 bg-gray-100 rounded mr-auto">Thinking...</div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-8"></h3>
      
      <div className="flex justify-between">
          <input
            type="text"
            placeholder="  Type your message..."
            className="border border-gray-400 w-full rounded mt-0 p-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-1 ml-3 rounded"
          >
            Continue
          </button>
        </div>
    </div>
  );
}
/*
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
</div>*/