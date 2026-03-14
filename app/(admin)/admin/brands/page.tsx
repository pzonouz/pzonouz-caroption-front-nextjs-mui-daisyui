"use client";

import { CreateBrand } from "@/app/components/Brands/CreateBrand";
import { useGetBrandsQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Typography } from "@mui/material";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { EditBrand } from "@/app/components/Brands/EditBrand";
import { DeleteBrand } from "@/app/components/Brands/DeleteBrand";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { brandType } from "@/app/schemas";
import { SortFilterPaginationComponent } from "@/app/components/Data/SortFilterPaginationComponent";
import { useState } from "react";

const page = () => {
  const [query, setQuery] = useState<string>("");
  const { data: brands, isLoading } = useGetBrandsQuery(query);
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "name",
      headerName: "نام برند",
      width: 200,
      order: 1,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 100,
      order: 2,
      renderCell: (row: brandType) => <ActionMenu id={row?.id} />,
    },
  ];
  const brandFieldMap = {
    name: "نام",
  };

  return (
    <div className="pt-12 px-4">
      <Collapsible>
        <Box className="grid place-items-center">
          <Typography
            sx={{ pb: "1rem", fontSize: "1.5rem", fontWeight: "600" }}
          >
            اضافه کردن برند
          </Typography>
          <CreateBrand />
          {/* Prevent Load Edit brand widthout Id */}
          {id && <EditBrand />}
          <DeleteBrand />
        </Box>
      </Collapsible>
      <SortFilterPaginationComponent<brandType>
        count={brands?.totalCount ?? 0}
        setQuery={setQuery}
        fieldMap={brandFieldMap}
      />
      <SimpleDataGrid
        columns={columns}
        rows={brands?.rows ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};
export default page;
