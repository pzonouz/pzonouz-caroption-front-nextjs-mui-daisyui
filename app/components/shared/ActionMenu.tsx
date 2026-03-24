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
import Link from "next/link";

const ActionMenu = ({
  id,
  hasView = false,
  entity,
}: {
  id: string | null | undefined;
  hasView?: boolean;
  entity?: string;
}) => {
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
            dispatch(setModalId(id || ""));
            dispatch(setModalType("Edit"));
            setAnchorEl(null);
          }}
        >
          ویرایش
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setModalOpen(true));
            dispatch(setModalId(id || ""));
            dispatch(setModalType("Delete"));
            setAnchorEl(null);
          }}
        >
          حذف
        </MenuItem>
        {hasView && (
          <MenuItem
            onClick={() => {
              const width = 800;
              const height = 600;

              const left = window.screen.width / 2 - width / 2;
              const top = window.screen.height / 2 - height / 2;

              window.open(
                `${process.env.NEXT_PUBLIC_BASE_URL}nolayout/${entity}/${id}`,
                "اشخاص",
                `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
              );
            }}
          >
            مشاهده
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
export { ActionMenu };
