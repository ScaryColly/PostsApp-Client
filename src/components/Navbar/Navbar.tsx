import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
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
          <Button
            className={classes.navItem}
            color="inherit"
            component={Link}
            to="/profile"
          >
            פרופיל
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
