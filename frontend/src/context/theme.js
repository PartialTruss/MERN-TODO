import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#f5f5f5", // Light theme background for paper components
    },
    text: {
      primary: "#000000",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f5f5f5", // Light theme Drawer background
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e", // Dark theme background for paper components
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e", // Dark theme Drawer background
        },
      },
    },
  },
});
