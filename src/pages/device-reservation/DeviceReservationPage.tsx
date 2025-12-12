import DeviceReservationLayout from "@layouts/reservation/DeviceReservationLayout";
import ReservationTimeline from "@/components/reservation/timeline/ReservationTimeline";

export default function DeviceReservationPage() {
  return (
    <DeviceReservationLayout>
      <ReservationTimeline />
    </DeviceReservationLayout>
  );
}
