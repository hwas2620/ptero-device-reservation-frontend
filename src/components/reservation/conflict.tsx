import dayjs from "@libs/dayjs";
import type { Reservation } from "@/types/reservation";
import type { ReservationBlockModel } from "@/types/reservationBlockModel";

export function hasConflictBySlots(
  blocks: ReservationBlockModel[],
  startSlotIndex: number,
  slotLength: number,
) {
  if (slotLength > 4) return false;

  const end = startSlotIndex + slotLength;
  return blocks.some((b) => {
    const bStart = b.startSlotIndex;
    const bEnd = b.startSlotIndex + b.slotLength;
    return startSlotIndex < bEnd && end > bStart;
  });
}

export function hasConflictByTime(
  reservations: Reservation[],
  deviceKey: string,
  startMs: number,
  endMs: number,
) {
  return reservations.some((r) => {
    if (r.device_key !== deviceKey) return false;

    const start = dayjs(r.start_time);
    const end = dayjs(r.end_time);

    if (end.diff(start) > 120) {
      return false;
    }

    const rstartMs = start.valueOf();
    const rendMS = end.valueOf();

    return startMs < rendMS && endMs > rstartMs;
  });
}
