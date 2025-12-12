import { Box } from "@mui/material";
import ReservationTimelineRow from "./ReservationTimelineRow";
import type { Device } from "@/types/device";
import type { Reservation } from "@/types/reservation";
import type { TimeSlot } from "@/types/timeSlot";
import type { ReservationCreateContext } from "@/types/reservationCreateContext";

interface Props {
  devices: Device[];
  reservations: Reservation[];
  timeSlots: TimeSlot[];
  onCreateRequest: (context: ReservationCreateContext) => void;
  onReservationClick: (reservationId: number) => void;
}

export default function ReservationTimelineRows({
  devices,
  reservations,
  timeSlots,
  onCreateRequest,
  onReservationClick,
}: Props) {
  return (
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      {devices.map((device) => (
        <ReservationTimelineRow
          key={device.device_key}
          device={device}
          reservations={reservations.filter(
            (r) => r.device_key === device.device_key,
          )}
          timeSlots={timeSlots}
          onCreateRequest={onCreateRequest}
          onReservationClick={onReservationClick}
        />
      ))}
    </Box>
  );
}
