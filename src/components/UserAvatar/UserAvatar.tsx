import { Avatar } from "@mui/material";
import type { FC } from "react";
import type { UserAvatarProps } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const getImageUrl = (profileImage?: string | null): string => {
  if (!profileImage) return "";
  if (
    profileImage.startsWith("http://") ||
    profileImage.startsWith("https://")
  ) {
    return profileImage;
  }
  return `${API_BASE_URL}${profileImage}`;
};

export const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const resolvedImage = getImageUrl(user?.profileImage);
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.username || "",
  )}&background=random&color=fff`;

  return <Avatar alt={user?.username} src={resolvedImage || fallbackUrl} />;
};
