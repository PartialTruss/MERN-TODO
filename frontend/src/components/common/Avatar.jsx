// Avatar.js (your avatar component)

const Avatar = ({ username }) => {
  // Placeholder image URL, you can replace this with a dynamic URL
  // const avatarUrl = `https://avatars.dicebear.com/api/initials/${username}.svg`;

  return (
    <div className="avatar">
      {/* <img src={avatarUrl} alt={`${username}'s avatar`} /> */}
      <span>{username}</span>
    </div>
  );
};

export default Avatar;
