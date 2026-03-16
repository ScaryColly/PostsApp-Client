import { Avatar, Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { ChangeEvent, RefObject } from "react";
import { useStyles } from "./style";

type ProfileHeaderProps = {
  classes: ReturnType<typeof useStyles>;
  previewUrl: string;
  username: string;
  fallbackUsername?: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onAvatarClick: () => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileHeader = ({
  classes,
  previewUrl,
  username,
  fallbackUsername,
  fileInputRef,
  onAvatarClick,
  onFileChange,
}: ProfileHeaderProps) => {
  return (
    <>
      <Box className={classes.banner} />

      <Box className={classes.avatarSection}>
        <Box className={classes.avatarWrapper}>
          <Avatar src={previewUrl || undefined} className={classes.avatar}>
            {username?.[0]?.toUpperCase() || fallbackUsername?.[0]?.toUpperCase()}
          </Avatar>

          <IconButton
            onClick={onAvatarClick}
            className={classes.avatarEditButton}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <input
            ref={fileInputRef}
            className={classes.hiddenInput}
            accept="image/*"
            type="file"
            onChange={onFileChange}
          />
        </Box>

        <Typography className={classes.title}>הפרופיל שלי</Typography>
        <Typography className={classes.subtitle}>
          כאן אפשר לצפות ולעדכן את פרטי המשתמש שלך
        </Typography>
      </Box>
    </>
  );
};