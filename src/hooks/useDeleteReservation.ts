import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";

export function useDeleteReservation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/reservations/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}
