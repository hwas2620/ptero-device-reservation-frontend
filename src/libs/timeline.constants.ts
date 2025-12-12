export const CELL_WIDTH = 50;
export const CELL_HEIGHT = 50;
export const TIMELINE_START = 7;
export const TIMELINE_END = 22;
export const TIMELINE_STEP = 30;
export const RESERVATION_BLOCK = {
  COLORS: {
    RESERVED: "#FAFAFA", // 예약됨
    IN_USE: "#FAFAFA", // 사용 중
    COMPLETED: "#0000001A", // 사용 완료 / 타팀 예약
    ABLE: "#FFCB02", // 예약 가능
    MINE: "#7F87D5", // 내 예약
  },

  BORDERS: {
    RESERVED: "2px solid #337AB7",
    IN_USE: "2px solid #337AB7",
    COMPLETED: "2px solid #00000010",
    ABLE: "2px solid #0000001A",
    MINE: "2px solid #0000001A",
  },

  TEXT_COLORS: {
    DARK: "#000000", // 검은색 (주로 배경색이 밝을 때 사용)
    LIGHT: "#FFFFFF", // 흰색 (주로 배경색이 어두울 때 사용)
  },
};
