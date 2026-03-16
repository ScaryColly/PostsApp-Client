import { Alert, Box, Paper } from "@mui/material";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStyles } from "./style";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileView } from "./ProfileView";
import { ProfileEditForm } from "./ProfileEditForm";

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
  const { user, updateProfile } = useAuth();
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  const previewUrl = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return getImageUrl(user?.profileImage);
  }, [selectedFile, user?.profileImage]);

  useEffect(() => {
    return () => {
      if (selectedFile && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedFile]);

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
            {error && (
              <Alert severity="error" className={classes.alert}>
                {error}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" className={classes.alert}>
                {successMessage}
              </Alert>
            )}

            {!isEditing ? (
              <ProfileView
                classes={classes}
                user={user}
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
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};