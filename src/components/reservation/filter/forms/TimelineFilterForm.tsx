import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { TimelineFilter } from "@/types/reservationFilters";
import type { Device } from "@/types/device";
interface Props {
  filters: TimelineFilter;
  onChange: (next: TimelineFilter) => void;
  devices: Device[];
}

export default function TimelineFilterForm({
  filters,
  onChange,
  devices,
}: Props) {
  const [localUser, setLocalUser] = useState(filters.user ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ ...filters, user: localUser || null });
    }, 300);
    return () => clearTimeout(t);
  }, [localUser]);

  const isIOS = filters.os.includes("iOS");
  const isAndroid = filters.os.includes("Android");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography fontWeight={600}>OS</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAndroid}
              onChange={(e) =>
                onChange({
                  ...filters,
                  os: e.target.checked
                    ? [...filters.os, "Android"]
                    : filters.os.filter((v) => v !== "Android"),
                })
              }
            />
          }
          label="Android"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isIOS}
              onChange={(e) =>
                onChange({
                  ...filters,
                  os: e.target.checked
                    ? [...filters.os, "iOS"]
                    : filters.os.filter((v) => v !== "iOS"),
                })
              }
            />
          }
          label="iOS"
        />
      </Box>

      <Typography fontWeight={600}>디바이스</Typography>

      <FormControl fullWidth size="small">
        <Select
          value={filters.device ?? ""}
          displayEmpty
          onChange={(e) =>
            onChange({ ...filters, device: e.target.value || null })
          }
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography sx={{ color: "#999" }}>
                  디바이스를 선택해주세요.
                </Typography>
              );
            }
            return devices.find((d) => d.device_key === selected)?.device_name;
          }}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>

          {devices.map((d) => (
            <MenuItem key={d.device_key} value={d.device_key}>
              {d.device_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography fontWeight={600}>아이디 / 닉네임</Typography>
      <TextField
        fullWidth
        size="small"
        value={localUser}
        onChange={(e) => setLocalUser(e.target.value)}
      />
    </Box>
  );
}
