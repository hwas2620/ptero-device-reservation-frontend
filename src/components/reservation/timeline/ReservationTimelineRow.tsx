import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import DeviceInfo from "./DeviceInfo";
import ReservationTimelineField from "./ReservationTimelineField";
import { mapReservationsToBlocks } from "@/libs/mapReservationsToBlocks";
import { useAuthStore } from "@hooks/useAuthStore";
import type { Device } from "@/types/device";
import type { Reservation } from "@/types/reservation";
import type { TimeSlot } from "@/types/timeSlot";
import type { ReservationCreateContext } from "@/types/reservationCreateContext";

interface Props {
  device: Device;
  reservations: Reservation[];
  timeSlots: TimeSlot[];
  onCreateRequest: (context: ReservationCreateContext) => void;
  onReservationClick: (reservationId: number) => void;
}

export default function ReservationTimelineRow({
  device,
  reservations,
  timeSlots,
  onCreateRequest,
  onReservationClick,
}: Props) {
  const userId = useAuthStore((state) => state.userId);
  const [hover, setHover] = useState(false);

  const blocks = useMemo(
    () => mapReservationsToBlocks(reservations, timeSlots, userId),
    [reservations, timeSlots, userId],
  );

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative", // 🔴 중요: hover 레이어 기준
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 🔵 row hover 수평 음영 */}
      {hover && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.04)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* 좌측 디바이스 정보 */}
      <DeviceInfo device={device} />

      {/* 타임라인 필드 */}
      <ReservationTimelineField
        deviceKey={device.device_key}
        timeSlots={timeSlots}
        blocks={blocks}
        onCreateRequest={onCreateRequest}
        onReservationClick={onReservationClick}
      />
    </Box>
  );
}
