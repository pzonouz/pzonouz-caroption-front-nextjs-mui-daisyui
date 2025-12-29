"use client";
import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import AdminMenu from "../components/Navigation/AdminMenu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <AdminMenu />
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default layout;
