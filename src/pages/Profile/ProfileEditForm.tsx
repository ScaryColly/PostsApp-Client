import { Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useStyles } from "./style";

type ProfileEditFormProps = {
  classes: ReturnType<typeof useStyles>;
  username: string;
  isSubmitting: boolean;
  onUsernameChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
};

export const ProfileEditForm = ({
  classes,
  username,
  isSubmitting,
  onUsernameChange,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) => {
  return (
    <Paper elevation={0} className={classes.sectionCard}>
      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Typography className={classes.sectionTitle}>
            עריכת פרופיל
          </Typography>

          <TextField
            label="שם משתמש"
            fullWidth
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className={classes.textField}
          />

          <Typography className={classes.formNote}>
            לחצי על אייקון העיפרון שעל תמונת הפרופיל כדי לבחור תמונה חדשה
          </Typography>

          <Box className={classes.actionsRow}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              className={classes.primaryButton}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "שמור שינויים"
              )}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={onCancel}
              className={classes.secondaryButton}
            >
              בטל
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};