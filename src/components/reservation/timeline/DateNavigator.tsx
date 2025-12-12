// src/components/reservation/DateNavigator.tsx

import { Box, Typography, IconButton } from "@mui/material";
import dayjs from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  date: dayjs.Dayjs;
  onChange: (d: dayjs.Dayjs) => void;
}

export default function DateNavigator({ date, onChange }: Props) {
  const today = dayjs();
  const maxDate = today.add(15, "day");

  const nextDay = () => {
    if (date.isBefore(maxDate, "day")) {
      onChange(date.add(1, "day"));
    }
  };

  const prevDay = () => {
    if (date.isAfter(today, "day") && !date.isSame(today, "day")) {
      onChange(date.subtract(1, "day"));
    }
  };

  const label = date.isSame(today, "day")
    ? "오늘"
    : date.isSame(today.add(1, "day"), "day")
      ? "내일"
      : "";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton onClick={prevDay} disabled={date.isSame(today, "day")}>
        <ChevronLeftIcon />
      </IconButton>

      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {date.format("YYYY-MM-DD (dd)")} {label && `· ${label}`}
      </Typography>

      <IconButton onClick={nextDay} disabled={date.isSame(maxDate, "day")}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
