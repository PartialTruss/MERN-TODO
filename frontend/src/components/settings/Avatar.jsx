import { Avatar } from "@mui/material";

const AvatarImage = ({ username }) => {
  return (
    <>
      <Avatar sx={{ width: "76px", height: "76px" }}>
        {username && username.trim().length > 0
          ? username
              .split("")
              .map((word) => word.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : ""}
      </Avatar>
    </>
  );
};

export default AvatarImage;
