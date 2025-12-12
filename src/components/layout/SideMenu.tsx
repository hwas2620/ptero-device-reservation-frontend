import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Divider,
  Box,
  Typography,
  Button,
  Icon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/BarChart";
import MobileIcon from "@mui/icons-material/Smartphone";
import DesktopIcon from "@mui/icons-material/DesktopMacRounded";
import ReservationIcon from "@mui/icons-material/EventAvailableRounded";
import StorageIcon from "@mui/icons-material/StorageOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import MenuCollapseIcon from "@mui/icons-material/KeyboardTabOutlined";

const MENU_WIDTH = 200;
const TEAM_TEST_COUNT = 400;
const TEAM_TEST_TOTAL = 1000;

const menus = [
  { label: "대시보드", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "모바일 앱", path: "/mobile-app", icon: <MobileIcon /> },
  { label: "D2D 모바일 앱", path: "/d2d-mobile-app", icon: <MobileIcon /> },
  { label: "데스크탑", path: "/desktop", icon: <DesktopIcon /> },
  {
    label: "디바이스 예약",
    path: "/device-reservation",
    icon: <ReservationIcon />,
  },
  {
    label: "시나리오 저장소",
    path: "/scenarios-storage",
    icon: <StorageIcon />,
  },
  { label: "팀 설정", path: "/team-settings", icon: <SettingsIcon /> },
];

export default function SideMenu() {
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: MENU_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: MENU_WIDTH,
          boxSizing: "border-box",
          borderRight: "none",
          bgcolor: "grey.50",
          overflowY: "auto",
        },
        "& .MuiListItemButton-root": {
          mx: 1,
          borderRadius: 2,
          minHeight: 40,
          maxHeight: 40,
          "&.Mui-selected": {
            backgroundColor: "grey.300",
            "&:hover": {
              backgroundColor: "grey.400",
            },
          },
          "&:hover": {
            backgroundColor: "grey.200",
          },
        },
      }}
    >
      <Toolbar />
      <List sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.path}
            component={Link}
            to={menu.path}
            selected={pathname === menu.path}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        ))}
        <Box sx={{ flexGrow: 1 }} />
        <ListItemButton>
          <Box sx={{ minWidth: 40, display: "flex", justifyContent: "left" }}>
            <MenuCollapseIcon
              sx={{
                transform: "scaleX(-1)",
              }}
            />
          </Box>
          <Typography>메뉴 접기</Typography>
        </ListItemButton>
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.primary">
            현재 팀 테스트 수
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {TEAM_TEST_COUNT}/{TEAM_TEST_TOTAL}
          </Typography>
        </Box>
        {/* 프로그레스 바 (임시 구현) */}
        <Box
          sx={{
            width: "100%",
            height: 6,
            bgcolor: "grey.300",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${(TEAM_TEST_COUNT / TEAM_TEST_TOTAL) * 100}%`,
              height: "100%",
              bgcolor: "#ffbf00",
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
