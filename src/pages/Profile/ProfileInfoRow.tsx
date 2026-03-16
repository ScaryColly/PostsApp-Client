import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useStyles } from "./style";

type ProfileInfoRowProps = {
  classes: ReturnType<typeof useStyles>;
  icon: ReactNode;
  label: string;
  value?: string;
};

export const ProfileInfoRow = ({
  classes,
  icon,
  label,
  value,
}: ProfileInfoRowProps) => {
  return (
    <Box className={classes.infoRow}>
      <Box className={classes.infoLeft}>
        <Box className={classes.infoIconBox}>{icon}</Box>
        <Typography className={classes.infoLabel}>{label}</Typography>
      </Box>

      <Typography className={classes.infoValue}>{value || "-"}</Typography>
    </Box>
  );
};