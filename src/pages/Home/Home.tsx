import { Box, Typography } from "@mui/material";
import { useStyles } from "./style";

export const Home = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.container}>
        <Typography className={classes.title}>Study App</Typography>
        <Typography>Why study alone? Join a community of learners!</Typography>
        <Typography>
          Here you can connect with other students, share resources, and
          collaborate on projects.
        </Typography>
        <Typography>
          Share your homework, ask for help, or just chat about your studies.
          Let's make learning more fun and social together!
        </Typography>
      </Box>
      <Box className={classes.secondaryContainer}>
        <Typography className={classes.secondaryTitle}>
          Our Resources
        </Typography>
      </Box>
    </Box>
  );
};
