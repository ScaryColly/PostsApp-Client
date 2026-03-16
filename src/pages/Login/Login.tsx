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
import { useAuth } from "../../context/AuthContext";
import { useStyles } from "./style";


export const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("יש למלא אימייל וסיסמה");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({
        email: email.trim(),
        password,
      });
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "התחברות נכשלה");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ py: 6, px: 2 }} className={classes.stack}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 520, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
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
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "התחברות"}
            </Button>

            <Divider>או</Divider>

            <Box display="flex" justifyContent="center">
              {isGoogleSubmitting ? (
                <CircularProgress />
              ) : (
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      setError("");
                      setIsGoogleSubmitting(true);

                      if (!credentialResponse.credential) {
                        throw new Error("Google token not received");
                      }

                      await googleLogin(credentialResponse.credential);
                      navigate("/profile");
                    } catch (err) {
                      setError(
                        err instanceof Error ? err.message : "Google login failed",
                      );
                    } finally {
                      setIsGoogleSubmitting(false);
                    }
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