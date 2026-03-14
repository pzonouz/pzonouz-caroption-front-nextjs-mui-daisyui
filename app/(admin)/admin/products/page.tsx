"use client";

import { SimpleDataGrid } from "@/app/components/Data/SimpleDataGrid";
import { SortFilterPaginationComponent } from "@/app/components/Data/SortFilterPaginationComponent";
import { CreateProduct } from "@/app/components/Products/CreateProduct";
import { Deleteproduct } from "@/app/components/Products/DeleteProduct";
import { EditProduct } from "@/app/components/Products/EditProduct";
import { ActionMenu } from "@/app/components/shared/ActionMenu";
import { Collapsible } from "@/app/components/Surface/Collapsible";
import { useGetProductsQuery } from "@/app/lib/api";
import { useAppSelector } from "@/app/lib/hooks";
import { productType } from "@/app/schemas";
import { FormatNumber } from "@/app/utils";
import { Box, Typography } from "@mui/material";
import { generateKey } from "node:crypto";
import { useState } from "react";

const page = () => {
  const [query, setQuery] = useState<string>("");
  const { data: products, isFetching } = useGetProductsQuery(query);
  const id = useAppSelector((state) => state?.modal?.id);

  const columns: any[] = [
    {
      field: "name",
      headerName: "نام کالا",
      width: 200,
      order: 1,
    },
    {
      field: "categoryName",
      headerName: "دسته بندی",
      width: 200,
      order: 2,
    },
    {
      field: "count",
      headerName: "تعداد",
      width: 100,
      transformFunction: FormatNumber,
      order: 3,
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 100,
      transformFunction: FormatNumber,
      order: 4,
    },
    {
      field: "brandName",
      headerName: "برند",
      width: 100,
      order: 5,
    },
    {
      field: "generated",
      headerName: "تولید شده",
      width: 100,
      order: 6,
      transformFunction: (input: Boolean) => {
        if (input) {
          return "بله";
        }
        return "خیر";
      },
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 100,
      order: 7,
      renderCell: (row: productType) => <ActionMenu id={row?.id} />,
    },
  ];
  const productFieldMap = {
    name: "نام",
    category_name: "دسته بندی",
    price: "قیمت",
    count: "تعداد",
    generated: "تولیدشده",
  };

  return (
    <div className="pt-12 px-4">
      <Collapsible>
        <Box className="grid place-items-center">
          <Typography
            sx={{ pb: "1rem", fontSize: "1.5rem", fontWeight: "600" }}
          >
            اضافه کردن کالا
          </Typography>
          <CreateProduct />
          {/* Prevent Load Edit product widthout Id */}
          {id && <EditProduct />}
          <Deleteproduct />
        </Box>
      </Collapsible>
      <SortFilterPaginationComponent
        fieldMap={productFieldMap}
        setQuery={setQuery}
        count={products?.totalCount ?? 0}
      />
      <SimpleDataGrid
        rows={products?.rows ?? []}
        columns={columns}
        isLoading={isFetching}
      />
    </div>
  );
};
export default page;
