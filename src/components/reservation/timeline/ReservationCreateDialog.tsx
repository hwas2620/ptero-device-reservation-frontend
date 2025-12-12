import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "@libs/dayjs";
import { TIMELINE_START, TIMELINE_END } from "@libs/timeline.constants";
import { useAuthStore } from "@hooks/useAuthStore";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { hasConflictByTime } from "@/components/reservation/conflict";
import type { Device } from "@/types/device";
import type { TimeSlot } from "@/types/timeSlot";
import type { ReservationCreateContext } from "@/types/reservationCreateContext";
import type { Reservation } from "@/types/reservation";
import { hasConflictBySlots } from "../conflict";

const schema = z
  .object({
    deviceKey: z.string().min(1, "디바이스를 선택해주세요."),
    date: z.string().min(1),
    startSlotIndex: z.number().int().min(0),
    endSlotIndex: z.number().int().min(1),
    purpose: z
      .string()
      .min(1, "예약 목적을 입력해주세요.")
      .max(200, "최대 200자"),
  })
  .refine((v) => v.endSlotIndex > v.startSlotIndex, {
    message: "종료 시간은 시작 시간보다 늦어야 합니다.",
    path: ["endSlotIndex"],
  })
  .refine((v) => v.endSlotIndex - v.startSlotIndex <= 4, {
    message: "최대 2시간(30분 단위 4칸)까지 예약 가능합니다.",
    path: ["endSlotIndex"],
  });

type FormValues = z.infer<typeof schema>;

function buildTimeOptions(timeSlots: TimeSlot[]) {
  return timeSlots.map((s) => ({
    index: s.index,
    label: s.label,
    start: s.start,
    end: s.end,
  }));
}

function clampEndIndex(startIdx: number, timeSlotsLen: number) {
  // startIdx 기준으로 최대 4칸(2시간), 그리고 배열 범위 내
  return Math.min(startIdx + 4, timeSlotsLen);
}

