import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Tabs, Tab } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export default function DeviceReservationLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.includes("history") ? 1 : 0;
  const handleTabChange = (_: any, v: number) => {
    if (v === 0) navigate("/device-reservation");
    else navigate("/device-reservation/history");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 1 }}>
        디바이스 예약
      </Typography>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ px: 1 }}>
        <Tab label="실시간 예약" />
        <Tab label="사용 내역" />
      </Tabs>

      <Box
        sx={{
          height: "100%",
          borderTop: "2px solid #E9ECEF",
          p: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
