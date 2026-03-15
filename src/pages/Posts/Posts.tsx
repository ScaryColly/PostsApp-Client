import { Button, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { PostsList } from "../../components";
import { PostModal } from "../../components/PostModal/PostModal";
import type { PostFormValues, UpsertPost } from "../../requests/posts";
import type { Post as PostType } from "../../types";
import { useCreatePost } from "./queries/createPost";
import { useGetAllPosts } from "./queries/getAllPosts";
import { useUpdatePost } from "./queries/updatePost";
import { useStyles } from "./style";

const TEMP_CONNECTED_USER_STORAGE_KEY = "connectedUserId";
const TEMP_FALLBACK_CONNECTED_USER_ID = "69b6f0ae229ece9c7dda0883";

const getConnectedUserId = () => {
  const id = window.localStorage.getItem(TEMP_CONNECTED_USER_STORAGE_KEY);
  return id?.trim() || TEMP_FALLBACK_CONNECTED_USER_ID;
};

export const Posts = () => {
  const classes = useStyles();

  const { data: posts = [], isLoading } = useGetAllPosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | undefined>();

  const { mutateAsync: addPost, isPending: isCreatingPost } = useCreatePost();
  const { mutateAsync: editPost, isPending: isEditingPost } = useUpdatePost();

  const openCreatePostModal = () => {
    setSelectedPost(undefined);
    setIsModalOpen(true);
  };

  const openPostDetailsModal = (post: PostType) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditPost = async (
    postId: string,
    updatedPost: PostFormValues,
  ) => {
    const originalPost = posts.find((post) => post.id === postId);
    const createdBy = originalPost?.createdBy?.id;

    const payload: UpsertPost = {
      ...updatedPost,
      createdBy: String(createdBy ?? getConnectedUserId()),
    };

    await editPost({ postId, payload });
  };

  const handleCreatePost = async (newPost: PostFormValues) => {
    const payload: UpsertPost = {
      ...newPost,
      createdBy: getConnectedUserId(),
    };

    await addPost(payload);
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
      {isLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <PostsList posts={posts} onPostClick={openPostDetailsModal} />
      )}
      <PostModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        post={selectedPost}
        onCreatePost={handleCreatePost}
        onEditPost={handleEditPost}
        isSubmitting={isEditingPost || isCreatingPost}
      />
    </Stack>
  );
};
