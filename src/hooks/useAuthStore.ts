import { create } from "zustand";

interface AuthState {
  userId: string | undefined; // userId 타입 지정
  setUserId: (id: string | undefined) => void; // setUserId 함수의 타입 지정
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: undefined as string | undefined, // ① 유저 ID 저장 공간

  // ② ID를 넣는 함수 (메인에서 사용)
  setUserId: (id: string | undefined) => set({ userId: id }),
}));
