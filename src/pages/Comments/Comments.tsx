import {
  Button,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Comment } from "../../components/Comment";
import { useAuth } from "../../context/AuthContext";
import { useCreateComment } from "./queries/createComment";
import { useGetCommentsByPostId } from "./queries/getCommentsByPostId";
import { useStyles } from "./style";

export const Comments = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const classes = useStyles();
  const { user } = useAuth();

  const { data: comments = [], isLoading } = useGetCommentsByPostId(postId);
  const { mutateAsync: addComment, isPending: isSubmitting } =
    useCreateComment();

  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    const trimmed = newComment.trim();
    if (!trimmed || !postId) return;

    addComment({
      message: trimmed,
      postId,
      createdBy: user?._id || "",
    });
    setNewComment("");
  };

  return (
    <Stack className={classes.container} gap={3}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Button variant="text" onClick={() => navigate(-1)}>
          ← חזרה
        </Button>
        <Typography variant="h5" className={classes.title}>
          תגובות
        </Typography>
      </Stack>

      <Stack direction="row" gap={1} alignItems="flex-start">
        <TextField
          className={classes.input}
          fullWidth
          multiline
          minRows={2}
          label="כתוב תגובה..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || !newComment.trim()}
          sx={{ minWidth: 90, height: 56 }}
        >
          {isSubmitting ? <CircularProgress size={20} /> : "שלח"}
        </Button>
      </Stack>

      <Divider />

      {isLoading ? (
        <Stack gap={2}>
          <Skeleton variant="rounded" height={80} />
          <Skeleton variant="rounded" height={80} />
          <Skeleton variant="rounded" height={80} />
        </Stack>
      ) : comments.length === 0 ? (
        <Typography className={classes.noComments}>
          אין עדיין תגובות. היה הראשון להגיב!
        </Typography>
      ) : (
        <Stack gap={2}>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
