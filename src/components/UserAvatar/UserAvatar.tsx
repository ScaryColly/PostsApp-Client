import { Avatar } from "@mui/material";
import type { FC } from "react";
import type { UserAvatarProps } from "./types";

export const UserAvatar: FC<UserAvatarProps> = ({ username }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username,
  )}&background=random&color=fff`;

  return (
    <Avatar
      alt={username}
      src={avatarUrl}
      //   sx={{ width: 40, height: 40, marginRight: 1 }}
    />
  );
};
