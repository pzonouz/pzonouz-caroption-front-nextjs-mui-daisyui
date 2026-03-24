import { Menu, MenuItem } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { useState } from "react";

// 1. Separate component for items that HAVE children.
// This ensures each dropdown has its own independent "anchor" state.
const NestedMenuItem = ({
  item,
  parentClose,
}: {
  item: any;
  parentClose: () => void;
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // Prevents clicks from bubbling up
    setAnchor(e.currentTarget);
  };

  const handleClose = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setAnchor(null);
  };

  return (
    <>
      <MenuItem
        onClick={handleOpen}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <ChevronLeft />
        <span>{item.label}</span>
      </MenuItem>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        slotProps={{
          paper: {
            sx: {
              direction: "rtl",
              textAlign: "right",
              minWidth: 180,
            },
          },
        }}
      >
        <RTLNestedMenu
          items={item.children}
          parentClose={() => {
            handleClose();
            parentClose?.();
          }}
        />
      </Menu>
    </>
  );
};

// 2. Main Menu Component
const RTLNestedMenu = ({
  items,
  parentClose,
}: {
  items: any[];
  parentClose: () => void;
}) => {
  return (
    <>
      {items.map((item: any) => {
        // Condition A: Item has children (Nested Menu)
        if (item.children && item.children.length > 0) {
          return (
            <NestedMenuItem
              key={item.label}
              item={item}
              parentClose={parentClose}
            />
          );
        }

        // Condition B: Item is a Link
        if (item.href) {
          return (
            <MenuItem
              key={item.label}
              onClick={() => parentClose?.()}
              sx={{ justifyContent: "flex-end", padding: 0 }} // Removed padding so Link covers the whole area
            >
              <Link
                className="w-full text-right"
                href={item.href}
                style={{ padding: "6px 16px", display: "block" }} // Ensure clickable area is large
              >
                {item.label}
              </Link>
            </MenuItem>
          );
        }

        // Condition C: Standard text item
        return (
          <MenuItem
            key={item.label}
            onClick={() => parentClose?.()}
            sx={{ justifyContent: "flex-end" }}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </>
  );
};

export default RTLNestedMenu;
