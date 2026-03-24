"use client";
import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { CreateInvoice } from "@/app/components/Invoice/CreateInvoice";
import { DeleteInvoice } from "@/app/components/Invoice/DeleteInvoice";
import { EditInvoice } from "@/app/components/Invoice/EditInvoice";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetInvoicesQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { invoiceType } from "@/app/schemas";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns-jalali/format";

const page = () => {
  const { data: invoices, isFetching } = useGetInvoicesQuery(
    "?filter=type&filter_operand==&filter_condition=SELL",
  );

  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "personName",
      headerName: "نام طرف حساب",
      width: 300,
      order: 1,
    },
    {
      field: "date",
      headerName: "تاریخ",
      width: 200,
      order: 2,
      renderCell: (row: invoiceType) => {
        const formattedDate = format(new Date(row?.date || ""), "yyyy/MM/dd");
        return <Typography>{formattedDate}</Typography>;
      },
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 150,
      renderCell: (row: invoiceType) => (
        <ActionMenu id={row?.id} hasView={true} entity="invoices" />
      ),
    },
  ];
  return (
    <div className="pt-12 px-4">
      <Collapsible>
        <Box className="grid place-items-center">
          <Typography
            sx={{ pb: "1rem", fontSize: "1.5rem", fontWeight: "600" }}
          >
            اضافه کردن فاکتور فروش
          </Typography>
          <CreateInvoice type="SELL" />
          {/* Prevent Load Edit product widthout Id */}
          {id && <EditInvoice />}
          <DeleteInvoice />
        </Box>
      </Collapsible>
      <Typography className="text-2xl font-bold text-center">
        فاکتور فروش
      </Typography>
      <SimpleDataGrid
        rows={invoices?.rows ?? []}
        columns={columns}
        isLoading={isFetching}
      />
    </div>
  );
};
export default page;
