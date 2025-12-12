import type { Reservation } from "./reservation";

export interface ReservationBlockModel {
  reservationId: number;
  deviceId: string;

  startSlotIndex: number; // 시작 slot index
  slotLength: number; // 몇 칸 차지하는지

  status: Reservation["status"];
  isMine: boolean;

  userLabel: string;
  startLabel: string;
  endLabel: string;
}
