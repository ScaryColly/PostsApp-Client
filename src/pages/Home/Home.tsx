import { Box, Typography } from "@mui/material";
import { useStyles } from "./style";

export const Home = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.container}>
        <Typography className={classes.title}>Study App</Typography>
        <Typography>למה ללמוד לבד? הצטרפו לקהילה של לומדים!</Typography>
        <Typography>
          כאן תוכלו להתחבר עם סטודנטים אחרים, לשתף משאבים, ולשתף פעולה
          בפרויקטים.
        </Typography>
        <Typography>
          שתפו את שיעורי הבית שלכם, בקשו עזרה, או פשוט שוחחו על הלימודים שלכם.
          בואו נעשה את הלמידה למהנה וחברתית יותר יחד!
        </Typography>
      </Box>
      <Box className={classes.secondaryContainer}>
        <Typography className={classes.secondaryTitle}>המשאבים שלנו</Typography>
      </Box>
    </Box>
  );
};
