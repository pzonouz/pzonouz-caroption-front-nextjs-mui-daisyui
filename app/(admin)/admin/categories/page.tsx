"use client";

import { CreateCategory } from "@/app/components/Category/CreateCategory";
import { DeleteCategory } from "@/app/components/Category/DeleteCategory";
import { EditCategory } from "@/app/components/Category/EditCategory";
import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { SortFilterPaginationComponent } from "@/app/components/Data/SortFilterPaginationComponent";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetCategoriesQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { categoryType } from "@/app/schemas";

const page = () => {
  const [query, setQuery] = useState<string>("");
  const { data: categories, isLoading } = useGetCategoriesQuery(query);
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "name",
      headerName: "نام دسته بندی",
      width: 200,
      order: 1,
    },
    {
      field: "parentName",
      headerName: "والد",
      width: 200,
      order: 2,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 50,
      order: 3,
      renderCell: (row: categoryType) => <ActionMenu id={row?.id} />,
    },
  ];

  const categoryFieldMap = {
    name: "نام",
    parent_name: "والد",
  };

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
      <SortFilterPaginationComponent<categoryType>
        setQuery={setQuery}
        count={categories?.totalCount ?? 0}
        fieldMap={categoryFieldMap}
      />
      <SimpleDataGrid
        rows={categories?.rows ?? []}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
};
export default page;
