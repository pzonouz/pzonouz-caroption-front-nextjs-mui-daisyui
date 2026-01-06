"use client";

import { DataTable } from "@/app/components/Data/DataTable";
import { CreateBrand } from "@/app/components/Brands/CreateBrand";
import { useGetBrandsQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { EditBrand } from "@/app/components/Brands/EditBrand";
import { DeleteBrand } from "@/app/components/Brands/DeleteBrand";
import { ActionMenu } from "@/app/components/shared/ActionMenu";

const page = () => {
  const { data: brands, isFetching } = useGetBrandsQuery();
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: GridColDef<(typeof brands)[]>[] = [
    {
      field: "name",
      headerName: "نام برند",
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
        <ActionMenu entity={`/brands`} id={params.row?.id} />
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
            اضافه کردن برند
          </Typography>
          <CreateBrand />
          {/* Prevent Load Edit brand widthout Id */}
          {id && <EditBrand />}
          <DeleteBrand />
        </Box>
      </Collapsible>
      <DataTable rows={brands ?? []} columns={columns} loading={isFetching} />
    </div>
  );
};
export default page;
