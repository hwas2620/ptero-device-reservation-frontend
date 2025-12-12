import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import dayjs from "@libs/dayjs";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useReservation } from "@hooks/useReservation";
import { useDeleteReservation } from "@hooks/useDeleteReservation";

interface Props {
  open: boolean;
  reservationId: number | null;
  onClose: () => void;
}

export default function ReservationDetailDialog({
  open,
  reservationId,
  onClose,
}: Props) {
  const userId = useAuthStore((s) => s.userId);
  const { data: reservation } = useReservation(reservationId);
  const deleteMutation = useDeleteReservation();

  if (!reservation) return null;

  const isMine = reservation.user === userId;

  const handleCancel = async () => {
    await deleteMutation.mutateAsync(reservation.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>디바이스 예약</DialogTitle>

      <Box sx={{ borderTop: "1px solid #E5E7EB", mx: 2 }} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: 1.5,
          columnGap: 4,
          my: 1,
          mx: 3,
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            예약 번호
          </Typography>
          <Typography fontWeight={600}>{reservation.id}</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            예약 상태
          </Typography>
          <Typography fontWeight={600}>
            {reservation.status === "RESERVED"
              ? "사용 예정"
              : reservation.status === "IN_USE"
                ? "사용 중"
                : "사용 완료"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            팀 이름
          </Typography>
          <Typography fontWeight={600}>디지털마케팅</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            아이디 / 닉네임
          </Typography>
          <Typography fontWeight={600}>{reservation.user} / yh.choi</Typography>
        </Box>
      </Box>

      <Box sx={{ borderTop: "1px solid #E5E7EB", mx: 2 }} />

      <Box sx={{ my: 1, mx: 3 }}>
        <Typography fontWeight={600} mb={0.5}>
          OS / 디바이스
        </Typography>
        <TextField
          fullWidth
          size="small"
          disabled
          value="iOS 18.3.0 / iPhone 13"
        />
      </Box>

      <Box sx={{ my: 1, mx: 3 }}>
        <Typography fontWeight={600} mb={0.5}>
          예약 날짜
        </Typography>
        <TextField
          fullWidth
          size="small"
          disabled
          value={dayjs(reservation.start_time).format("YYYY년 M월 D일(ddd)")}
        />
      </Box>
      <Box sx={{ my: 1, mx: 3 }}>
        <Typography fontWeight={600} mb={0.5}>
          예약 시간
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            disabled
            value={dayjs(reservation.start_time).format("HH:mm")}
            fullWidth
          />
          <Typography sx={{ alignSelf: "center" }}>~</Typography>
          <TextField
            size="small"
            disabled
            value={dayjs(reservation.end_time).format("HH:mm")}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ my: 1, mx: 3 }}>
        <Typography fontWeight={600} mb={0.5}>
          예약 목적
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          disabled
          value={reservation.purpose}
        />
      </Box>
      <Box sx={{ borderTop: "1px solid #E5E7EB", mt: 1, mx: 2 }} />
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        {isMine && (
          <Button color="warning" variant="contained" onClick={handleCancel}>
            예약 취소
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
