import { api } from "@/libs/api";
import type { Device } from "@/types/device";

export async function fetchDevices(): Promise<Device[]> {
  const res = await api.get("/devices");
  return res.data;
}
