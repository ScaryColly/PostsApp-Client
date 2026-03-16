import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useAuth } from "../../context/AuthContext";
import { useStyles } from "./style";

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
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return getImageUrl(user?.profileImage);
  }, [selectedFile, user?.profileImage]);

  useEffect(() => {
    return () => {
      if (selectedFile && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedFile]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccessMessage("");
    setSelectedFile(null);
    setUsername(user?.username || "");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError("");
    setSuccessMessage("");
    setSelectedFile(null);
    setUsername(user?.username || "");
  };

  const handleAvatarEditClick = () => {
    if (!isEditing) {
      handleStartEdit();
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

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
          <Box className={classes.banner} />

          <Box className={classes.avatarSection}>
            <Box className={classes.avatarWrapper}>
              <Avatar src={previewUrl || undefined} className={classes.avatar}>
                {username?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
              </Avatar>

              <IconButton
                onClick={handleAvatarEditClick}
                className={classes.avatarEditButton}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <input
                ref={fileInputRef}
                className={classes.hiddenInput}
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </Box>

            <Typography className={classes.title}>הפרופיל שלי</Typography>
            <Typography className={classes.subtitle}>
              כאן אפשר לצפות ולעדכן את פרטי המשתמש שלך
            </Typography>
          </Box>

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
              <Stack spacing={2}>
                <Paper elevation={0} className={classes.sectionCard}>
                  <Typography className={classes.sectionTitle}>
                    פרטי משתמש
                  </Typography>

                  <InfoRow
                    classes={classes}
                    icon={<PersonRoundedIcon />}
                    label="שם משתמש"
                    value={user.username}
                  />

                  <Divider className={classes.divider} />

                  <InfoRow
                    classes={classes}
                    icon={<EmailRoundedIcon />}
                    label="אימייל"
                    value={user.email}
                  />
                </Paper>

                <Paper elevation={0} className={classes.sectionCard}>
                  <Typography className={classes.sectionTitle}>סטטיסטיקות</Typography>

                  <Box className={classes.statsGrid}>
                    <StatCard
                      classes={classes}
                      icon={<ArticleRoundedIcon />}
                      value="24"
                      label="פוסטים"
                    />

                    <StatCard
                      classes={classes}
                      icon={<CalendarMonthRoundedIcon />}
                      value="2026"
                      label="שנת הצטרפות"
                    />
                  </Box>
                </Paper>

                <Box className={classes.actionsRow}>
                  <Button
                    variant="contained"
                    onClick={handleStartEdit}
                    className={classes.primaryButton}
                  >
                    עריכת פרופיל
                  </Button>
                </Box>
              </Stack>
            ) : (
              <Paper elevation={0} className={classes.sectionCard}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <Typography className={classes.sectionTitle}>
                      עריכת פרופיל
                    </Typography>

                    <TextField
                      label="שם משתמש"
                      fullWidth
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                        onClick={handleCancelEdit}
                        className={classes.secondaryButton}
                      >
                        בטל
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

type InfoRowProps = {
  classes: ReturnType<typeof useStyles>;
  icon: ReactNode;
  label: string;
  value?: string;
};

const InfoRow = ({ classes, icon, label, value }: InfoRowProps) => {
  return (
    <Box className={classes.infoRow}>
      <Box className={classes.infoLeft}>
        <Box className={classes.infoIconBox}>{icon}</Box>
        <Typography className={classes.infoLabel}>{label}</Typography>
      </Box>

      <Typography className={classes.infoValue}>{value || "-"}</Typography>
    </Box>
  );
};

type StatCardProps = {
  classes: ReturnType<typeof useStyles>;
  icon: ReactNode;
  value: string;
  label: string;
};

const StatCard = ({ classes, icon, value, label }: StatCardProps) => {
  return (
    <Box className={classes.statCard}>
      <Box className={classes.statIconBox}>{icon}</Box>
      <Typography className={classes.statValue}>{value}</Typography>
      <Typography className={classes.statLabel}>{label}</Typography>
    </Box>
  );
};