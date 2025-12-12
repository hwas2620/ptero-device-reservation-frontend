export interface TimeSlot {
  index: number; // 0, 1, 2 ...
  start: number; // timestamp (ms)
  end: number; // timestamp (ms)
  label: string; // "07:00"
}
