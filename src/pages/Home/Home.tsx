import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

export const Home = () => {
  const classes = useStyles();

  const features = [
    {
      title: "שאלות ותשובות",
      description: "שאלו שאלות וקבלו עזרה מסטודנטים אחרים במהירות.",
    },
    {
      title: "למידה משותפת",
      description: "מצאו שותפים ללמידה לפי קורסים ונושאים.",
    },
    {
      title: "סיכומים וחומרים",
      description: "שתפו סיכומים, תרגולים וחומרי עזר שימושיים.",
    },
    {
      title: "עזרה לפני מבחן",
      description: "קבלו הכוונה מהירה לקראת מבחנים ותרגילים.",
    },
  ];

  return (
    <Box className={classes.page}>
      <Box className={classes.heroSection}>
        <Box className={classes.container}>
          <Typography className={classes.title}>
            לומדים יחד, מצליחים יחד
          </Typography>

          <Typography className={classes.subtitle}>
            פלטפורמה לסטודנטים שרוצים לשאול, לעזור, ללמוד ולהתקדם ביחד
          </Typography>

          <Typography className={classes.description}>
            כאן תוכלו להתחבר עם סטודנטים אחרים, לבקש עזרה בנושאים לימודיים,
            לשתף ידע ולמצוא קהילה תומכת לאורך הדרך.
          </Typography>

          <Box className={classes.actionsRow}>
            <Button
              variant="outlined"
              className={classes.secondaryButton}
              component={Link}
              to="/posts"
            >
              שאל/י שאלה
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className={classes.secondaryContainer}>
        <Typography className={classes.secondaryTitle}>
          מה אפשר לעשות כאן?
        </Typography>

        <Box className={classes.cardsGrid}>
          {features.map((feature) => (
            <Box key={feature.title} className={classes.card}>
              <Typography className={classes.cardTitle}>
                {feature.title}
              </Typography>
              <Typography className={classes.cardDescription}>
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};