"use client";

import PostList from "./../components/PostList";
import CreatePostButton from "../components/CreatePostButton";
import { useEffect, useState } from "react";
import { Post } from "../types";

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setCurrentUser(username);
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Login first");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchPosts();
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white border border-[#CCCCCC] text-[#1F1F1F] placeholder-[#777777] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#294B29]"
        />
        <select className="w-48 bg-white border border-[#CCCCCC] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#294B29]">
          <option value="">All Topics</option>
        </select>
        <CreatePostButton onPostCreated={fetchPosts} />
      </div>
      <PostList
        posts={filteredPosts}
        onDelete={handleDelete}
        onPostUpdated={handlePostUpdated} 
        currentUser={currentUser}
      />
    </>
  );
}
