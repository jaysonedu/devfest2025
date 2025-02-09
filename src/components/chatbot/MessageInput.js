import React, {useState} from "react";

export const MessageInput = ({onSend}) => {
    const [text, setText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return; // Prevent sending empty messages

        try {
          await onSend(text); // Call the passed function from Page.js
          setText(""); // Clear input after sending
        } catch (error) {
          console.error("Failed to send message:", error);
        }
    }

    return (
        <div className="flex p-2 border-t mt-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
            />

            <button onClick={handleSubmit} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Send
            </button>
        </div>
    );
}

/* try {
          const response = await axios.post("/api/posts", newPost);
          setPosts([...posts, response.data]); // Add the new post to the list
          setNewPost({ title: "", content: "" }); // Clear the form
        } catch (error) {
          console.error("Failed to create post:", error);
        } */