"use client";

import { CreateCategory } from "@/app/components/Category/CreateCategory";
import { DataTable } from "@/app/components/Data/DataTable";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetCategoresQuery } from "@/app/lib/api";
import { Box, Typography } from "@mui/material";

const page = () => {
  const { data: catgeories, error } = useGetCategoresQuery();
  return (
    <div className="pt-28 px-10">
      <Collapsible>
        <Box>
          <Typography>اضافه کردن دسته بندی</Typography>
          <CreateCategory />
        </Box>
      </Collapsible>
      <DataTable />
      {catgeories?.map((item) => (
        <div>{item?.name}</div>
      ))}
    </div>
  );
};
export default page;
