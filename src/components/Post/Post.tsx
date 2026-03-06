import type { FC } from "react";
import type { PostProps } from "./types";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export const Post: FC<PostProps> = ({ post }: PostProps) => {
  return (
    <Box>
      <Typography variant="h3">{post.title}</Typography>
      <Typography>{post.content}</Typography>
      <Typography>By: {post.createdBy.username}</Typography>
    </Box>
  );
};
