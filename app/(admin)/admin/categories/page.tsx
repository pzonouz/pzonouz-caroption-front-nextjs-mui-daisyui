"use client";

import { CreateCategory } from "@/app/components/Category/CreateCategory";
import { DeleteCategory } from "@/app/components/Category/DeleteCategory";
import { EditCategory } from "@/app/components/Category/EditCategory";
import { DataTable } from "@/app/components/Data/DataTable";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetCategoriesQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const page = () => {
  const { data: categories, isFetching } = useGetCategoriesQuery();
  const id = useAppSelector((state) => state?.modal?.id);

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
        // @ts-ignore
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
            اضافه کردن دسته بندی
          </Typography>
          <CreateCategory />
          {id && <EditCategory />}
          <DeleteCategory />
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
