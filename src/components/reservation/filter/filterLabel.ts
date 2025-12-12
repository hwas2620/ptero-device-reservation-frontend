import type { BaseReservationFilter } from "@/types/reservationFilters";

export function getFilterLabels(filters: BaseReservationFilter) {
  const labels: { key: string; label: string }[] = [];

  // OS 필터: android, ios 체크 여부 처리
  const { os, device, user } = filters;

  if (os) {
    const selectedOS = [];
    if (filters.os.includes("Android")) selectedOS.push("Android");
    if (filters.os.includes("iOS")) selectedOS.push("iOS");

    // 둘 다 false면 chip 표시 안 함
    if (selectedOS.length > 0) {
      labels.push({
        key: "os",
        label: `OS : ${selectedOS.join(", ")}`,
      });
    }
  }

  if (device) {
    labels.push({
      key: "device",
      label: `디바이스 : ${device}`,
    });
  }

  if (user) {
    labels.push({
      key: "user",
      label: `아이디/닉네임 : ${user}`,
    });
  }

  return labels;
}
