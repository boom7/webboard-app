import React, { useState } from "react";
import UserMeta from "./UserMeta";

interface Comment {
  _id: string;
  content: string;
  username: string;
}

interface Props {
  comments: Comment[];
  currentUser: string | null;
  onDelete: (commentId: string) => void;
  onUpdate: (commentId: string, updatedContent: string) => void;
}

export default function CommentList({
  comments,
  currentUser,
  onDelete,
  onUpdate,
}: Props) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const saveEdit = (commentId: string) => {
    if (editContent.trim() !== "") {
      onUpdate(commentId, editContent);
      setEditingCommentId(null);
      setEditContent("");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-[#294B29]">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="border-t border-gray-200 pt-4 mt-4"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <UserMeta username={comment.username} />
                {editingCommentId === comment._id ? (
                  <div className="ml-10 mt-2">
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(comment._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 ml-10">{comment.content}</p>
                )}
              </div>

              {currentUser === comment.username && editingCommentId !== comment._id && (
                <div className="flex space-x-2">
                  {/* Edit icon */}
                  <button
                    onClick={() => startEditing(comment)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit comment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>

                  {/* Delete icon */}
                  <button
                    onClick={() => onDelete(comment._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete comment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="green"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}
