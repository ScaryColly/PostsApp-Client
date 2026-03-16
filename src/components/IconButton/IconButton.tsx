import { IconButton as IconButtonMUI } from "@mui/material";
import type { FC } from "react";

interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({ onClick, icon }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <IconButtonMUI
      size="large"
      sx={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        transition: "background 0.2s",
        "&:hover": {
          background: "rgba(0,0,0,0.08)",
          borderRadius: "50%",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
      onClick={handleClick}
    >
      {icon}
    </IconButtonMUI>
  );
};
