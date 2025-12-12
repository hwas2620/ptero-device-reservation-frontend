import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Logo from "@/assets/images/apptestai_logo.svg";

import GroupIcon from "@mui/icons-material/GroupOutlined";
import DropdownIcon from "@mui/icons-material/UnfoldMoreOutlined";
import TooltipIcon from "@mui/icons-material/HelpOutlineRounded";
import UserIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ height: 40, display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="logo"
            style={{ height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                color: "text.primary",
                textTransform: "none",
                width: 240,
                minHeight: 40,
                gap: 1,
              }}
            >
              <GroupIcon />
              <Typography variant="body1" fontWeight={"bold"}>
                Han JM’s Team
              </Typography>
              <DropdownIcon sx={{ marginLeft: "auto" }} />
            </Button>
            <IconButton size="medium" sx={{ ml: 1 }}>
              <TooltipIcon fontSize="medium" />
            </IconButton>

            <IconButton size="medium">
              <UserIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
