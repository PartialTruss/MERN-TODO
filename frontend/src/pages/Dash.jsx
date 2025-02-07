import {
  ArchiveOutlined,
  BarChartOutlined,
  FormatQuoteOutlined,
  HomeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [username, setUsername] = useState("");
  const isRTL = i18n.language === "fa";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUsername(decodedToken.username);
    }
    document.documentElement.dir = isRTL ? "rtl" : "ltr"; // Change document direction
  }, [i18n.language]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const menuItems = [
    { text: t("Home"), icon: <HomeOutlined />, link: "/home" },
    { text: t("Archives"), icon: <ArchiveOutlined />, link: "/archives" },
    { text: t("Statistics"), icon: <BarChartOutlined />, link: "/statistics" },
    { text: t("Quotes"), icon: <FormatQuoteOutlined />, link: "/quotes" },

    { text: t("Settings"), icon: <SettingsOutlined />, link: "/settings" },
  ];

  const drawer = (
    <List
      sx={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {menuItems.map(({ text, icon, link }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            component={Link}
            to={link}
            sx={{
              flexDirection: isRTL ? "row-reverse" : "row",
              justifyContent: "space-between", // Ensures spacing between icon and text
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: isRTL ? "unset" : "10", // Removes extra padding
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ textAlign: isRTL ? "right" : "left" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex", direction: isRTL ? "rtl" : "ltr" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "inherit",
          boxShadow: "none",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: isRTL ? 0 : { sm: `${drawerWidth}px` }, // Adjust margin for RTL
          mr: isRTL ? { sm: `${drawerWidth}px` } : 0, // Mirror margin in RTL
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: isRTL ? "flex-end" : "space-between",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: isRTL ? 0 : 2,
              ml: isRTL ? 2 : 0,
              display: { sm: "none" },
              color: "#F4F1DE",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#C46A64",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#C46A64",
              paddingTop: "20px",
              right: isRTL ? 0 : "auto", // Move drawer to right in RTL
              left: isRTL ? "auto" : 0, // Default left in LTR
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#3D405B",
          paddingX: { sm: "10px", md: "120px" },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
