const UserMeta = ({ username }: { username?: string }) => (
  <div className="flex items-center space-x-2 mb-2">
    <img
      src={`https://ui-avatars.com/api/?name=${
        username || "User"
      }&background=random&color=fff`}
      alt="User avatar"
      className="w-8 h-8 rounded-full object-cover"
    />
    <span className="text-sm font-medium text-gray-800">{username}</span>
  </div>
);

export default UserMeta;
