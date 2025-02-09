"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import axios from "axios";
//import { useRouter } from "next/navigation";
import { MessageList } from "../../components/chatbot/MessageList";
import { MessageInput } from "../../components/chatbot/MessageInput";

const Page = () => {
  const [posts, setPosts] = useState([]);
  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

    // Function to handle sending a message
    const handleSubmit = async (message) => {
      try {
        const response = await axios.post("/api/posts", { message });
        setPosts([...posts, response.data]); // Append the new message
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };

  return (
    <div className="min-h-screen bg-white pb-6">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 text-gray-900">
        <h2 className="text-4xl font-normal mb-8">AI Chat</h2>
        
        {/*Chat*/}
        <div className="bg-white rounded-lg border border-gray-300 p-4 max-h-[400px] overflow-y-auto">
          <MessageList messages={posts} />
        </div>
        {/*Send message*/}
        <MessageInput onSend={handleSubmit} />
      </main>
    </div>
  )
}

export default Page;