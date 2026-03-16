import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useStyles } from "./style";

type ProfileStatCardProps = {
  classes: ReturnType<typeof useStyles>;
  icon: ReactNode;
  value: string;
  label: string;
};

export const ProfileStatCard = ({
  classes,
  icon,
  value,
  label,
}: ProfileStatCardProps) => {
  return (
    <Box className={classes.statCard}>
      <Box className={classes.statIconBox}>{icon}</Box>
      <Typography className={classes.statValue}>{value}</Typography>
      <Typography className={classes.statLabel}>{label}</Typography>
    </Box>
  );
};