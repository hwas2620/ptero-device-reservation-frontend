import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";

import DeviceReservationPage from "@/pages/device-reservation/DeviceReservationPage";
import DeviceReservationHistoryPage from "@/pages/device-reservation/DeviceReservationHistoryPage";

const Placeholder = ({ text }: { text: string }) => <div>{text}</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      { path: "dashboard", element: <Placeholder text="대시보드" /> },
      { path: "mobile-app", element: <Placeholder text="모바일 앱" /> },
      { path: "d2d-mobile-app", element: <Placeholder text="D2D 모바일 앱" /> },
      { path: "desktop", element: <Placeholder text="데스크탑" /> },
      { path: "device-reservation", element: <DeviceReservationPage /> },
      {
        path: "device-reservation/history",
        element: <DeviceReservationHistoryPage />,
      },
      {
        path: "scenarios-storage",
        element: <Placeholder text="시나리오 저장소" />,
      },
      { path: "team-settings", element: <Placeholder text="팀 설정" /> },
    ],
  },
]);