interface Props {
  open: boolean;
  selectedDate: dayjs.Dayjs;
  devices: Device[];
  timeSlots: TimeSlot[];
  reservations: Reservation[];
  context: ReservationCreateContext | null; // 타임라인에서 들어오면 {deviceKey, slotIndex}, 상단 버튼이면 null
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReservationCreateDialog({
  open,
  selectedDate,
  devices,
  timeSlots,
  reservations,
  context,
  onClose,
  onSuccess,
}: Props) {
  const userId = useAuthStore((s) => s.userId) ?? "zero"; // 프로젝트에 맞게 교체
  const { mutateAsync, isPending } = useCreateReservation();

  const timeOptions = buildTimeOptions(timeSlots);
  const dateString = selectedDate.format("YYYY-MM-DD");

  const defaultDeviceKey = context?.deviceKey ?? devices?.[0]?.device_key ?? "";
  const defaultStartIdx = context?.startSlotIndex ?? 0;
  const defaultEndIdx = clampEndIndex(defaultStartIdx, timeSlots.length);

  const { control, handleSubmit, watch, setValue, formState } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        deviceKey: defaultDeviceKey,
        date: dateString,
        startSlotIndex: defaultStartIdx,
        endSlotIndex: defaultEndIdx,
        purpose: "",
      },
    });

  // context가 바뀌면(타임라인에서 다른 칸 클릭) 자동 반영
  // open 상태에서만 반영하는 게 UX가 자연스러움
  const startSlotIndex = watch("startSlotIndex");

  // start 변경 시 end 자동 보정 (최대 2시간/범위 내)
  const handleStartChange = (nextStartIdx: number) => {
    setValue("startSlotIndex", nextStartIdx, { shouldValidate: true });
    const nextEnd = clampEndIndex(nextStartIdx, timeSlots.length);
    setValue(
      "endSlotIndex",
      Math.max(nextStartIdx + 1, Math.min(watch("endSlotIndex"), nextEnd)),
      {
        shouldValidate: true,
      },
    );
  };

  const [endConflict, setEndConflict] = useState(false);

  const handleEndChange = (nextEndSlotIndex: number) => {
    const startIdx = watch("startSlotIndex");
    const deviceKey = watch("deviceKey");

    const startSlot = timeSlots[startIdx];
    const endSlot = timeSlots[nextEndSlotIndex - 1]; // exclusive

    if (!startSlot || !endSlot) return;

    /** 1️⃣ start / end time 계산 (dayjs.ts 사용) */
    const startTime = dayjs(selectedDate)
      .hour(dayjs(startSlot.start).hour())
      .minute(dayjs(startSlot.start).minute())
      .second(0)
      .millisecond(0);

    const endTime = dayjs(selectedDate)
      .hour(dayjs(endSlot.end).hour())
      .minute(dayjs(endSlot.end).minute())
      .second(0)
      .millisecond(0);

    /** 2️⃣ 충돌 검사 (시간 기준) */
    const conflict = hasConflictByTime(
      reservations,
      deviceKey,
      startTime.valueOf(),
      endTime.valueOf(),
    );

    /** 3️⃣ UI 반응 */
    if (conflict) {
      setEndConflict(true);
      return;
    }

    setEndConflict(false);

    /** 4️⃣ 문제 없으면 반영 */
    setValue("endSlotIndex", nextEndSlotIndex, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (v: FormValues) => {
    const startSlot = timeSlots[v.startSlotIndex];
    const endSlot = timeSlots[v.endSlotIndex - 1]; // exclusive

    if (!startSlot || !endSlot) return;

    const startTime = dayjs(selectedDate)
      .hour(dayjs(startSlot.start).hour())
      .minute(dayjs(startSlot.start).minute())
      .second(0)
      .millisecond(0);

    const endTime = dayjs(selectedDate)
      .hour(dayjs(endSlot.end).hour())
      .minute(dayjs(endSlot.end).minute())
      .second(0)
      .millisecond(0);

    const startMs = startTime.valueOf();
    const endMs = endTime.valueOf();

    /** 🔴 최종 충돌 검사 (이게 핵심) */
    const conflict = hasConflictByTime(
      reservations, // 반드시 원본 Reservation[]
      v.deviceKey,
      startMs,
      endMs,
    );

    if (conflict) {
      alert("예약에 실패하였습니다.");
      return;
    }

    await mutateAsync({
      device_key: v.deviceKey,
      start_time: startTime.format("YYYY-MM-DDTHH:mm:ss"),
      end_time: endTime.format("YYYY-MM-DDTHH:mm:ss"),
      purpose: v.purpose,
      user: userId,
      status: "RESERVED",
    });

    onSuccess();
  };

  useEffect(() => {
    if (!open) return;
    if (!context) return;

    if (context.deviceKey) {
      setValue("deviceKey", context.deviceKey);
    }

    if (context.startSlotIndex !== undefined) {
      const startIdx = context.startSlotIndex;
      const endIdx = clampEndIndex(startIdx, timeSlots.length);

      setValue("startSlotIndex", startIdx, { shouldValidate: true });
      setValue("endSlotIndex", Math.min(startIdx + 1, endIdx), {
        shouldValidate: true,
      });
    }
  }, [open, context, setValue, timeSlots.length]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>디바이스 예약</DialogTitle>
      <DialogContent dividers sx={{ pt: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* OS/디바이스 */}
          <Controller
            name="deviceKey"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="device-select-label">OS / 디바이스</InputLabel>
                <Select
                  {...field}
                  labelId="device-select-label"
                  label="OS / 디바이스"
                >
                  {devices.map((d) => (
                    <MenuItem key={d.device_key} value={d.device_key}>
                      {`${d.device_os} ${d.device_version} / ${d.device_name}`}
                    </MenuItem>
                  ))}
                </Select>
                {formState.errors.deviceKey?.message && (
                  <Typography
                    variant="caption"
                    sx={{ color: "error.main", mt: 0.5 }}
                  >
                    {formState.errors.deviceKey.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          {/* 예약 날짜 */}
          <TextField
            label="예약 날짜"
            value={selectedDate.format("YYYY년 M월 D일(ddd)")}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          {/* 예약 시간 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="startSlotIndex"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="start-time-label">시작</InputLabel>
                  <Select
                    labelId="start-time-label"
                    label="시작"
                    value={field.value}
                    onChange={(e) => handleStartChange(Number(e.target.value))}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 36 * 4 + 8,
                          overflowY: "auto",
                          "& .MuiMenuItem-root": {
                            minHeight: 36,
                          },
                        },
                      },
                    }}
                  >
                    {timeOptions.map((t) => (
                      <MenuItem key={t.index} value={t.index}>
                        {t.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="endSlotIndex"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={endConflict || !!formState.errors.endSlotIndex}
                >
                  <InputLabel id="end-time-label">종료</InputLabel>
                  <Select
                    labelId="end-time-label"
                    label="종료"
                    value={field.value}
                    onChange={(e) => handleEndChange(Number(e.target.value))}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 36 * 4 + 8,
                          overflowY: "auto",
                          "& .MuiMenuItem-root": {
                            minHeight: 36,
                          },
                        },
                      },
                    }}
                  >
                    {/* endSlotIndex는 exclusive: (start+1) ~ timeSlots.length */}
                    {Array.from(
                      { length: timeSlots.length - (startSlotIndex + 1) + 1 },
                      (_, i) => startSlotIndex + 1 + i,
                    ).map((endExclusive) => {
                      const endLabel = timeSlots[endExclusive - 1]?.end
                        ? dayjs(timeSlots[endExclusive - 1].end).format("HH:mm")
                        : "";
                      return (
                        <MenuItem key={endExclusive} value={endExclusive}>
                          {endLabel}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            예약 가능 시간 {TIMELINE_START}시~{TIMELINE_END}시이며, 30분 단위로
            최대 2시간까지 입니다.
            <br />
            예약된 종료 시간 5분전 자동 연결 해제됩니다.
          </Typography>

          {/* 예약 목적 */}
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="예약 목적"
                multiline
                minRows={4}
                fullWidth
                error={!!formState.errors.purpose}
                helperText={formState.errors.purpose?.message ?? ""}
              />
            )}
          />

          {/* 버튼 */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}
          >
            <Button variant="outlined" onClick={onClose} disabled={isPending}>
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{
                bgcolor: "#FFC107",
                color: "#000",
                "&:hover": { bgcolor: "#FFB300" },
              }}
            >
              예약하기
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
