const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for /api/forum/posts
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post content.' },
  { id: 2, title: 'Second Post', content: 'This is the second post content.' },
  { id: 3, title: 'Third Post', content: 'This is the third post content.' }
];

// API Route
app.get('/api/forum/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/forum/posts', (req, res) => {
    const newPost = req.body;
    newPost.id = new Date().getTime().toString(); // Assign a mock unique ID
    posts.push(newPost);
    res.status(201).json(newPost);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
