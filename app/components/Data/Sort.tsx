import { Box, NativeSelect, Typography } from "@mui/material";
import React from "react";
import { SortDirection } from "@/app/schemas";

export const Sort = <T extends { name: string }>({
  fieldsMap,
  sort,
  setSort,
}: {
  fieldsMap: T;
  sort: { field: keyof T; direction: SortDirection } | undefined;
  setSort: React.Dispatch<
    React.SetStateAction<{ field: keyof T; direction: SortDirection }>
  >;
}) => {
  return (
    <Box className="items-center">
      <Typography className="">مرتب سازی بر اساس:</Typography>
      <Box className="flex flex-row items-center px-2 gap-2">
        <NativeSelect
          value={sort?.field}
          onChange={(e) => {
            setSort({
              field: e.currentTarget.value as keyof T,
              direction: sort?.direction ?? "ASC",
            });
          }}
        >
          {Object.keys(fieldsMap)?.map((item) => (
            <option key={item} value={item}>
              {fieldsMap[item as keyof T]}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect
          value={sort?.direction}
          onChange={(e) => {
            setSort({
              field: sort?.field ?? "name",
              direction: (e.currentTarget?.value ?? "ASC") as SortDirection,
            });
          }}
        >
          <option value={"ASC"}>صعودی</option>
          <option value={"DESC"}>نزولی</option>
        </NativeSelect>
      </Box>
    </Box>
  );
};
