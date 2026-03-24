"use client";
import { Box, Collapse, IconButton } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Collapsible = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ my: "1rem" }} className="print:hidden">
      <IconButton onClick={() => setOpen(!open)}>
        {open ? <RemoveIcon /> : <AddIcon />}
      </IconButton>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
};
export { Collapsible };
