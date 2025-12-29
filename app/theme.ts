"use client";
import { createTheme } from "@mui/material/styles";
import { vazirFont } from "./fonts";

const theme = createTheme({
  typography: {
    fontFamily: vazirFont.style.fontFamily,
  },
  direction: "rtl",
});

export default theme;
