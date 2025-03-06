import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure CORS - make it more permissive for testing
app.use(cors());  // This allows all origins temporarily

app.use(express.json());

// In-memory storage for posts with some sample data
let posts = [
    {
        id: 1,
        title: "Welcome to the Community Forum!",
        content: "This is a sample post to show how the forum works. Feel free to create your own posts!",
        username: "Admin",
        created_at: new Date().toISOString()
    }
];

// Get all posts
app.get("/posts", (req, res) => {
    try {
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Create a new post
app.post("/posts", (req, res) => {
    try {
        const { title, content, username } = req.body;
        
        if (!title || !content || !username) {
            return res.status(400).json({ 
                error: "Title, content, and username are required" 
            });
        }

        const newPost = {
            id: posts.length + 1,
            title,
            content,
            username,
            created_at: new Date().toISOString()
        };

        posts.push(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ 
            error: "Failed to create post. Please try again." 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Something went wrong! Please try again later." 
    });
});

const PORT = 3000;
const server = app.listen(PORT)
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please try a different port or kill the process using this port.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  })
  .on('listening', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });