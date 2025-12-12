import type { TimelineFilter, HistoryFilter } from "@/types/reservationFilters";

export const queryKeys = {
  devices: ["devices"] as const,

  timeline: (date: string, filters: TimelineFilter) =>
    [
      "reservations",
      "timeline",
      date,
      filters.os.join(","), // ⬅️ 핵심
      filters.device ?? "",
      filters.user ?? "",
    ] as const,

  history: (filters: HistoryFilter) =>
    [
      "reservations",
      "history",
      filters.os.join(","), // ⬅️ 동일 원칙
      filters.device ?? "",
      filters.user ?? "",
      filters.status ?? "",
      filters.startDate?.format("YYYY-MM-DD") ?? "",
      filters.endDate?.format("YYYY-MM-DD") ?? "",
    ] as const,
};
