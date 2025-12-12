import { Box, Toolbar } from "@mui/material";
import Header from "@components/layout/Header";
import SideMenu from "@components/layout/SideMenu";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar */}
      <Header />

      {/* Content area below Header */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          height: "calc(100% - 64px)",
          overflow: "hidden",
        }}
      >
        {/* Permanent Drawer */}
        <SideMenu />

        {/* Main Content */}
        <Box component="main" sx={{ height: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
