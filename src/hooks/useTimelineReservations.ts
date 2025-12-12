import { useQuery } from "@tanstack/react-query";
import { fetchTimelineReservations } from "@/api/reservations";
import { queryKeys } from "@/libs/queryKeys";
import type { TimelineFilter } from "@/types/reservationFilters";
import type { Device } from "@/types/device";

export function useTimelineReservations(
  date: string,
  filters: TimelineFilter,
  devices: Device[],
) {
  return useQuery({
    queryKey: queryKeys.timeline(date, filters),
    queryFn: () => fetchTimelineReservations(date, filters, devices),
  });
}
