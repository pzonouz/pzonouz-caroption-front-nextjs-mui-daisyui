import { Menu, MenuItem } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { useState } from "react";

const RTLNestedMenu = ({
  items,
  parentClose,
}: {
  items: any;
  parentClose: () => void;
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return items.map((item: any) =>
    item.children ? (
      <div
        key={item.label}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (!anchor) {
            setAnchor(e.currentTarget);
          }
        }}
      >
        <MenuItem
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <ChevronLeft />
          <span>{item.label}</span>
        </MenuItem>

        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
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
              setAnchor(null);
              parentClose?.();
            }}
          />
        </Menu>
      </div>
    ) : item.href ? (
      <MenuItem
        key={item.label}
        onClick={() => parentClose?.()}
        sx={{ justifyContent: "flex-end" }}
      >
        <Link className="w-full text-right" href={item.href}>
          {item.label}
        </Link>
      </MenuItem>
    ) : (
      <MenuItem
        key={item.label}
        onClick={() => parentClose?.()}
        sx={{ justifyContent: "flex-end" }}
      >
        {item.label}
      </MenuItem>
    ),
  );
};

export default RTLNestedMenu;
