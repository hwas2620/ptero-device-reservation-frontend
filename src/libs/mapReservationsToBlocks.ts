import dayjs from "@libs/dayjs";
import type { Reservation } from "@/types/reservation";
import type { TimeSlot } from "@/types/timeSlot";
import type { ReservationBlockModel } from "@/types/reservationBlockModel";

export function mapReservationsToBlocks(
  reservations: Reservation[],
  timeSlots: TimeSlot[],
  myUserId?: string,
): ReservationBlockModel[] {
  return reservations
    .map((res) => {
      const startMs = dayjs(res.start_time).valueOf();
      const endMs = dayjs(res.end_time).valueOf();

      const startSlotIndex = timeSlots.findIndex(
        (s) => s.start <= startMs && startMs < s.end,
      );

      const endSlotExclusive =
        timeSlots.findIndex((s) => s.start < endMs && endMs <= s.end) + 1;

      const slotLength = Math.max(endSlotExclusive - startSlotIndex, 1);

      if (startSlotIndex < 0 || endSlotExclusive <= startSlotIndex) {
        return null;
      }
      return {
        reservationId: res.id,
        deviceId: res.device_key,

        startSlotIndex,
        slotLength,

        status: res.status,
        isMine: myUserId ? res.user === myUserId : false,

        userLabel: res.user,
        startLabel: dayjs(res.start_time).format("HH:mm"),
        endLabel: dayjs(res.end_time).format("HH:mm"),
      };
    })
    .filter(Boolean) as ReservationBlockModel[];
}
