export type ReservationStatus =
  | "RESERVED" // 예약됨 (미래)
  | "COMPLETED" // 사용 완료 / 타팀 예약
  | "CANCELED"; // 취소됨

export interface Reservation {
  id: number;
  device_key: string;
  user: string;
  start_time: string; // ISO
  end_time: string; // ISO
  purpose: string;
  status: ReservationStatus;
}
