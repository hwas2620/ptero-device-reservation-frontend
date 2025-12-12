import { useQuery } from "@tanstack/react-query";
import { fetchHistoryReservations } from "@/api/reservations";
import type { HistoryFilter } from "@/types/reservationFilters";
import type { Device } from "@/types/device";

export function useHistoryReservations(
  filters: HistoryFilter,
  devices: Device[],
) {
  return useQuery({
    queryKey: ["reservations", "history", filters],
    queryFn: () => fetchHistoryReservations(filters, devices),
    enabled: devices.length > 0, // ✅ 중요
  });
}
