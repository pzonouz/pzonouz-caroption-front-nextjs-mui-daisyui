"use client";
import { createTheme } from "@mui/material/styles";
import { IranSansXFont } from "./fonts";
const theme = createTheme({
  typography: {
    fontFamily: IranSansXFont.style.fontFamily,
  },
  direction: "rtl",
});

export default theme;
