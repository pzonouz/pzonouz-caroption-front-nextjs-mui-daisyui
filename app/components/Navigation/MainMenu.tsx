"use client";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsApp from "@mui/icons-material/WhatsApp";
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
    <>
      <AppBar color="default">
        <Toolbar className="flex flex-row items-center justify-between">
          <Box className="flex items-center gap-2">
            <InstagramIcon color="error" />
            <TelegramIcon color="primary" />
            <WhatsApp color="success" />
          </Box>
          <Link href="/" className="hidden sm:block">
            کارآپشن
          </Link>
          <Box>
            <Link href="tel:09196631457" className="text-blue-700">
              09146631457
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar color="default" className="top-14">
        <Toolbar>
          <Box className="hidden sm:flex items-center justify-between w-2/3 mx-auto">
            <Link href="/">
              <Box>خانه</Box>
            </Link>
            <Link href="/prodcuts">
              <Box>محصولات</Box>
            </Link>
            <Link href="/services">
              <Box>خدمات</Box>
            </Link>
            <Link href="/aboutus">
              <Box>درباره ما</Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar className="sm:hidden top-14" color="default">
        <Toolbar className="relative">
          <IconButton
            className="absolute"
            sx={{ color: "black" }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
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
              <Link href="/">خانه</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/auth/signin">ورود</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Link className="w-10 mx-auto" href="/">
            کارآپشن
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MainMenu;
