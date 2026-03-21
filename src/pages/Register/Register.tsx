import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleRegister } from "./queries/googleRegister";
import { useRegister } from "./queries/register";
import { useStyles } from "./style";

export const Register = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { mutateAsync: registerUser, isPending: isSubmitting } = useRegister();
  const {
    mutate: registerWithGoogle,
    isPending: isGoogleSubmitting,
  } = useGoogleRegister();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    if (!selectedFile) return "";
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("יש למלא שם משתמש וסיסמה");
      return;
    }

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }

    try {
      await registerUser({
        username: username.trim(),
        password,
        profileImage: selectedFile,
      });

      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ההרשמה נכשלה");
    }
  };

  return (
    <Stack className={classes.stack}>
      <Paper elevation={3} className={classes.paper}>
        <Typography className={classes.title}>הרשמה</Typography>

        <Typography className={classes.subtitle}>
          יצירת חשבון חדש למערכת
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} className={classes.form}>
          <Stack className={classes.contentStack}>
            <Box className={classes.avatarSection}>
              <Avatar src={previewUrl || undefined} className={classes.avatar}>
                {username?.[0]?.toUpperCase()}
              </Avatar>

              <Button
                variant="outlined"
                component="label"
                className={classes.uploadButton}
              >
                העלאת תמונת פרופיל
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>

            <TextField
              label="שם משתמש"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.input}
            />

            <TextField
              label="סיסמה"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              className={classes.submitButton}
            >
              {isSubmitting ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "הרשמה"
              )}
            </Button>

            <Divider>או</Divider>

            <Box className={classes.googleWrapper}>
              {isGoogleSubmitting ? (
                <CircularProgress />
              ) : (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    setError("");

                    if (!credentialResponse.credential) {
                      setError("Google token not received");
                      return;
                    }

                    registerWithGoogle(credentialResponse.credential, {
                      onSuccess: () => {
                        navigate("/profile");
                      },
                      onError: (err) => {
                        setError(
                          err instanceof Error
                            ? err.message
                            : "Google registration failed",
                        );
                      },
                    });
                  }}
                  onError={() => {
                    setError("ההרשמה עם גוגל נכשלה");
                  }}
                />
              )}
            </Box>

            <Typography className={classes.bottomText}>
              כבר יש לך חשבון?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                להתחברות
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};