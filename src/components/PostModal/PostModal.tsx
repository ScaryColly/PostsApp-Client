import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { PostFormValues } from "../../requests/posts";
import { useStyles } from "./style";
import type { PostModalProps } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const getImageUrl = (image?: string): string => {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_BASE_URL}${image}`;
};

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modalTitle = post
    ? isEditMode
      ? "עריכת פוסט"
      : "פרטי הפוסט"
    : "יצירת פוסט חדש";

  const isSubmitDisabled = useMemo(() => {
    return isSubmitting;
  }, [isSubmitting]);

  const previewImage = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return getImageUrl(post?.image);
  }, [post?.image, selectedFile]);

  useEffect(() => {
    return () => {
      if (previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleModalClose = () => {
    setSelectedFile(null);
    handleClose();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

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
      imageFile: selectedFile,
    };

    if (post && isEditMode && onEditPost) {
      onEditPost(post.id, payload);
    }

    if ((!post || !isEditMode) && onCreatePost) {
      onCreatePost(payload);
    }

    handleModalClose();
  };

  const handleContentKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    event.currentTarget.closest("form")?.requestSubmit();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
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
            onKeyDown={handleContentKeyDown}
          />
          <Button component="label" variant="outlined">
            {selectedFile ? "החלפת תמונה" : "העלאת תמונה"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {!!previewImage && (
            <Box
              component="img"
              src={previewImage}
              alt={post?.title || "post image preview"}
              className={classes.previewImage}
            />
          )}
          <Box className={classes.footer}>
            <Button
              variant="text"
              onClick={handleModalClose}
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
      </Box>
    </Modal>
  );
};
