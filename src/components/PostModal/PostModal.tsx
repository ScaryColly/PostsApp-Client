import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import type { FC, FormEvent } from "react";
import { useMemo } from "react";
import type { PostFormValues } from "../../requests/posts";
import { useStyles } from "./style";
import type { PostModalProps } from "./types";

export const PostModal: FC<PostModalProps> = ({
  isOpen,
  handleClose,
  post,
  isEditMode = false,
  onCreatePost,
  onEditPost,
  isSubmitting = false,
}) => {
  const classes = useStyles();

  const modalTitle = post
    ? isEditMode
      ? "עריכת פוסט"
      : "פרטי הפוסט"
    : "יצירת פוסט חדש";

  const isSubmitDisabled = useMemo(() => {
    return isSubmitting;
  }, [isSubmitting]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    if (!title || !content) {
      return;
    }

    const payload: PostFormValues = {
      title,
      content,
    };

    if (post && isEditMode && onEditPost) {
      await onEditPost(post.id, payload);
    }

    if ((!post || !isEditMode) && onCreatePost) {
      await onCreatePost(payload);
    }

    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.container}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className={classes.header}
        >
          {modalTitle}
        </Typography>

        {post && !isEditMode ? (
          <>
            <Typography variant="h5" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              נכתב על ידי {post.createdBy.username}
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              className={classes.viewContent}
            >
              {post.content}
            </Typography>
            <Box className={classes.footer}>
              <Button variant="outlined" onClick={handleClose}>
                סגירה
              </Button>
            </Box>
          </>
        ) : (
          <Box component="form" className={classes.form} onSubmit={onSubmit}>
            <TextField
              className={classes.input}
              name="title"
              label="כותרת"
              defaultValue={post?.title ?? ""}
              fullWidth
              required
            />
            <TextField
              className={classes.input}
              name="content"
              label="תוכן"
              defaultValue={post?.content ?? ""}
              fullWidth
              required
              multiline
              minRows={4}
            />
            <Box className={classes.footer}>
              <Button
                variant="text"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitDisabled}
              >
                {post ? "שמירה" : "יצירה"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};
