import { Box, Typography } from "@mui/material";
import { CELL_HEIGHT, RESERVATION_BLOCK } from "@libs/timeline.constants";

export default function ReservationTimelineFooter() {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        height: CELL_HEIGHT,
        px: 2,
        display: "flex",
        gap: 2,
        borderTop: "1px solid #E9ECEF",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            bgcolor: RESERVATION_BLOCK.COLORS.COMPLETED,
            border: "2px solid #00000010",
            borderRadius: 1,
          }}
        />
        <Typography variant="caption">사용 완료 / 타팀 예약</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            bgcolor: RESERVATION_BLOCK.COLORS.IN_USE,
            border: "2px solid #337AB7",
            borderRadius: 1,
          }}
        />
        <Typography variant="caption">사용 중 / 예정</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            bgcolor: RESERVATION_BLOCK.COLORS.ABLE,
            border: "2px solid #00000010",
            borderRadius: 1,
          }}
        />
        <Typography variant="caption">예약 가능</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            bgcolor: RESERVATION_BLOCK.COLORS.MINE,
            border: "2px solid #00000010",
            borderRadius: 1,
          }}
        />
        <Typography variant="caption">내 예약</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginLeft: "auto",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          최대 15일 내 조회 가능
        </Typography>
      </Box>
    </Box>
  );
}
