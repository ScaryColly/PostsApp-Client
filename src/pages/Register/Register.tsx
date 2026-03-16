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
import type { RegisterPayload } from "../../types/auth";
import { useGoogleRegister } from "./queries/googleRegister";
import { useRegister } from "./queries/register";
import { useStyles } from "./style";

export const Register = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    mutate: registerUser,
    isPending: isSubmitting,
    isError,
  } = useRegister();
  const { mutate: registerWithGoogle, isPending: isGoogleSubmitting } =
    useGoogleRegister();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    if (!selectedFile) {
      return "";
    }
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("יש למלא שם משתמש, אימייל וסיסמה");
      return;
    }

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }

    const payload: RegisterPayload = {
      username: username.trim(),
      email: email.trim(),
      password,
      profileImage: null,
    };

    registerUser(payload);
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ py: 6, px: 2 }}
      className={classes.stack}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 520, p: 4, borderRadius: 4 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          הרשמה
        </Typography>

        <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
          יצירת חשבון חדש למערכת
        </Typography>

        {(error || isError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack alignItems="center" spacing={1}>
              <Avatar
                src={previewUrl || undefined}
                sx={{ width: 88, height: 88 }}
              >
                {username?.[0]?.toUpperCase()}
              </Avatar>

              <Button variant="outlined" component="label">
                העלאת תמונת פרופיל
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Stack>

            <TextField
              label="שם משתמש"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="אימייל"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="סיסמה"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "הרשמה"
              )}
            </Button>

            <Divider>או</Divider>

            <Box display="flex" justifyContent="center">
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

            <Typography textAlign="center">
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
