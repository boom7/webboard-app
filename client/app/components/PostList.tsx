import { Post } from "../types";
import PostCard from "./PostCard";

const PostList = ({
  posts,
  onDelete,
  onPostUpdated,
  currentUser,
}: {
  posts: Post[];
  onDelete: (id: string) => void;
  onPostUpdated: (updatedPost: Post) => void;
  currentUser: string | null;
}) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={onDelete}
          onPostUpdated={onPostUpdated} 
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default PostList;
