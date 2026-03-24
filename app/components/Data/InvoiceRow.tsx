import { api, useGetProductsQuery } from "@/app/lib/api";
import { addNewRow, updateRows } from "@/app/lib/features/invoices";
import { useAppDispatch } from "@/app/lib/hooks";
import { invoiceItemType } from "@/app/schemas";
import { FormatNumber, PriceCount, Total } from "@/app/utils";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { KeyboardEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

export const InvoiceRow = ({
  type,
  row,
}: {
  type: "CREATE" | "EDIT";
  row?: invoiceItemType;
}) => {
  const dispatch = useAppDispatch();

  const dispatchUpdateRows = (input: invoiceItemType) =>
    dispatch(updateRows(input));

  const dispatchAddNewRow = (input: invoiceItemType) =>
    dispatch(addNewRow(input));

  const [productId, setProductId] = useState(row?.productId || "");
  const [price, setPrice] = useState(row?.price || "");
  const [count, setCount] = useState(row?.count || "1");
  const [discount, setDiscount] = useState(row?.discount || "0");

  useEffect(() => {
    row?.productId && setProductId(row?.productId);
    row?.price && setPrice(FormatNumber(row?.price));
    row?.count && setCount(row?.count);
    row?.discount && setDiscount(row?.discount);
  }, [row]);

  const { data: products } = useGetProductsQuery(
    "?filter=generated&filter_operand==&filter_condition=false",
  );

  const getFocus = () => {
    if (type == "CREATE") {
      setTimeout(() => {
        // Focus the last rendered Autocomplete input (the newly added row)
        const allAutocompleteInputs =
          document.querySelectorAll<HTMLInputElement>(
            ".MuiAutocomplete-root input",
          );
        const lastInput =
          allAutocompleteInputs[allAutocompleteInputs.length - 1];
        lastInput?.focus();
      }, 0);
    }
  };

  function pressTabBehavior(
    e: KeyboardEvent<HTMLDivElement>,
    type: "CREATE" | "EDIT",
  ) {
    if (e.key == "Tab") {
      e.stopPropagation();
      if (type == "CREATE") {
        dispatchAddNewRow({
          productId: productId,
          count: count,
          price: price,
          discount: discount,
        });
        getFocus();
      }
      if (type == "EDIT") {
        dispatchUpdateRows({
          productId: productId,
          count: count,
          price: price,
          discount: discount,
        });
      }
    }
  }

  function pressEnterBehavior(
    e: KeyboardEvent<HTMLDivElement>,
    type: "CREATE" | "EDIT",
  ) {
    if (e.key == "Enter") {
      e.stopPropagation();
      e.preventDefault();
      if (type == "CREATE") {
        (dispatchAddNewRow({
          productId: productId,
          count: count,
          price: price,
          discount: discount,
        }),
          getFocus());
      }
      if (type == "EDIT") {
        dispatchUpdateRows({
          productId: productId,
          count: count,
          price: price,
          discount: discount,
        });
      }
    }
  }

  return (
    <Box className="flex gap-2">
      <Autocomplete
        disabled={type == "EDIT"}
        size="small"
        options={products?.rows?.map((i) => i?.id) ?? []}
        getOptionLabel={(item) => {
          const product = products?.rows?.find((p) => p.id == item);
          return `${product?.name || ""}`;
        }}
        value={productId}
        onChange={(_, newValue) => {
          setProductId(newValue || "");
          const product = products?.rows?.find((p) => p.id == newValue);
          setPrice(FormatNumber(product?.price || ""));
        }}
        renderInput={(params) => (
          <TextField {...params} label="نام محصول" className="min-w-md" />
        )}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key == "Enter") {
            e.preventDefault();
          }
        }}
      />
      {type == "CREATE" && (
        <>
          {" "}
          <Button
            variant="contained"
            onClick={() => {
              dispatch(api.util.invalidateTags(["products"]));
            }}
          >
            <RefreshIcon />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const width = 800;
              const height = 600;

              const left = window.screen.width / 2 - width / 2;
              const top = window.screen.height / 2 - height / 2;

              window.open(
                `${process.env.NEXT_PUBLIC_BASE_URL}admin/products`,
                "محصولات",
                `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
              );
            }}
          >
            <AddIcon />
          </Button>
        </>
      )}
      <TextField
        value={price}
        onChange={(e) => {
          setPrice(FormatNumber(e.currentTarget?.value));
        }}
        label={"قیمت"}
        variant="outlined"
        size="small"
        onKeyDown={(e) => {
          pressEnterBehavior(e, type);
        }}
      />
      <TextField
        value={count}
        onChange={(e) => {
          setCount(FormatNumber(e.currentTarget?.value));
        }}
        label="تعداد"
        variant="outlined"
        size="small"
        onKeyDown={(e) => {
          pressEnterBehavior(e, type);
        }}
      />
      <TextField
        value={PriceCount(count, price)}
        label="فی * تعداد"
        variant="outlined"
        size="small"
        disabled
      />
      <TextField
        value={discount}
        onChange={(e) => {
          const newValue = FormatNumber(e.currentTarget.value);
          const numericValue = Number(newValue.replaceAll(",", ""));
          const maxValue = Number(PriceCount(count, price).replaceAll(",", ""));

          if (numericValue > maxValue) {
            return;
          }
          setDiscount(newValue);
        }}
        label="تخفیف"
        variant="outlined"
        size="small"
        onKeyDown={(e) => {
          pressEnterBehavior(e, type);
          pressTabBehavior(e, type);
        }}
      />
      <TextField
        value={Total(discount, PriceCount(count, price)) || ""}
        label="کل با تخفیف"
        variant="outlined"
        size="small"
        disabled
      />
    </Box>
  );
};
