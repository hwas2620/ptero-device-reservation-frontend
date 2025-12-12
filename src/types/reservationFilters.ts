import { Dayjs } from "dayjs";
import type { ReservationStatus } from "@/types/reservation";

export type FilterObject = Record<string, any>;

export type DeviceOS = "Android" | "iOS";
export interface BaseReservationFilter extends FilterObject {
  os: DeviceOS[];
  device: string | null;
  user: string | null;
}

export interface TimelineFilter extends BaseReservationFilter {}

export interface HistoryFilter extends BaseReservationFilter {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  status: ReservationStatus | null;
}

export const defaultTimelineFilter: TimelineFilter = {
  os: [], // 👈 핵심
  device: null,
  user: null,
};

export const defaultHistoryFilter: HistoryFilter = {
  os: [],
  device: null,
  user: null,
  startDate: null,
  endDate: null,
  status: null,
};
