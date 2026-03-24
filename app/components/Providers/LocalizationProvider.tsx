"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";

export const LocalizationProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
    {children}
  </LocalizationProvider>
);
