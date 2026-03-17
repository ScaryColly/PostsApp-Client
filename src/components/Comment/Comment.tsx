import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import { useGetUserById } from "../../pages/Posts/queries/getUserById";
import { IconButton } from "../IconButton";
import { UserAvatar } from "../UserAvatar";
import { useStyles } from "./style";
import type { CommentProps } from "./types";

export const Comment: FC<CommentProps> = ({
  comment,
  canEdit = false,
  isSaving = false,
  onEdit,
}) => {
  const { data: commentUser } = useGetUserById(comment.createdBy);
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleStartEdit = () => {
    setMessage(comment.message);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setMessage(comment.message);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    const trimmed = message.trim();

    if (!trimmed || !onEdit || trimmed === comment.message) {
      setIsEditing(false);
      return;
    }

    await onEdit(comment._id, trimmed);
    setIsEditing(false);
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    void handleSaveEdit();
  };

  return (
    <Paper key={comment._id} elevation={1} className={classes.commentCard}>
      <Stack direction="row" alignItems="flex-start" gap={1}>
        <UserAvatar user={commentUser} />
        <Box className={classes.contentWrapper}>
          <Typography className={classes.authorLabel}>
            {commentUser?.username}
          </Typography>
          {isEditing ? (
            <Stack gap={1} mt={0.5}>
              <TextField
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                multiline
                minRows={2}
                fullWidth
                size="small"
                onKeyDown={handleEditKeyDown}
              />
              <Stack direction="row" gap={1}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => void handleSaveEdit()}
                  disabled={isSaving || !message.trim()}
                >
                  {isSaving ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : (
                    "שמור"
                  )}
                </Button>
                <Button
                  size="small"
                  variant="text"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  ביטול
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Typography className={classes.commentContent}>
              {comment.message}
            </Typography>
          )}
        </Box>
        {canEdit && !isEditing && (
          <IconButton
            icon={<EditIcon fontSize="small" />}
            onClick={handleStartEdit}
          />
        )}
        {canEdit && isEditing && isSaving && <CircularProgress size={16} />}
      </Stack>
    </Paper>
  );
};
