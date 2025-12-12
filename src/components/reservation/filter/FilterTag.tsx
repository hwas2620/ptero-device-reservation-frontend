import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  label: string;
  onDelete: () => void;
}

export default function FilterTag({ label, onDelete }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #E0E0E0",
        borderRadius: "8px",
        height: 32,
        px: 1.5,
        bgcolor: "white",
        gap: 0.5,
        "&:hover": {
          borderColor: "#C0C0C0",
        },
      }}
    >
      <Typography sx={{ fontSize: 14 }}>{label}</Typography>
      <IconButton
        size="small"
        onClick={onDelete}
        sx={{
          padding: 0,
          width: 18,
          height: 18,
          color: "#999",
          "&:hover": { color: "#666" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
