"use client";
import AdminMenu from "@/app/components/Navigation/AdminMenu";
import { AppBar, Toolbar } from "@mui/material";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppBar className="not-print">
        <Toolbar>
          <AdminMenu />
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default layout;
