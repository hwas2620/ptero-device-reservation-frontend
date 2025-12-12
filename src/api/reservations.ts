import { api } from "@/libs/api";
import dayjs from "@/libs/dayjs";
import type { Reservation } from "@/types/reservation";
import type { Device } from "@/types/device";
import type { TimelineFilter, HistoryFilter } from "@/types/reservationFilters";

export type CreateReservationPayload = {
  device_key: string;
  start_time: string; // ISO
  end_time: string; // ISO
  purpose: string;
  user: string; // userId or username
  status: Reservation["status"]; // "RESERVED"
};

export async function fetchTimelineReservations(
  date: string,
  filters: TimelineFilter,
  devices: Device[],
) {
  const reservations = (await api.get("/reservations")).data as Reservation[];

  const deviceMap = new Map(devices.map((d) => [d.device_key, d]));

  return reservations.filter((r) => {
    const sameDate = r.start_time.startsWith(date);
    if (!sameDate) return false;

    const device = deviceMap.get(r.device_key);
    if (!device) return false;

    if (filters.os.length > 0 && !filters.os.includes(device.device_os)) {
      return false;
    }

    if (filters.device && r.device_key !== filters.device) return false;
    if (filters.user && r.user !== filters.user) return false;

    return true;
  });
}

export async function createReservation(payload: CreateReservationPayload) {
  const { data } = await api.post("/reservations", payload);
  return data;
}

export async function updateReservation(
  id: number,
  partial: Partial<Reservation>,
) {
  return (await api.patch(`/reservations/${id}`, partial)).data;
}

export async function deleteReservation(id: number) {
  return (await api.delete(`/reservations/${id}`)).data;
}

export async function fetchHistoryReservations(
  filters: HistoryFilter,
  devices: Device[],
) {
  const reservations = (await api.get("/reservations")).data as Reservation[];

  return reservations
    .filter((r) => {
      if (filters.device && r.device_key !== filters.device) return false;
      if (filters.user && !r.user.includes(filters.user)) return false;
      if (filters.status && r.status !== filters.status) return false;

      if (filters.startDate) {
        if (dayjs(r.start_time).isBefore(filters.startDate.startOf("day")))
          return false;
      }

      if (filters.endDate) {
        if (dayjs(r.start_time).isAfter(filters.endDate.endOf("day")))
          return false;
      }

      return true;
    })
    .map((r) => {
      const device = devices.find((d) => d.device_key === r.device_key);

      return {
        ...r,
        device, // ✅ 여기서 join
      };
    });
}
