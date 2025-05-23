import Link from "next/link";
import { useState } from "react";
import UserMeta from "./UserMeta";
import DeletePostConfirmationModal from "./DeletePostConfirmationModal";
import EditPostButton from "./EditPostButton";
import { Post } from "../types";

const PostCard = ({
  post,
  onDelete,
  onPostUpdated,
  currentUser,
}: {
  post: Post;
  onDelete: (id: string) => void;
  onPostUpdated: (updatedPost: Post) => void;
  currentUser: string | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(post._id);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start">
      <div>
        <UserMeta username={post.username} />

        <Link href={`/board/${post._id}`}>
          <h3 className="text-xl font-semibold text-[#294B29] hover:underline">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-700 mt-1">{post.content}</p>
      </div>

      {currentUser === post.username && (
        <div className="flex space-x-4">
          <EditPostButton
            postId={post._id}
            currentTitle={post.title}
            currentContent={post.content}
            onPostUpdated={onPostUpdated}
          />

          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete post"
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

      {isModalOpen && (
        <DeletePostConfirmationModal
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default PostCard;
