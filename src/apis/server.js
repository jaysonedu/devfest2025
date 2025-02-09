const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock data for /api/forum/posts
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post content.', votes: 0, tags: [], comments: [] },
  { id: 2, title: 'Second Post', content: 'This is the second post content.', votes: 0, tags: [], comments: [] },
  { id: 3, title: 'Third Post', content: 'This is the third post content.', votes: 0, tags: [], comments: [] }
];

// API Route to fetch all posts
app.get('/api/forum/posts', (req, res) => {
  res.json(posts);
});

// API Route to create a new post
app.post('/api/forum/posts', (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const newPost = {
    id: Date.now().toString(),  // Unique post ID
    title: req.body.title,
    content: req.body.content,
    votes: 0,
    tags: [],
    comments: []
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// API Route to upvote a specific post
app.patch('/api/forum/posts/:id/upvote', (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id.toString() === postId);

  if (post) {
    post.votes = (post.votes || 0) + 1;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// API Route to downvote a specific post
app.patch('/api/forum/posts/:id/downvote', (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id.toString() === postId);

  if (post) {
    post.votes = (post.votes || 0) - 1;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// API Route to add a new comment to a specific post
app.post('/api/forum/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id.toString() === postId);

  if (!req.body.text || req.body.text.trim() === '') {
    return res.status(400).json({ message: 'Comment text is required.' });
  }

  if (post) {
    const newComment = {
      id: Date.now().toString(),   // Unique comment ID
      text: req.body.text,
      createdAt: new Date().toISOString()
    };

    post.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
