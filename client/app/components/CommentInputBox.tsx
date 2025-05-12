"use client";

import { useState, useEffect } from "react";

interface Props {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  visible: boolean;
}

export default function CommentInputBox({ onSubmit, onCancel, visible }: Props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!visible) {
      setContent(""); // Reset when hidden
    }
  }, [visible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <>
      {visible && (
        <div className="hidden sm:block p-6">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?..."
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-900 resize-none mb-4 h-24"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#294B29] text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}

      {visible && (
        <div className="sm:hidden fixed inset-0  bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white w-full sm:max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-[#294B29] mb-4">Add Comment</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-900 resize-none mb-4 h-24"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#294B29] text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
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
}
