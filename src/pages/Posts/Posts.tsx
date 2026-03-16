import { Button, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { PostsList } from "../../components";
import { PostModal } from "../../components/PostModal/PostModal";
import type { PostFormValues, UpsertPost } from "../../requests/posts";
import { useCreatePost } from "./queries/createPost";
import { useGetAllPosts } from "./queries/getAllPosts";
import { useStyles } from "./style";

export const TEMP_CONNECTED_USER_STORAGE_KEY = "connectedUserId";
export const TEMP_FALLBACK_CONNECTED_USER_ID = "69b7f525dac444ef606f3565";

const getConnectedUserId = () => {
  const id = window.localStorage.getItem(TEMP_CONNECTED_USER_STORAGE_KEY);
  return id?.trim() || TEMP_FALLBACK_CONNECTED_USER_ID;
};

export const Posts = () => {
  const classes = useStyles();

  const { data: posts = [], isLoading } = useGetAllPosts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: addPost, isPending: isCreatingPost } = useCreatePost();

  const openCreatePostModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = (post: PostFormValues) => {
    const newPost: UpsertPost = {
      ...post,
      createdBy: getConnectedUserId(),
    };

    addPost(newPost);
  };

  return (
    <Stack className={classes.outerContainer}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title} variant="h4" gutterBottom>
          כל הפוסטים
        </Typography>
        <Tooltip placement="top" title="הוספת פוסט חדש">
          <Button variant="contained" onClick={openCreatePostModal}>
            +
          </Button>
        </Tooltip>
      </Stack>
      {isLoading || isCreatingPost ? (
        <Skeleton variant="rounded" height={200} />
      ) : (
        <PostsList posts={posts} />
      )}
      <PostModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        onCreatePost={handleCreatePost}
        isSubmitting={isCreatingPost}
      />
    </Stack>
  );
};
