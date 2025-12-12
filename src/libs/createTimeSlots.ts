import dayjs from "@libs/dayjs";
import type { TimeSlot } from "@/types/timeSlot";

export function createTimeSlots(
  date: Date,
  startHour = 7,
  endHour = 22,
  intervalMinutes = 30,
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  let cursor = dayjs(date).hour(startHour).minute(0).second(0);
  const end = dayjs(date).hour(endHour).minute(0).second(0);

  let index = 0;

  while (cursor.isBefore(end)) {
    const next = cursor.add(intervalMinutes, "minute");

    slots.push({
      index,
      start: cursor.valueOf(),
      end: next.valueOf(),
      label: cursor.format("HH:mm"),
    });

    cursor = next;
    index++;
  }

  return slots;
}
