const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for /api/forum/posts
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post content.', votes: 0},
  { id: 2, title: 'Second Post', content: 'This is the second post content.', votes: 0 },
  { id: 3, title: 'Third Post', content: 'This is the third post content.', votes: 0 }
];

// API Route
app.get('/api/forum/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/forum/posts', (req, res) => {
  const newPost = {
    ...req.body,
    id: new Date().getTime().toString(),  // Assign a mock unique ID
    votes: 0,                             // Initialize votes to 0
    tags: [],                             // Initialize tags as an empty array
    comments: 0                           // Initialize comments count to 0
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});


app.patch('/api/forum/posts/:id/upvote', (req, res) => {
  const postId = req.params.id;  // Keep postId as a string
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.votes = (post.votes || 0) + 1;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.patch('/api/forum/posts/:id/downvote', (req, res) => {
  const postId = req.params.id;  // Keep postId as a string
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.votes = (post.votes || 0) - 1;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
