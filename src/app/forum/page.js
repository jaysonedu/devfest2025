"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentTexts, setCommentTexts] = useState({}); // Tracks comment text for each post
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forum/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const inTitleOrContent =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const inComments = post.comments.some((comment) =>
      comment.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return inTitleOrContent || inComments;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forum/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const upvote = async (postId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/forum/posts/${postId}/upvote`);
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
      const response = await axios.patch(`http://localhost:5000/api/forum/posts/${postId}/downvote`);
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
      const response = await axios.post(`http://localhost:5000/api/forum/posts/${postId}/comments`, {
        text: commentText,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
        )
      );

      // Clear the comment input for this post
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Forum Blog</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            style={{ width: '100%', padding: '10px', fontSize: '16px', height: '100px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Create Post
        </button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>

      <div>
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button onClick={() => upvote(post.id)} style={{ padding: '5px 10px', fontSize: '14px' }}>
                  ⬆️ Upvote
                </button>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Votes: {post.votes || 0}</span>
                <button onClick={() => downvote(post.id)} style={{ padding: '5px 10px', fontSize: '14px' }}>
                  ⬇️ Downvote
                </button>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={() => toggleComments(post.id)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                  {expandedPost === post.id ? 'Hide Comments' : `Show Comments (${post.comments.length})`}
                </button>

                {expandedPost === post.id && (
                  <div style={{ marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                    <h4>Comments:</h4>
                    {post.comments.length === 0 ? (
                      <p>No comments yet.</p>
                    ) : (
                      post.comments.map((comment) => (
                        <p key={comment.id} style={{ padding: '5px 10px', borderBottom: '1px solid #eee' }}>
                          {comment.text}
                        </p>
                      ))
                    )}
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={commentTexts[post.id] || ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        style={{ width: '100%', padding: '5px' }}
                      />
                      <button
                        onClick={() => addComment(post.id)}
                        style={{ padding: '5px 10px', marginTop: '5px', cursor: 'pointer' }}
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
    </div>
  );
}
