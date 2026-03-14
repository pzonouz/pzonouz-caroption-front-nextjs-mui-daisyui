import { IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import RTLNestedMenu from "./RTLNestedMenu";

export const adminMenu = [
  { label: "خانه", href: "/admin" },
  { label: "دسته بندی", href: "/admin/categories" },
  { label: "کالاها", href: "/admin/products" },
  { label: "برندها", href: "/admin/brands" },
  {
    label: "پارامترها",
    children: [
      { label: "دسته بندی", href: "/admin/parameter-groups" },
      { label: "پارامترها", href: "/admin/parameters" },
    ],
  },
  // {
  //   label: "حسابداری",
  //   children: [
  //     { label: "کالاها", href: "/admin/productsforaccounts" },
  //     { label: "فاکتورها", href: "/admin/invoices" },
  //   ],
  // },
];
const AdminMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(e.currentTarget)
        }
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              direction: "rtl",
              width: "10rem",
            },
          },
        }}
      >
        <RTLNestedMenu
          items={adminMenu}
          parentClose={() => setAnchorEl(null)}
        />
      </Menu>
    </>
  );
};

export default AdminMenu;
