import { invoiceItemType } from "@/app/schemas";
import { InvoiceRow } from "./InvoiceRow";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "@/app/lib/hooks";
import { deleteRow } from "@/app/lib/features/invoices";

export const ExistingInvoiceRow = ({ row }: { row: invoiceItemType }) => {
  const dispatch = useAppDispatch();
  const deleteRowL = (id: string) => {
    dispatch(deleteRow(id));
  };
  return (
    <Box className="flex gap-2">
      <InvoiceRow row={row} type="EDIT" />
      <IconButton
        color="error"
        onClick={() => {
          deleteRowL(row?.productId || "");
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
