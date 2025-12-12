import { CELL_HEIGHT, CELL_WIDTH } from "@/libs/timeline.constants";
import { Box, Typography } from "@mui/material";
import type { Device } from "@/types/device";

interface Props {
  device: Device;
}

export default function DeviceInfo({ device }: Props) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        height: CELL_HEIGHT,
        width: CELL_WIDTH * 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 1,
        borderRight: "2px solid #0000001A",
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
        {device.device_name}
      </Typography>
      <Typography sx={{ fontSize: 10, color: "text.secondary" }}>
        {device.device_manufacturer} · {device.device_os}
      </Typography>
    </Box>
  );
}
