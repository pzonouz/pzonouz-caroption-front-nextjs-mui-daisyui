"use client";

import { DataTable } from "@/app/components/Data/DataTable";
import { CreateProduct } from "@/app/components/Products/CreateProduct";
import { Deleteproduct } from "@/app/components/Products/DeleteProduct";
import { EditProduct } from "@/app/components/Products/EditProduct";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetProductsQuery } from "@/app/lib/api";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const page = () => {
  const { data: categories, isFetching } = useGetProductsQuery();

  const columns: GridColDef<(typeof categories)[]>[] = [
    {
      field: "name",
      headerName: "نام دسته بندی",
      width: 200,
    },
    {
      field: "parentName",
      headerName: "والد",
      width: 100,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 150,
      editable: false,
      sortable: false,
      renderCell: (params) => (
        <ActionMenu entity={`/categories`} id={params.row?.id} />
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
          <EditProduct />
          <Deleteproduct />
        </Box>
      </Collapsible>
      <DataTable
        rows={categories ?? []}
        columns={columns}
        loading={isFetching}
      />
    </div>
  );
};
export default page;
