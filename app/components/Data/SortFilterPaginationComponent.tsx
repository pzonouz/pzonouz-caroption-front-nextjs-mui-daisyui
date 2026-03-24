import { FilterOperand, SortDirection } from "@/app/schemas";
import { Box, NativeSelect, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sort } from "./Sort";
import { Filter } from "./Filter";
import { PaginationComponent } from "./PaginationComponent";

const SortFilterPaginationComponent = <T extends { name: string }>({
  setQuery,
  count,
  fieldMap,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
  count: number;
  fieldMap: Object;
}) => {
  const [sort, setSort] = useState<{
    field: keyof T;
    direction: SortDirection;
  }>({ field: "name", direction: "ASC" });

  const [filters, setFilters] = useState<
    {
      field: keyof T;
      operand: FilterOperand;
      condition: string;
    }[]
  >([]);

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  useEffect(() => {
    let query =
      "?sort=" +
      sort?.field?.toString() +
      "&sort_direction=" +
      sort?.direction +
      "&count_in_page=" +
      perPage +
      "&offset=" +
      (page - 1) * perPage;
    filters.map((f) => {
      query +=
        "&" +
        "filter=" +
        f.field?.toString() +
        "&" +
        "filter_operand=" +
        f.operand +
        "&" +
        "filter_condition=" +
        f.condition?.replaceAll(",", "");
    });
    setQuery(query);
  }, [sort, filters, perPage, page]);
  return (
    <Box className="border-2 border-solid border-slate-600 rounded-lg my-2 print:hidden">
      <Box>
        <Box className="p-2">
          <Sort<T> fieldsMap={fieldMap} sort={sort} setSort={setSort} />
          <Filter<T>
            fieldsMap={fieldMap}
            filters={filters}
            setFilters={setFilters}
          />
        </Box>
      </Box>
      <Box className="flex flex-row items-center gap-4 p-2">
        <Typography>تعداد در صفحه</Typography>
        <NativeSelect
          onChange={(e) => {
            setPerPage(+e.currentTarget.value);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={400}>400</option>
          <option value={800}>800</option>
        </NativeSelect>
      </Box>
      <Box className="flex flex-row items-center gap-6 px-6">
        {(page - 1) * perPage + 1}
        <Typography>تا</Typography>
        {page * perPage > count ? count : page * perPage}
        <Typography>از</Typography>
        <Typography>{count}</Typography>
      </Box>
      <PaginationComponent
        allCount={count}
        perPage={perPage}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};
export { SortFilterPaginationComponent };
