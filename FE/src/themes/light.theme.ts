import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#808080",
    },
    secondary: {
      main: "#FFFFFF",
      dark: "#8080802e",
    },
    background: {
      default: "#FFFFFF",
    },
  },
});
