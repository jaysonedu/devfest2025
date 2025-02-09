"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Header from "../../components/Header";
import ForumPost from "../../components/ForumPost";
import ForumModal from "../../components/ForumModal";
import { MdAddBox } from "react-icons/md";

const availableTags = [
  "qna",
  "documents",
  "my-application-process",
  "resources",
  "case-approval",
  "case-rejection",
  "off-topic",
];

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [filterTag, setFilterTag] = useState("");
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/forum/posts"
        );
        const searchQuery = searchParams.get("search") || "";

        if (searchQuery) {
          const filtered = response.data.filter((post) => {
            const inTitleOrContent =
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.content.toLowerCase().includes(searchQuery.toLowerCase());

            const inComments = post.comments.some((comment) =>
              comment.text.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return inTitleOrContent || inComments;
          });
          setPosts(filtered);
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const filteredPosts = posts.filter((post) => {
    const matchesTag =
      filterTag === "" || (post.tags || []).includes(filterTag);
    return matchesTag;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between">
          <h2 className="text-4xl font-normal mb-8">Forum</h2>
          <MdAddBox
            className="ml-auto w-8 h-8 mt-3 hover:fill-slate-500 cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          />
        </div>
        {openModal && (
          <ForumModal closeModal={setOpenModal} setPosts={setPosts} />
        )}
        <div className="mb-8">
          <div className="mb-4"></div>
          <div className=" w-1/4 ml-auto">
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Filter Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Posts</h3>
          {filteredPosts.length === 0 ? (
            <p className="text-gray-600">No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <ForumPost
                key={post.id}
                title={post.title}
                content={post.content}
                tags={post.tags}
                comments={post.comments}
                id={post.id}
                votes={post.votes}
                setPosts={setPosts}
                posts={posts}
                expandedPost={expandedPost}
                setExpandedPost={setExpandedPost}
                commentTexts={commentTexts}
                setCommentTexts={setCommentTexts}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
