import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

export const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" sx={{ flexGrow: 1 }}>
          Study App
        </Typography>
        <Box className={classes.box}>
          <Button
            className={classes.navItem}
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            className={classes.navItem}
            color="inherit"
            component={Link}
            to="/posts"
          >
            Posts
          </Button>
          <Button
            className={classes.navItem}
            color="inherit"
            component={Link}
            to="/profile"
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
