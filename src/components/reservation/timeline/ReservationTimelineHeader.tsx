import { Box, Typography } from "@mui/material";
import { CELL_HEIGHT, CELL_WIDTH } from "@libs/timeline.constants";
import type { TimeSlot } from "@/types/timeSlot";

interface Props {
  timeSlots: TimeSlot[];
}

export default function ReservationTimelineHeader({ timeSlots }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        bgcolor: "#E9ECEF",
        borderBottom: "2px solid #FAFAFA",
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          height: CELL_HEIGHT,
          width: CELL_WIDTH * 3,
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "2px solid #0000001A",
          borderBottom: "2px solid #0000001A",
          "& *": {
            fontSize: 10,
            fontWeight: 600,
          },
        }}
      >
        <Typography>디바이스</Typography>
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          height: CELL_HEIGHT,
          display: "flex",
          flexDirection: "row",
          borderBottom: "2px solid #0000001A",
        }}
      >
        {timeSlots.map((slot, _) => {
          const isHour = slot.label.endsWith("00");
          if (!isHour) return null;

          return (
            <Box
              key={`top-${slot.index}`}
              sx={{
                boxSizing: "border-box",
                height: CELL_HEIGHT,
                width: CELL_WIDTH * 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                "& *": {
                  fontSize: 10,
                  fontWeight: 600,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "&:not(:last-child)": {
                  borderRight: "1px solid #0000001A",
                },
              }}
            >
              <Box
                sx={{
                  boxSizing: "border-box",
                  height: CELL_HEIGHT,
                  width: CELL_WIDTH * 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid #0000001A",
                }}
              >
                <Typography variant="caption">{slot.label}</Typography>
              </Box>
              <Box
                sx={{
                  boxSizing: "border-box",
                  height: CELL_HEIGHT,
                  width: CELL_WIDTH * 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    boxSizing: "border-box",
                    height: CELL_HEIGHT / 2,
                    width: CELL_WIDTH,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    borderRight: "1px solid #0000001A",
                  }}
                >
                  <Typography variant="caption">0</Typography>
                </Box>

                <Box
                  sx={{
                    boxSizing: "border-box",
                    height: CELL_HEIGHT / 2,
                    width: CELL_WIDTH,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption">30</Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
