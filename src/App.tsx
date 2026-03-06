import { Box } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import "./App.css";
import { Navbar } from "./components";
import { Home, Posts, Profile } from "./pages";

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
