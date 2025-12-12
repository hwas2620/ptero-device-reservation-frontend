import { useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";

export function useReservation(id: number | null) {
  return useQuery({
    enabled: !!id,
    queryKey: ["reservation", id],
    queryFn: async () => (await api.get(`/reservations/${id}`)).data,
  });
}
