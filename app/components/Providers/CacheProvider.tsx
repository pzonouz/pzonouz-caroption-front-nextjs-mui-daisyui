"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import React from "react";
import rtlPlugin from "@mui/stylis-plugin-rtl";

export const CacheProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider
      options={{
        enableCssLayer: true,
        key: "muirtl",
        stylisPlugins: [rtlPlugin],
      }}
    >
      {children}
    </AppRouterCacheProvider>
  );
};
