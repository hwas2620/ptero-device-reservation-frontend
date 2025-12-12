import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ReservationSuccessDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 64, color: "#9CCC65" }} />
          <Typography sx={{ fontWeight: 600 }}>예약 되었습니다.</Typography>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              mt: 1,
              bgcolor: "#FFC107",
              color: "#000",
              "&:hover": { bgcolor: "#FFB300" },
            }}
          >
            확인
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
