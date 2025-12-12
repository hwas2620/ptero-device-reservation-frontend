import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReservation,
  type CreateReservationPayload,
} from "@/api/reservations";

export function useCreateReservation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReservationPayload) =>
      createReservation(payload),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}
