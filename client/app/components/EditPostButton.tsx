"use client";

import { useState } from "react";
import { Post } from "../types";

interface EditPostButtonProps {
  postId: string;
  currentTitle: string;
  currentContent: string;
  onPostUpdated: (updatedPost: Post) => void;
}

const EditPostButton: React.FC<EditPostButtonProps> = ({
  postId,
  currentTitle,
  currentContent,
  onPostUpdated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to edit a post!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const updatedPost: Post = await response.json();
        onPostUpdated(updatedPost); 
        setIsOpen(false);
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
        className="p-2 text-[#3E5D4B] hover:text-[#2F4839] transition"
        aria-label="Edit post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="green"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#22372E]">
              Edit Post
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPostButton;
