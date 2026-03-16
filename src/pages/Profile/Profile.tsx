import {
  Alert,
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { PostsList } from "../../components";
import { PostModal } from "../../components/PostModal/PostModal";
import { useAuth } from "../../context/AuthContext";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileView } from "./ProfileView";
import { useStyles } from "./style";

import type { PostFormValues, UpsertPost } from "../../requests/posts";
import type { Post } from "../../types";

import { useCreatePost } from "../Posts/queries/createPost";
import { useDeletePost } from "../Posts/queries/deletePost";
import { useGetPostsByUserId } from "../Posts/queries/getPostsByUserId";
import { useUpdatePost } from "../Posts/queries/updatePost";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const getImageUrl = (profileImage?: string | null) => {
  if (!profileImage) return "";

  if (
    profileImage.startsWith("http://") ||
    profileImage.startsWith("https://")
  ) {
    return profileImage;
  }

  return `${API_BASE_URL}${profileImage}`;
};

export const Profile = () => {
  const classes = useStyles();
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userId = user?._id || "";

  const { data: userPosts, isLoading } = useGetPostsByUserId(userId ?? "");
  const { mutateAsync: addPost, isPending: isCreatingPost } = useCreatePost();
  const { mutateAsync: editPost, isPending: isEditingPost } = useUpdatePost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  const previewUrl = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return getImageUrl(user?.profileImage);
  }, [selectedFile, user?.profileImage]);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const postsCount = userPosts?.length ?? 0;

  const joinYear = useMemo(() => {
    if (!user?.createdAt) return "-";

    const date = new Date(user.createdAt);
    if (Number.isNaN(date.getTime())) return "-";

    return String(date.getFullYear());
  }, [user?.createdAt]);

  const resetMessages = () => {
    setError("");
    setSuccessMessage("");
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    resetMessages();
    setSelectedFile(null);
    setUsername(user?.username || "");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    resetMessages();
    setSelectedFile(null);
    setUsername(user?.username || "");
  };

  const handleAvatarClick = () => {
    if (!isEditing) {
      handleStartEdit();
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("username", username.trim());

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      await updateProfile(formData);

      setSuccessMessage("Profile updated successfully");
      setIsEditing(false);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    setSelectedPost(undefined);
  };

  const handleCreatePost = async (newPost: PostFormValues) => {
    if (!userId) return;

    const payload: UpsertPost = {
      ...newPost,
      createdBy: String(userId),
    };

    await addPost(payload);
    closeModal();
  };

  const handleEditPost = async (
    postId: string,
    updatedPost: PostFormValues,
  ) => {
    if (!userId) return;

    const originalPost = userPosts?.find((post) => post.id === postId);

    const payload: UpsertPost = {
      ...updatedPost,
      createdBy: String(originalPost?.createdBy?._id ?? userId),
    };

    await editPost({ postId, payload });
    closeModal();
  };

  const handleDeletePost = (post: Post) => {
    deletePost(post.id);

    if (selectedPost?.id === post.id) {
      setSelectedPost(undefined);
      setIsModalOpen(false);
    }
  };

  if (!user) return null;

  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.pageWrapper}>
        <Paper elevation={4} className={classes.paper}>
          <ProfileHeader
            classes={classes}
            previewUrl={previewUrl}
            username={username}
            fallbackUsername={user.username}
            fileInputRef={fileInputRef}
            onAvatarClick={handleAvatarClick}
            onFileChange={handleFileChange}
          />

          <Box className={classes.content}>
            {error && <Alert severity="error">{error}</Alert>}

            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}

            {!isEditing ? (
              <ProfileView
                classes={classes}
                user={user}
                postsCount={postsCount}
                joinYear={joinYear}
                onEdit={handleStartEdit}
              />
            ) : (
              <ProfileEditForm
                classes={classes}
                username={username}
                isSubmitting={isSubmitting}
                onUsernameChange={setUsername}
                onSubmit={handleSubmit}
                onCancel={handleCancelEdit}
              />
            )}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={4}
              mb={2}
            >
              <Typography variant="h5" className={classes.title}>
                הפוסטים שלי
              </Typography>

              <Tooltip placement="top" title="הוספת פוסט חדש">
                <Button variant="contained" onClick={openCreatePostModal}>
                  +
                </Button>
              </Tooltip>
            </Stack>

            {isLoading || isDeletingPost || isCreatingPost ? (
              <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
              <PostsList
                posts={userPosts ?? []}
                onEditClick={openEditPostModal}
                onDeleteClick={handleDeletePost}
              />
            )}
          </Box>
        </Paper>
      </Box>

      <PostModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        post={selectedPost}
        onCreatePost={handleCreatePost}
        onEditPost={handleEditPost}
        isSubmitting={isEditingPost || isCreatingPost || isDeletingPost}
        isEditMode={Boolean(selectedPost)}
      />
    </Box>
  );
};