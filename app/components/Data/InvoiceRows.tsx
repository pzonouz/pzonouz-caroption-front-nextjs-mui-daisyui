import { Box } from "@mui/material";
import { useAppSelector } from "@/app/lib/hooks";
import { ExistingInvoiceRow } from "./ExistingInvoiceRow";
import { NewInvoiceRow } from "./NewInvoiceRow";
import { getInvoiceTotal } from "@/app/utils";
export const InvoiceRows = () => {
  const invoiceRows = useAppSelector((state) => state?.invoice?.existingRows);
  return (
    <Box>
      <Box>
        <Box className="flex flex-col gap-2">
          {invoiceRows?.map((item) => (
            <ExistingInvoiceRow
              key={`${item?.productId}-${item?.price}-${item?.count}`}
              row={item}
            />
          ))}
          <NewInvoiceRow />
        </Box>
        <Box className="flex justify-end">
          <Box className="flex flex-row gap-2">
            <Box>جمع کل با تخفیف:</Box>
            <Box>{getInvoiceTotal(invoiceRows)}</Box>
            <Box>تومان</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
