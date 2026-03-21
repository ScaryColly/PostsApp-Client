import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStyles } from "./style";

export const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" sx={{ flexGrow: 1 }}>
          Study App
        </Typography>

        <Box className={classes.box}>
          <Button className={classes.navItem} color="inherit" component={Link} to="/">
            בית
          </Button>

          <Button
            className={classes.navItem}
            color="inherit"
            component={Link}
            to="/posts"
          >
            פוסטים
          </Button>

          {isAuthenticated && (
            <Button
              className={classes.navItem}
              color="inherit"
              component={Link}
              to="/profile"
            >
              פרופיל
            </Button>
          )}

          {!isAuthenticated ? (
            <>
              <Button
                className={classes.navItem}
                color="inherit"
                component={Link}
                to="/login"
              >
                התחברות
              </Button>
              <Button
                className={classes.navItem}
                color="inherit"
                component={Link}
                to="/register"
              >
                הרשמה
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ mx: 2, fontSize: "0.95rem" }}>
                שלום, {user?.username}
              </Typography>
              <Button className={classes.navItem} color="inherit" onClick={handleLogout}>
                התנתקות
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};