import { Box, Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useGetUserById } from "../../pages/Posts/queries/getUserById";
import { UserAvatar } from "../UserAvatar";
import { useStyles } from "./style";
import type { CommentProps } from "./types";

export const Comment: FC<CommentProps> = ({ comment }) => {
  const createdById =
  typeof comment.createdBy === "string"
    ? comment.createdBy
    : comment.createdBy?._id;
  const { data: commentUser } = useGetUserById(comment.createdBy);
  const classes = useStyles();

  return (
    <Paper key={comment._id} elevation={1} className={classes.commentCard}>
      <Stack direction="row" alignItems="center" gap={1}>
        <UserAvatar user={commentUser} />
        <Box>
          <Typography className={classes.authorLabel}>
            {commentUser?.username}
          </Typography>
          <Typography className={classes.commentContent}>
            {comment.message}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
