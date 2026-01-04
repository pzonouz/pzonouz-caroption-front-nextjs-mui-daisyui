"use client";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Link from "next/link";

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar>
      <Toolbar>
        <IconButton sx={{ color: "white" }} onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/admin">خانه</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/admin/categories">ورود</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
