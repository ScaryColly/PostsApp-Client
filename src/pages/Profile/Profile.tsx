import { Button, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { PostsList } from "../../components";
import { PostModal } from "../../components/PostModal/PostModal";
import type { PostFormValues, UpsertPost } from "../../requests/posts";
import type { Post } from "../../types";
import {
  TEMP_CONNECTED_USER_STORAGE_KEY,
  TEMP_FALLBACK_CONNECTED_USER_ID,
} from "../Posts";
import { useCreatePost } from "../Posts/queries/createPost";
import { useDeletePost } from "../Posts/queries/deletePost";
import { useGetPostsByUserId } from "../Posts/queries/getPostsByUserId";
import { useUpdatePost } from "../Posts/queries/updatePost";
import { useStyles } from "./style";

const getConnectedUserId = () => {
  const id = window.localStorage.getItem(TEMP_CONNECTED_USER_STORAGE_KEY);
  return id?.trim() || TEMP_FALLBACK_CONNECTED_USER_ID;
};

//TODO: להוסיף כאן את כל המידע שרלוונטי לפרופיל, כמו הפוסטים שיצר המשתמש, התגובות שכתב וכו'
export const Profile = () => {
  const classes = useStyles();
  const connectedUserId = getConnectedUserId();
  const { data: userPosts, isLoading } = useGetPostsByUserId(connectedUserId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();

  const { mutateAsync: addPost, isPending: isCreatingPost } = useCreatePost();
  const { mutateAsync: editPost, isPending: isEditingPost } = useUpdatePost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  const openCreatePostModal = () => {
    setSelectedPost(undefined);
    setIsModalOpen(true);
  };

  const openEditPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditPost = (postId: string, updatedPost: PostFormValues) => {
    const originalPost = userPosts?.find((post) => post.id === postId);
    const createdBy = originalPost?.createdBy?.id;

    const payload: UpsertPost = {
      ...updatedPost,
      createdBy: String(createdBy ?? getConnectedUserId()),
    };

    editPost({ postId, payload });
  };

  const handleCreatePost = (newPost: PostFormValues) => {
    const payload: UpsertPost = {
      ...newPost,
      createdBy: getConnectedUserId(),
    };

    addPost(payload);
  };

  const handleDeletePost = (post: Post) => {
    deletePost(post.id);

    if (selectedPost?.id === post.id) {
      setSelectedPost(undefined);
      setIsModalOpen(false);
    }
  };

  return (
    <Stack className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        הפרופיל שלי
      </Typography>
      {/* להוסיף כאן מידע נוסף על המשתמש, כמו הפוסטים שיצר, תגובות שכתב וכו' */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" className={classes.title}>
          הפוסטים שלי
        </Typography>
        <Tooltip placement="top" title="הוספת פוסט חדש">
          <Button variant="contained" onClick={openCreatePostModal}>
            +
          </Button>
        </Tooltip>
      </Stack>
      {isLoading || !userPosts || isDeletingPost || isCreatingPost ? (
        <Skeleton variant="rectangular" width="100%" height={200} />
      ) : (
        <PostsList
          posts={userPosts}
          onEditClick={openEditPostModal}
          onDeleteClick={handleDeletePost}
        />
      )}
      <PostModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        post={selectedPost}
        onCreatePost={handleCreatePost}
        onEditPost={handleEditPost}
        isSubmitting={isEditingPost || isCreatingPost || isDeletingPost}
        isEditMode={Boolean(selectedPost)}
      />
    </Stack>
  );
};
