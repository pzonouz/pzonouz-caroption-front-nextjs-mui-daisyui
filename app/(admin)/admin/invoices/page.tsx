"use client";

import { DataTable } from "@/app/components/Data/DataTable";
import { CreateProduct } from "@/app/components/Products/CreateProduct";
import { Deleteproduct } from "@/app/components/Products/DeleteProduct";
import { EditProduct } from "@/app/components/Products/EditProduct";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetProductsQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const page = () => {
  const { data: products, isFetching } = useGetProductsQuery();
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: GridColDef<(typeof products)[]>[] = [
    {
      field: "name",
      headerName: "نام طرف حساب",
      width: 300,
    },
    {
      field: "categoryName",
      headerName: "دسته بندی",
      width: 300,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 150,
      editable: false,
      sortable: false,
      renderCell: (params) => (
        // @ts-ignore
        <ActionMenu entity={`/products`} id={params.row?.id} />
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
            اضافه کردن کالا
          </Typography>
          <CreateProduct />
          {/* Prevent Load Edit product widthout Id */}
          {id && <EditProduct />}
          <Deleteproduct />
        </Box>
      </Collapsible>
      <DataTable rows={products ?? []} columns={columns} loading={isFetching} />
    </div>
  );
};
export default page;
