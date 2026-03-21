import {
  Alert,
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
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "./queries/googleLogin";
import { useLogin } from "./queries/login";
import { useStyles } from "./style";

export const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { mutateAsync: loginUser, isPending: isSubmitting } = useLogin();
  const {
    mutate: loginWithGoogle,
    isPending: isGoogleSubmitting,
  } = useGoogleLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("יש למלא שם משתמש וסיסמה");
      return;
    }

    try {
      await loginUser({
        username: username.trim(),
        password,
      });

      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "התחברות נכשלה");
    }
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
          התחברות
        </Typography>

        <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
          כניסה לחשבון קיים
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="שם משתמש"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                "התחברות"
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

                    loginWithGoogle(credentialResponse.credential, {
                      onSuccess: () => {
                        navigate("/profile");
                      },
                      onError: (err) => {
                        setError(
                          err instanceof Error
                            ? err.message
                            : "Google login failed",
                        );
                      },
                    });
                  }}
                  onError={() => {
                    setError("ההתחברות עם גוגל נכשלה");
                  }}
                />
              )}
            </Box>

            <Typography textAlign="center">
              אין לך חשבון?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                להרשמה
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};