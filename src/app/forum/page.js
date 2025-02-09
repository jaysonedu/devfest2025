"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../components/Header'; // Import the Header component

const availableTags = [
  'qna',
  'documents',
  'my-application-process',
  'resources',
  'case-approval',
  'case-rejection',
  'off-topic'
];

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [filterTag, setFilterTag] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/forum/posts');
        const searchQuery = searchParams.get('search') || '';
        
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
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const filteredPosts = posts.filter((post) => {
    const matchesTag = filterTag === '' || (post.tags || []).includes(filterTag);
    return matchesTag;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/forum/posts', {
        ...newPost,
        tags: newPost.tags || []
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '', tags: [] });
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const upvote = async (postId) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/forum/posts/${postId}/upvote`);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error('Failed to upvote post:', error);
    }
  };

  const downvote = async (postId) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/forum/posts/${postId}/downvote`);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error('Failed to downvote post:', error);
    }
  };

  const addComment = async (postId) => {
    const commentText = commentTexts[postId];
    if (!commentText || commentText.trim() === '') return;

    try {
      const response = await axios.post(`http://localhost:5001/api/forum/posts/${postId}/comments`, {
        text: commentText,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
        )
      );

      setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleCommentChange = (postId, value) => {
    setCommentTexts((prev) => ({ ...prev, [postId]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header /> {/* Include the Header component */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Forum Blog</h2>

        {/* Create Post Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Tags:</label>
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
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Post
          </button>
        </form>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Search:</label>
            <input
              type="text"
              placeholder="Search by title, content, or comments..."
              value={searchParams.get('search') || ''}
              onChange={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set('search', e.target.value);
                window.history.pushState({}, '', url);
                window.dispatchEvent(new Event('popstate'));
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Tag:</label>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Posts</h3>
          {filteredPosts.length === 0 ? (
            <p className="text-gray-600">No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Tags:</strong> {post.tags?.join(', ') || 'No tags'}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => upvote(post.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                  >
                    ⬆️ Upvote
                  </button>
                  <span className="font-bold">{post.votes || 0} Votes</span>
                  <button
                    onClick={() => downvote(post.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    ⬇️ Downvote
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {expandedPost === post.id ? 'Hide Comments' : `Show Comments (${post.comments.length})`}
                  </button>
                  {expandedPost === post.id && (
                    <div className="mt-4">
                      <h5 className="text-lg font-bold mb-2">Comments:</h5>
                      {post.comments.length === 0 ? (
                        <p className="text-gray-600">No comments yet.</p>
                      ) : (
                        post.comments.map((comment) => (
                          <div key={comment.id} className="border-b border-gray-200 py-2">
                            <p className="text-gray-800">{comment.text}</p>
                          </div>
                        ))
                      )}
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Add a comment"
                          value={commentTexts[post.id] || ''}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Add Comment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
