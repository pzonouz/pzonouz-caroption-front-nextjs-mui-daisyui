import { Menu, MenuItem } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { useState } from "react";

const RTLNestedMenu = ({ items, parentClose }) => {
  const [anchor, setAnchor] = useState(null);

  return items.map((item) =>
    item.children ? (
      <div
        key={item.label}
        onMouseEnter={(e) => setAnchor(e.currentTarget)}
        onMouseLeave={() => setAnchor(null)}
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
          PaperProps={{
            sx: {
              direction: "rtl",
              textAlign: "right",
              minWidth: 180,
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
        <Link href={item.href}>{item.label}</Link>
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
