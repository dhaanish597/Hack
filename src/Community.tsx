import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  username: string;
  title: string;
  content: string;
  created_at: string;
}

const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadPosts = async () => {
    try {
      console.log("Fetching posts...");
      const response = await fetch("http://localhost:3000/posts");
      
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received posts:", data);
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = { username, title, content };
    console.log("Attempting to create post:", newPost);

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      setUsername("");
      setTitle("");
      setContent("");
      loadPosts();
    } catch (error) {
      const err = error as Error;
      console.error("Error creating post:", err);
      alert(err.message || "Failed to create post. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Community Forum</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Create a New Post</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
            rows={4}
            required
            className="w-full p-2 mb-2 border rounded"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Post
          </button>
        </form>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p>{post.content}</p>
            <div className="text-sm text-gray-500">
              Posted by {post.username} on {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
