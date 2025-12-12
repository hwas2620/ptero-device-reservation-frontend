import { Box } from "@mui/material";
import { useRef, useState } from "react";
import ReservationBlock from "./ReservationBlock";
import ReservationCreateButton from "./ReservationCreateButton";
import { CELL_WIDTH, CELL_HEIGHT } from "@libs/timeline.constants";
import type { TimeSlot } from "@/types/timeSlot";
import type { ReservationBlockModel } from "@/types/reservationBlockModel";
import type { ReservationCreateContext } from "@/types/reservationCreateContext";
import { hasConflictBySlots } from "@/components/reservation/conflict";
import dayjs from "@libs/dayjs";

interface Props {
  deviceKey: string;
  timeSlots: TimeSlot[];
  blocks: ReservationBlockModel[];
  onCreateRequest: (context: ReservationCreateContext) => void;
  onReservationClick: (reservationId: number) => void;
}

export default function ReservationTimelineField({
  deviceKey,
  timeSlots,
  blocks,
  onCreateRequest,
  onReservationClick,
}: Props) {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [hoverSlotIndex, setHoverSlotIndex] = useState<number | null>(null);

  const totalWidth = timeSlots.length * CELL_WIDTH;

  const isSlotBlocked = (slotIndex: number) =>
    blocks.some(
      (b) =>
        slotIndex > b.startSlotIndex &&
        slotIndex < b.startSlotIndex + b.slotLength,
    );
  const now = dayjs();

  const isPastSlot = (slotIndex: number) => {
    const slot = timeSlots[slotIndex];
    if (!slot) return true;

    return dayjs(slot.start).isBefore(now);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fieldRef.current) return;

    const rect = fieldRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const slotIndex = Math.floor(x / CELL_WIDTH);

    if (slotIndex < 0 || slotIndex >= timeSlots.length) {
      setHoverSlotIndex(null);
      return;
    }

    if (isSlotBlocked(slotIndex)) {
      setHoverSlotIndex(null);
      return;
    }
    if (isPastSlot(slotIndex)) {
      setHoverSlotIndex(null);
      return;
    }

    setHoverSlotIndex(slotIndex);
  };

  const handleMouseLeave = () => {
    setHoverSlotIndex(null);
  };

  const handleCreateAtSlot = (slotIndex: number) => {
    const conflict = hasConflictBySlots(blocks, slotIndex, 1);

    if (conflict) {
      return;
    }

    onCreateRequest({
      deviceKey,
      startSlotIndex: slotIndex,
    });
  };

  return (
    <Box
      ref={fieldRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        flexGrow: 1,
        minWidth: 0,
        overflowX: "auto",
      }}
    >
      <Box sx={{ position: "relative", width: totalWidth, height: "100%" }}>
        {/* 슬롯 배경 */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            flexDirection: "row",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {timeSlots.map((slot) => (
            <Box
              key={slot.index}
              sx={{
                boxSizing: "border-box",
                height: CELL_HEIGHT,
                width: CELL_WIDTH,
                borderRight:
                  slot.index % 2 === 0
                    ? "0px solid #0000001A"
                    : "1px solid #0000001A",
              }}
            />
          ))}
        </Box>

        {/* 예약 블록 */}
        {blocks.map((block) => (
          <ReservationBlock
            key={`${block.reservationId}-${block.startSlotIndex}`}
            block={block}
            onClick={onReservationClick}
          />
        ))}

        {/* hover 예약 버튼 */}
        {hoverSlotIndex !== null && (
          <Box
            sx={{
              position: "absolute",
              left: hoverSlotIndex * CELL_WIDTH,
              height: CELL_HEIGHT,
              width: CELL_WIDTH,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              zIndex: 2,
            }}
          >
            <ReservationCreateButton
              onClick={() => {
                if (hoverSlotIndex === null) return;
                handleCreateAtSlot(hoverSlotIndex);
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
