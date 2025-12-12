import { Box, Typography } from "@mui/material";
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  RESERVATION_BLOCK,
} from "@libs/timeline.constants";
import type { ReservationBlockModel } from "@/types/reservationBlockModel";

interface Props {
  block: ReservationBlockModel;
  onClick?: (reservationId: number) => void;
}

interface ReservationStyles {
  bgColor: string;
  borderColor: string;
  textColor: string;
}

function getReservationStyles(
  status: ReservationBlockModel["status"],
  isMine: boolean,
): ReservationStyles {
  let bgColor = RESERVATION_BLOCK.COLORS.ABLE;
  let borderColor = RESERVATION_BLOCK.BORDERS.ABLE;
  let textColor = RESERVATION_BLOCK.TEXT_COLORS.LIGHT;

  switch (status) {
    case "COMPLETED":
      bgColor = RESERVATION_BLOCK.COLORS.COMPLETED;
      borderColor = RESERVATION_BLOCK.BORDERS.COMPLETED;
      textColor = RESERVATION_BLOCK.TEXT_COLORS.DARK;
      break;

    case "RESERVED":
      if (isMine) {
        bgColor = RESERVATION_BLOCK.COLORS.MINE;
        borderColor = RESERVATION_BLOCK.BORDERS.MINE;
        textColor = RESERVATION_BLOCK.TEXT_COLORS.LIGHT;
      } else {
        bgColor = RESERVATION_BLOCK.COLORS.RESERVED;
        borderColor = RESERVATION_BLOCK.BORDERS.RESERVED;
        textColor = RESERVATION_BLOCK.TEXT_COLORS.DARK;
      }
      break;
  }

  return { bgColor, borderColor, textColor };
}

export default function ReservationBlock({ block, onClick }: Props) {
  const { bgColor, borderColor, textColor } = getReservationStyles(
    block.status,
    block.isMine,
  );

  return (
    <Box
      sx={{
        position: "absolute",
        boxSizing: "border-box",
        left: (block.startSlotIndex + 1) * CELL_WIDTH + 1,
        width: (block.slotLength - 1) * CELL_WIDTH - 6,
        height: CELL_HEIGHT - 8,
        bgcolor: bgColor,
        borderRadius: 1.5,
        m: 0.5,
        p: 1,
        overflow: "hidden",
        color: textColor,
        border: borderColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={() => onClick?.(block.reservationId)}
    >
      <Typography
        variant="caption"
        sx={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2, my: 0.3 }}
      >
        {block.userLabel}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          fontSize: 8,
          lineHeight: 1,
          mb: 0.3,
          p: 0,
        }}
      >
        {block.startLabel} - {block.endLabel}
      </Typography>
    </Box>
  );
}
