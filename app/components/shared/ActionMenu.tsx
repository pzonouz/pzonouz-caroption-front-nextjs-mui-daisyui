"use client";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppDispatch } from "@/app/lib/hooks";
import {
  setModalId,
  setModalOpen,
  setModalType,
} from "@/app/lib/features/modals";

const ActionMenu = ({ id }: { id: string | null | undefined }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <div className="w-full flex justify-center">
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        onClick={() => {}}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(setModalOpen(true));
            dispatch(setModalId(id));
            dispatch(setModalType("Edit"));
            setAnchorEl(null);
          }}
        >
          ویرایش
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setModalOpen(true));
            dispatch(setModalId(id));
            dispatch(setModalType("Delete"));
            setAnchorEl(null);
          }}
        >
          حذف
        </MenuItem>
      </Menu>
    </div>
  );
};
export { ActionMenu };
