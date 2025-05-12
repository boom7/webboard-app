"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserMeta from "./../../components/UserMeta";
import CommentList from "./../../components/CommentList";
import { Post } from "@/app/types";
import CommentInputBox from "@/app/components/CommentInputBox";

interface Comment {
  _id: string;
  content: string;
  username: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.id as string;
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchComments();
    }
  }, [postId]);

  const fetchPost = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
    const data = await res.json();
    setPost(data);
  };

  const fetchComments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  const handleSubmitComment = async (content: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Login first");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    setShowCommentBox(false);
    fetchComments();
  };

  const handleUpdateComment = async (
    commentId: string,
    updatedContent: string
  ) => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Login first");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: updatedContent }),
    });

    fetchComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Login first");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchComments();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <button
        onClick={() => router.back()}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 mb-4"
        title="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {post && (
        <div className="p-6 mb-6">
          <UserMeta username={post.username} />
          <h1 className="text-3xl font-bold mb-2 text-[#294B29]">{post.title}</h1>
          <p className="text-gray-800">{post.content}</p>
        </div>
      )}

      {currentUser && (
        <div className="p-6">
          {!showCommentBox && (
            <button
              onClick={() => setShowCommentBox(true)}
              className="text-[#294B29] border border-[#294B29] px-4 py-2 rounded hover:bg-[#294B29] hover:text-white transition"
            >
              Add Comment
            </button>
          )}
        </div>
      )}

      {currentUser && (
        <CommentInputBox
          visible={showCommentBox}
          onSubmit={handleSubmitComment}
          onCancel={() => setShowCommentBox(false)}
        />
      )}

      <div className="p-6">
        <CommentList
          comments={comments}
          currentUser={currentUser}
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      </div>
    </div>
  );
}
