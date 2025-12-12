import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "@/api/devices";
import { queryKeys } from "@/libs/queryKeys";

export function useDevices() {
  return useQuery({
    queryKey: queryKeys.devices,
    queryFn: fetchDevices,
  });
}
