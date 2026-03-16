import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Comments, Home, Login, Posts, Profile, Register } from "./pages";
import { theme } from "./theme";

const queryClient = new QueryClient();

export const App = () => {
  console.log("bla" + import.meta.env.VITE_GOOGLE_CLIENT_ID)
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <AuthProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route
                    path="/posts/:postId/comments"
                    element={<Comments />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
};
