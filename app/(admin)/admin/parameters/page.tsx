"use client";

import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { SortFilterPaginationComponent } from "@/app/components/Data/SortFilterPaginationComponent";
import { CreateParameter } from "@/app/components/Parameters/CreateParameter";
import { DeleteParameter } from "@/app/components/Parameters/DeleteParameter";
import { EditParameter } from "@/app/components/Parameters/EditParameter";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetParametersQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { parameterType } from "@/app/schemas";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const page = () => {
  const [query, setQuery] = useState<string>("");
  const { data: parameters, isFetching } = useGetParametersQuery(query);
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "name",
      headerName: "نام پارامتر",
      width: 300,
      order: 1,
    },
    {
      field: "parameterGroup",
      headerName: "دسته بندی",
      width: 200,
      order: 2,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 100,
      order: 3,
      renderCell: (row: parameterType) => <ActionMenu id={row?.id} />,
    },
  ];
  const parameterFieldMap = {
    name: "نام",
    parameter_group: "دسته بندی",
  };
  return (
    <div className="pt-12 px-4">
      <Collapsible>
        <Box className="grid place-items-center">
          <Typography
            sx={{ pb: "1rem", fontSize: "1.5rem", fontWeight: "600" }}
          >
            اضافه کردن پارامتر
          </Typography>
          <CreateParameter />
          {id && <EditParameter />}
          <DeleteParameter />
        </Box>
      </Collapsible>
      <Typography className="text-2xl font-bold text-center">
        پارامترها
      </Typography>
      <SortFilterPaginationComponent
        count={parameters?.totalCount ?? 0}
        setQuery={setQuery}
        fieldMap={parameterFieldMap}
      />
      <SimpleDataGrid
        rows={parameters?.rows ?? []}
        columns={columns}
        isLoading={isFetching}
      />
    </div>
  );
};
export default page;
