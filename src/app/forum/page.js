"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forum/posts');
        console.log('Fetched posts:', response.data); // Debugging to ensure tags are fetched
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

    const matchesTag = filterTag === '' || (post.tags || []).includes(filterTag);

    return (inTitleOrContent || inComments) && matchesTag;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forum/posts', {
        ...newPost,
        tags: newPost.tags || [] // Ensure tags are always sent
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '', tags: [] });
    } catch (error) {
      console.error('Failed to create post:', error);
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
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Select Tags:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {availableTags.map((tag) => (
              <label key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
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
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Create Post
        </button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Filter by Tag:</label>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        >
          <option value="">All Tags</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Posts</h2>
        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><strong>Tags:</strong> {post.tags?.join(', ') || 'No tags'}</p>
              <div style={{ marginTop: '20px' }}>
                <button onClick={() => toggleComments(post.id)} style={{ padding: '5px 10px' }}>
                  {expandedPost === post.id ? 'Hide Comments' : `Show Comments (${post.comments.length})`}
                </button>
                {expandedPost === post.id && (
                  <div style={{ marginTop: '10px' }}>
                    <h4>Comments:</h4>
                    {post.comments.length === 0 ? <p>No comments yet.</p> : null}
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
