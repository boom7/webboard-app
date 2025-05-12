"use client";

import { useState } from "react";

const CreatePostButton = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to create a post!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setIsOpen(false);
        onPostCreated();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#3E5D4B] hover:bg-[#2F4839] text-white px-4 py-2 rounded-md text-sm font-medium transition"
      >
        Create +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#22372E]">
              Create Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded text-[#22372E] focus:ring-2 focus:ring-[#3E5D4B] focus:outline-none"
                required
              />
              <textarea
                placeholder="What's on your mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded text-[#22372E] h-32 resize-none focus:ring-2 focus:ring-[#3E5D4B] focus:outline-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#3E5D4B] text-white rounded hover:bg-[#2F4839]"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostButton;
