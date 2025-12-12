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
import { DatePicker } from "@mui/x-date-pickers";
import type { HistoryFilter } from "@/types/reservationFilters";
import type { Device } from "@/types/device";
import type { ReservationStatus } from "@/types/reservation";

interface Props {
  filters: HistoryFilter; // ✅ draft filter
  onChange: (next: HistoryFilter) => void; // ✅ setDraft
  devices: Device[];
}

export default function HistoryFilterForm({
  filters,
  onChange,
  devices,
}: Props) {
  /* -------------------------------
   * 예약 상태 옵션
   * ------------------------------- */
  const statusOptions: { label: string; value: ReservationStatus }[] = [
    { label: "예약됨", value: "RESERVED" },
    { label: "사용 완료", value: "COMPLETED" },
  ];

  /* -------------------------------
   * 로컬 상태 (아이디/닉네임 debounce)
   * ------------------------------- */
  const [localUser, setLocalUser] = useState(filters.user ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ ...filters, user: localUser || null });
    }, 300);

    return () => clearTimeout(t);
  }, [localUser]);

  /* -------------------------------
   * OS 체크 상태
   * ------------------------------- */
  const isIOS = filters.os.includes("iOS");
  const isAndroid = filters.os.includes("Android");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* 아이디 / 닉네임 */}
      <Typography fontWeight={600}>아이디 / 닉네임</Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="아이디 / 닉네임을 입력해주세요."
        value={localUser}
        onChange={(e) => setLocalUser(e.target.value)}
      />

      {/* OS */}
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

      {/* 디바이스 */}

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

      {/* 예약 날짜 (기간) */}
      <Typography fontWeight={600}>예약 날짜</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <DatePicker
          label="시작일"
          value={filters.startDate}
          onChange={(v) => onChange({ ...filters, startDate: v })}
          slotProps={{ textField: { size: "small", fullWidth: true } }}
        />
        <DatePicker
          label="종료일"
          value={filters.endDate}
          onChange={(v) => onChange({ ...filters, endDate: v })}
          slotProps={{ textField: { size: "small", fullWidth: true } }}
        />
      </Box>

      {/* 예약 상태 */}
      <Typography fontWeight={600}>예약 상태</Typography>
      <FormControl fullWidth size="small">
        <InputLabel>예약 상태</InputLabel>
        <Select
          label="예약 상태"
          value={filters.status ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              status: (e.target.value || null) as ReservationStatus,
            })
          }
        >
          <MenuItem value="">전체</MenuItem>
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
