import { Box } from "@mui/material";
import { RESERVATION_BLOCK } from "@libs/timeline.constants";

interface Props {
  onClick: () => void;
}

export default function ReservationCreateButton({ onClick }: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        height: "80%",
        width: "80%",
        bgcolor: RESERVATION_BLOCK.COLORS.ABLE,
        borderRadius: 1,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        color: RESERVATION_BLOCK.TEXT_COLORS.DARK,
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        border: RESERVATION_BLOCK.BORDERS.ABLE,
        userSelect: "none",
        "&:hover": {
          bgcolor: "#FFB300",
        },
      }}
    >
      예약
    </Box>
  );
}
