"use client";
import axios from "axios";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";

function ForumPost({
  title,
  content,
  tags,
  comments,
  id,
  votes,
  setPosts,
  posts,
  expandedPost,
  setExpandedPost,
  commentTexts,
  setCommentTexts,
}) {
  const upvote = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/forum/posts/${id}/upvote`
      );
      const updatedPost = response.data;
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error("Failed to upvote post:", error);
    }
  };

  const downvote = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/forum/posts/${id}/downvote`
      );
      const updatedPost = response.data;
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error("Failed to downvote post:", error);
    }
  };

  const addComment = async () => {
    const commentText = commentTexts[id];
    if (!commentText || commentText.trim() === "") return;

    try {
      const response = await axios.post(
        `http://localhost:5001/api/forum/posts/${id}/comments`,
        { text: commentText }
      );

      setPosts(
        posts.map((post) =>
          post.id === id
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );

      setCommentTexts((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 py-8 px-10 my-4">
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      <p className="text-gray-800 mb-4">{content}</p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Tags:</strong> {tags?.join(", ") || "No tags"}
      </p>

      <div className="flex">
        <div className="flex w-24 border border-gray-500 px-2 mr-3 rounded-xl items-center justify-between">
          <IoIosArrowRoundUp onClick={upvote} />
          <p className="text-gray-700">{votes || 0}</p>
          <IoIosArrowRoundDown onClick={downvote} />
        </div>
        <div
          onClick={() => setExpandedPost(expandedPost === id ? null : id)}
          className="flex w-16 border border-gray-500 px-2 rounded-xl items-center justify-around hover:bg-gray-200 cursor-pointer"
        >
          {comments.length}
          <FaRegComment />
        </div>
      </div>

      <div>
        {expandedPost === id && (
          <div className="mt-4">
            <h5 className="text-lg font-bold mb-2">Comments:</h5>
            {comments.length === 0 ? (
              <p className="text-gray-600">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 py-2">
                  <p className="text-gray-800">{comment.text}</p>
                </div>
              ))
            )}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment"
                value={commentTexts[id] || ""}
                onChange={(e) =>
                  setCommentTexts((prev) => ({ ...prev, [id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addComment();
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={addComment}
                className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Add Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumPost;
