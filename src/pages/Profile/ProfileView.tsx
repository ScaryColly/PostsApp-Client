import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useStyles } from "./style";
import { ProfileInfoRow } from "./ProfileInfoRow";
import { ProfileStatCard } from "./ProfileStatCard";

type ProfileViewProps = {
  classes: ReturnType<typeof useStyles>;
  user: {
    username?: string;
    email?: string;
  };
  onEdit: () => void;
};

export const ProfileView = ({ classes, user, onEdit }: ProfileViewProps) => {
  return (
    <Stack spacing={2}>
      <Paper elevation={0} className={classes.sectionCard}>
        <Typography className={classes.sectionTitle}>פרטי משתמש</Typography>

        <ProfileInfoRow
          classes={classes}
          icon={<PersonRoundedIcon />}
          label="שם משתמש"
          value={user.username}
        />

        <Divider className={classes.divider} />

        <ProfileInfoRow
          classes={classes}
          icon={<EmailRoundedIcon />}
          label="אימייל"
          value={user.email}
        />
      </Paper>

      <Paper elevation={0} className={classes.sectionCard}>
        <Typography className={classes.sectionTitle}>סטטיסטיקות</Typography>

        <Box className={classes.statsGrid}>
          <ProfileStatCard
            classes={classes}
            icon={<ArticleRoundedIcon />}
            value="24"
            label="פוסטים"
          />

          <ProfileStatCard
            classes={classes}
            icon={<CalendarMonthRoundedIcon />}
            value="2026"
            label="שנת הצטרפות"
          />
        </Box>
      </Paper>

      <Box className={classes.actionsRow}>
        <Button
          variant="contained"
          onClick={onEdit}
          className={classes.primaryButton}
        >
          עריכת פרופיל
        </Button>
      </Box>
    </Stack>
  );
};