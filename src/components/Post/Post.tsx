import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetCommentCount } from "../../pages/Comments/queries/getCommentCount";
import { useGetUserById } from "../../pages/Posts/queries/getUserById";
import { useTogglePostLike } from "../../pages/Posts/queries/togglePostLike";
import { IconButton } from "../IconButton";
import { UserAvatar } from "../UserAvatar";
import { useStyles } from "./style";
import type { PostProps } from "./types";

export const Post: FC<PostProps> = ({
  post: { id, title, content, createdBy, createdAt, image, likes },
  onClick,
  onEditClick,
  onDeleteClick,
  isEditable = false,
}) => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const classes = useStyles();
  const navigate = useNavigate();
  const { data: commentCount = 0 } = useGetCommentCount(id);
  const { user } = useAuth();
  const { mutate: toggleLike, isPending: isTogglingLike } = useTogglePostLike();

  const { data: postUser } = useGetUserById(createdBy);
  const likesCount = likes?.length ?? 0;
  const isLikedByUser = !!user?._id && likes?.includes(user._id);
  const formattedCreatedAt = Number.isNaN(new Date(createdAt).getTime())
    ? createdAt
    : new Intl.DateTimeFormat("he-IL", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(createdAt));

  const resolvedImage = !image
    ? ""
    : image.startsWith("http://") || image.startsWith("https://")
      ? image
      : `${API_BASE_URL}${image}`;

  const handleEdit = () => {
    onEditClick?.();
  };

  const handleDelete = () => {
    onDeleteClick?.();
  };

  const handleCommentsClick = () => {
    navigate(`/posts/${id}/comments`);
  };

  const handleLikeClick = () => {
    if (!user?._id || isTogglingLike) {
      return;
    }

    toggleLike({ postId: id, userId: user._id, isLiked: isLikedByUser });
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
          {!!resolvedImage && (
            <Box
              component="img"
              src={resolvedImage}
              alt={title}
              className={classes.postImage}
            />
          )}
          <Typography className={classes.createdAtLabel} variant="caption">
            {formattedCreatedAt}
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
            <Tooltip title="לייקים">
              <Stack alignItems="center">
                <IconButton
                  icon={
                    isLikedByUser ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )
                  }
                  onClick={handleLikeClick}
                />
                <Typography
                  variant="caption"
                  sx={{ lineHeight: 1, mt: -0.5, color: "gray" }}
                >
                  {likesCount}
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
