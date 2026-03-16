import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { IconButton } from "../IconButton";
import { UserAvatar } from "../UserAvatar";
import { useStyles } from "./style";
import type { PostProps } from "./types";

export const Post: FC<PostProps> = ({
  post: { title, content, createdBy },
  onClick,
  onEditClick,
  onDeleteClick,
  isEditable = false,
}) => {
  const classes = useStyles();

  const handleEdit = () => {
    onEditClick?.();
  };

  const handleDelete = () => {
    onDeleteClick?.();
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
              <UserAvatar username={createdBy?.username} />
              <Typography className={classes.avatarTitle}>
                {createdBy?.username}
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
        {isEditable && (
          <Stack direction="row">
            <IconButton icon={<EditIcon />} onClick={handleEdit} />
            <IconButton icon={<DeleteIcon />} onClick={handleDelete} />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
