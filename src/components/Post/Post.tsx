import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetCommentCount } from "../../pages/Comments/queries/getCommentCount";
import { useGetUserById } from "../../pages/Posts/queries/getUserById";
import { IconButton } from "../IconButton";
import { UserAvatar } from "../UserAvatar";
import { useStyles } from "./style";
import type { PostProps } from "./types";

export const Post: FC<PostProps> = ({
  post: { id, title, content, createdBy },
  onClick,
  onEditClick,
  onDeleteClick,
  isEditable = false,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { data: commentCount = 0 } = useGetCommentCount(id);
  const { user } = useAuth();

  const createdById =
  typeof createdBy === "string"
    ? createdBy
    : createdBy?._id;
  
  const { data: postUser } = useGetUserById(createdById);

  const handleEdit = () => {
    onEditClick?.();
  };

  const handleDelete = () => {
    onDeleteClick?.();
  };

  const handleCommentsClick = () => {
    navigate(`/posts/${id}/comments`);
  };

  return (
    <Paper
      elevation={2}
      className={classes.postContainer}
      onClick={onClick}
      sx={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Stack width="100%" direction="row" justifyContent="space-between">
        <Box>
          <Stack direction="row" alignItems="center">
            <Stack>
              {postUser && <UserAvatar user={postUser} />}
              <Typography className={classes.avatarTitle}>
                {postUser?.username}
              </Typography>
            </Stack>
            <Typography className={classes.title} variant="h5" gutterBottom>
              {title}
            </Typography>
          </Stack>
          <Typography variant="body1" gutterBottom>
            {content}
          </Typography>
        </Box>
        {!!user && (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            gap={0}
          >
            <Tooltip title="תגובות">
              <Stack alignItems="center">
                <IconButton
                  icon={<ChatBubbleOutlineIcon />}
                  onClick={handleCommentsClick}
                />
                <Typography
                  variant="caption"
                  sx={{ lineHeight: 1, mt: -0.5, color: "gray" }}
                >
                  {commentCount}
                </Typography>
              </Stack>
            </Tooltip>
            {isEditable && (
              <>
                <IconButton icon={<EditIcon />} onClick={handleEdit} />
                <IconButton icon={<DeleteIcon />} onClick={handleDelete} />
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
