"use client";

import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { SortFilterPaginationComponent } from "@/app/components/Data/SortFilterPaginationComponent";
import { CreateParameterGroup } from "@/app/components/ParameterGroups/CreateParameterGroup";
import { DeleteParameterGroup } from "@/app/components/ParameterGroups/DeleteParameterGroup";
import { EditParameterGroup } from "@/app/components/ParameterGroups/EditParameterGroup";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetParameterGroupsQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { parameterGroupType } from "@/app/schemas";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const page = () => {
  const [query, setQuery] = useState<string>("");
  const { data: parameterGroups, isFetching } =
    useGetParameterGroupsQuery(query);
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "name",
      headerName: "نام دسته بندی",
      width: 200,
      order: 1,
    },
    {
      field: "categoryName",
      headerName: "دسته بندی کالا",
      width: 200,
      order: 2,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 100,
      order: 3,
      renderCell: (row: parameterGroupType) => <ActionMenu id={row?.id} />,
    },
  ];
  const parameterGroupFieldMap = {
    name: "نام دسته بندی",
    category_name: "دسته بندی کالا",
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
          <CreateParameterGroup />
          {id && <EditParameterGroup />}
          <DeleteParameterGroup />
        </Box>
      </Collapsible>
      <SortFilterPaginationComponent
        fieldMap={parameterGroupFieldMap}
        setQuery={setQuery}
        count={parameterGroups?.totalCount ?? 0}
      />
      <SimpleDataGrid
        rows={parameterGroups?.rows ?? []}
        columns={columns}
        isLoading={isFetching}
      />
    </div>
  );
};
export default page;
