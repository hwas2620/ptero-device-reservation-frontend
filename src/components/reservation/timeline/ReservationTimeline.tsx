import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import dayjs from "@libs/dayjs";

import ReservationTimelineHeader from "./ReservationTimelineHeader";
import ReservationTimelineRows from "./ReservationTimelineRows";
import ReservationTimelineFooter from "./ReservationTimelineFooter";
import DateNavigator from "./DateNavigator";
import FilterBar from "@/components/reservation/filter/FilterBar";
import TimelineFilterForm from "@/components/reservation/filter/forms/TimelineFilterForm";
import type { TimelineFilter } from "@/types/reservationFilters";
import { defaultTimelineFilter } from "@/types/reservationFilters";
import type { TimeSlot } from "@/types/timeSlot";
import {
  TIMELINE_START,
  TIMELINE_END,
  CELL_HEIGHT,
  CELL_WIDTH,
} from "@libs/timeline.constants";
import { createTimeSlots } from "@/libs/createTimeSlots";
import { useDevices } from "@/hooks/useDevices";
import { useTimelineReservations } from "@/hooks/useTimelineReservations";
import ReservationCreateDialog from "./ReservationCreateDialog";
import ReservationSuccessDialog from "./ReservationSuccessDialog";
import type { ReservationCreateContext } from "@/types/reservationCreateContext";
import ReservationDetailDialog from "./ReservationDetailDialog";

export default function ReservationTimeline() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filters, setFilters] = useState<TimelineFilter>(defaultTimelineFilter);

  // ✅ 핵심: TimeSlot은 memoized + Date 기준
  const timeSlots: TimeSlot[] = useMemo(
    () => createTimeSlots(selectedDate.toDate(), TIMELINE_START, TIMELINE_END),
    [selectedDate],
  );
  const [createContext, setCreateContext] =
    useState<ReservationCreateContext | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);

  const handleCreateRequest = (context: ReservationCreateContext) => {
    setCreateContext(context);
    setCreateOpen(true);
  };

  const openCreateFromTopButton = () => {
    setCreateContext(null);
    setCreateOpen(true);
  };

  const handleReservationClick = (id: number) => {
    setSelectedReservationId(id);
  };

  const dateString = selectedDate.format("YYYY-MM-DD");

  const { data: devices = [] } = useDevices();
  const { data: reservations = [] } = useTimelineReservations(
    dateString,
    filters,
    devices,
  );

  const now = dayjs();
  const isToday = selectedDate.isSame(now, "day");
  const startX = CELL_HEIGHT * 3;

  const nowX = useMemo(() => {
    if (!isToday) return null;

    const nowMs = now.valueOf();

    const idx = timeSlots.findIndex((s) => nowMs >= s.start && nowMs < s.end);
    if (idx === -1) return null;

    const slot = timeSlots[idx];
    const ratio = (nowMs - slot.start) / (slot.end - slot.start);

    return (idx + ratio) * CELL_WIDTH;
  }, [isToday, timeSlots, now.valueOf()]);

  console.log(isToday, nowX);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80%",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", mb: 1 }}>
        <DateNavigator date={selectedDate} onChange={setSelectedDate} />
        <FilterBar
          filters={filters}
          onChange={setFilters}
          defaultFilter={defaultTimelineFilter}
        >
          {(draft, setDraft) => (
            <TimelineFilterForm
              filters={draft}
              onChange={setDraft}
              devices={devices}
            />
          )}
        </FilterBar>

        <Button
          variant="contained"
          onClick={openCreateFromTopButton}
          sx={{
            ml: "auto",
            bgcolor: "#FFC107",
            color: "#000",
            "&:hover": { bgcolor: "#FFB300" },
          }}
        >
          디바이스 예약
        </Button>
      </Box>

      <Box
        sx={{
          border: "1px solid #E9ECEF",
          backgroundColor: "#FAFAFA",
          borderRadius: 3,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <ReservationTimelineHeader timeSlots={timeSlots} />

        <Box sx={{ flex: 1, position: "relative", overflowY: "auto" }}>
          {isToday && nowX !== null && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: startX,
                width: nowX,
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.1)",
                pointerEvents: "none",
                zIndex: 9,
              }}
            />
          )}

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: startX + nowX!,
              backgroundColor: "#3B82F6",
              color: "#fff",
              fontSize: 12,
              px: 0.5,
              borderRadius: 1,
              zIndex: 3,
            }}
          >
            {now.format("HH:mm")}
          </Box>

          {isToday && nowX !== null && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: startX + nowX!,
                width: 2,
                height: "100%",
                backgroundColor: "#3B82F6",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          )}
          <ReservationTimelineRows
            devices={devices}
            reservations={reservations}
            timeSlots={timeSlots}
            onCreateRequest={handleCreateRequest}
            onReservationClick={handleReservationClick}
          />
        </Box>

        <ReservationTimelineFooter />
      </Box>
      <ReservationCreateDialog
        open={createOpen}
        selectedDate={selectedDate}
        devices={devices}
        timeSlots={timeSlots}
        reservations={reservations}
        context={createContext}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => {
          setCreateOpen(false);
          setSuccessOpen(true);
        }}
      />

      <ReservationSuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />

      <ReservationDetailDialog
        open={selectedReservationId !== null}
        reservationId={selectedReservationId}
        onClose={() => setSelectedReservationId(null)}
      />
    </Box>
  );
}
