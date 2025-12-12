import type { Reservation } from "./reservation";
import type { Device } from "./device";

export interface HistoryRow extends Reservation {
  device?: Device;
}
