import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "@libs/dayjs";
import type { HistoryRow } from "@/types/history";

interface Props {
  rows: HistoryRow[];
}

export default function HistoryTable({ rows }: Props) {
  return (
    <Table size="small">
      <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox size="small" />
          </TableCell>
          <TableCell>예약 번호</TableCell>
          <TableCell>아이디 / 닉네임</TableCell>
          <TableCell>OS / 디바이스</TableCell>
          <TableCell>예약 일시</TableCell>
          <TableCell>예약 목적</TableCell>
          <TableCell>예약 상태</TableCell>
          <TableCell>사용 시간</TableCell>
          <TableCell>메모</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id} hover>
            <TableCell padding="checkbox">
              <Checkbox size="small" />
            </TableCell>

            <TableCell>{r.id}</TableCell>
            <TableCell>{r.user}</TableCell>

            <TableCell>
              {r.device
                ? `${r.device.device_os} / ${r.device.device_name}`
                : "-"}
            </TableCell>

            <TableCell>
              {dayjs(r.start_time).format("YYYY-MM-DD HH:mm")} ~{" "}
              {dayjs(r.end_time).format("HH:mm")}
            </TableCell>

            <TableCell>
              <Tooltip title={r.purpose}>
                <Typography noWrap sx={{ maxWidth: 180, cursor: "help" }}>
                  {r.purpose}
                </Typography>
              </Tooltip>
            </TableCell>

            <TableCell>
              {r.status === "COMPLETED"
                ? "사용 완료"
                : r.status === "CANCELED"
                  ? "어드민 취소"
                  : "사용 예정"}
            </TableCell>

            <TableCell>
              {dayjs(r.end_time).diff(dayjs(r.start_time), "minute")}분
            </TableCell>

            <TableCell>-</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
