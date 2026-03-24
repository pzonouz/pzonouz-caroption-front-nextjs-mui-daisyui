"use client";

import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { SortFilterPaginationComponent } from "@/app/components/Data/SortFilterPaginationComponent";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetPersonsQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { categoryType, personType } from "@/app/schemas";
import { CreatePerson } from "@/app/components/Persons/CreatePerson";
import { EditPerson } from "@/app/components/Persons/EditPerson";
import { DeletePerson } from "@/app/components/Persons/DeletePerson";

const page = () => {
  const [query, setQuery] = useState<string>("");
  const { data: persons, isLoading } = useGetPersonsQuery(query);
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "name",
      headerName: "نام خانوادگی",
      width: 200,
      order: 1,
    },
    {
      field: "firstName",
      headerName: "نام",
      width: 200,
      order: 2,
    },
    {
      field: "phoneNumber",
      headerName: "شماره تلفن",
      width: 200,
      order: 3,
    },
    {
      field: "address",
      headerName: "آدرس",
      width: 200,
      order: 4,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 50,
      order: 5,
      renderCell: (row: personType) => <ActionMenu id={row?.id} />,
    },
  ];

  const personFieldMap = {
    name: "نام خانوادگی",
    first_name: "نام",
    address: "آدرس",
    phone_number: "شماره تلفن",
  };

  return (
    <div className="pt-12 px-4">
      <Collapsible>
        <Box className="grid place-items-center">
          <Typography
            sx={{ pb: "1rem", fontSize: "1.5rem", fontWeight: "600" }}
          >
            اضافه کردن شخص
          </Typography>
          <CreatePerson />
          {id && <EditPerson />}
          <DeletePerson />
        </Box>
      </Collapsible>
      <SortFilterPaginationComponent<personType>
        setQuery={setQuery}
        count={persons?.totalCount ?? 0}
        fieldMap={personFieldMap}
      />
      <SimpleDataGrid
        rows={persons?.rows ?? []}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
};
export default page;
