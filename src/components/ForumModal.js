"use client";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";

function ForumModal({ closeModal, setPosts }) {
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: [] });
  const availableTags = [
    "qna",
    "documents",
    "my-application-process",
    "resources",
    "case-approval",
    "case-rejection",
    "off-topic",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal(false);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/forum/posts",
        {
          ...newPost,
          tags: newPost.tags || [],
        }
      );
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setNewPost({ title: "", content: "", tags: [] });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-7/12 h-7/12 bg-white rounded-lg border border-gray-300 p-8 text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Make a post</h3>
          <FaRegWindowClose
            className="cursor-pointer w-6 h-6 hover:fill-slate-500"
            onClick={() => closeModal(false)}
          />
        </div>
        <div className="flex justify-center">
          <form className="w-full p-3" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="mr-3">
                Title
              </label>
              <input
                id="title"
                type="text"
                autoComplete="off"
                className="w-full p-2 rounded border border-gray-400"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content">Post content</label>
              <textarea
                id="content"
                autoComplete="off"
                className="w-full p-2 h-28 rounded resize-none align-top border border-gray-400"
                style={{ verticalAlign: "top" }}
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <label key={tag} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={tag}
                      checked={newPost.tags?.includes(tag)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setNewPost((prev) => {
                          const updatedTags = checked
                            ? [...(prev.tags || []), tag]
                            : prev.tags.filter((t) => t !== tag);
                          return { ...prev, tags: updatedTags };
                        });
                      }}
                      className="mr-2"
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForumModal;
