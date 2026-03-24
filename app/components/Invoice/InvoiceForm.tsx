"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceItemType, invoiceSchema, invoiceType } from "@/app/schemas";
import {
  api,
  useCreateInvoiceMutation,
  useEditInvoiceMutation,
  useGetPersonsQuery,
} from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";

import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";
import { InvoiceRows } from "../Data/InvoiceRows";
import { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { personType } from "../../schemas";
import { setRows } from "@/app/lib/features/invoices";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

const InvoiceForm = ({
  invoice,
  type,
}: {
  invoice?: invoiceType;
  type: "SELL" | "BUY" | "RENT";
}) => {
  const defaultInvoice = useMemo(
    () => ({
      personId: "",
      description: "",
      discount: "0",
      type: type,
      date: new Date(),
      items: [],
    }),
    [type],
  );

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<invoiceType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultInvoice,
  });
  const dispatch = useAppDispatch();
  const dispatchSetRows = (input: invoiceItemType[]) =>
    dispatch(setRows(input));

  useEffect(() => {
    if (type) setValue("type", type);
  }, [type, setValue]);

  useEffect(() => {
    invoice?.type && setValue("type", invoice?.type!);
    setValue("personId", invoice?.personId || "");
    setValue("discount", invoice?.discount);
    setValue("items", invoice?.items || []);
    invoice?.items && dispatchSetRows(invoice?.items);
    setValue("date", invoice?.date ? new Date(invoice.date) : new Date());
  }, [invoice]);

  const { data: persons } = useGetPersonsQuery("");
  const snackbarOpen = useSnackbarOpen();
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const [editInvoice] = useEditInvoiceMutation();
  const items = useAppSelector((state) => state.invoice.existingRows);
  useEffect(() => {
    setValue("items", items);
  }, [items]);

  const invoiceHandler = (data: invoiceType) => {
    if (invoice) {
      editInvoice({ id: invoice?.id, ...data })
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          dispatch(setModalOpen(false));
          dispatch(setRows([]));
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    } else {
      createInvoice({
        ...data,
        items: data?.items?.map((item) => ({
          productId: item?.productId,
          price: item?.price?.replaceAll(",", ""),
          count: item?.count?.replaceAll(",", ""),
          discount: item?.discount?.replaceAll(",", ""),
          description: item?.description,
        })),
      })
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          reset({
            personId: "",
            description: "",
            discount: "0",
            type: type,
            date: new Date(),
          });
          dispatchSetRows([]);
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    }
  };

  return (
    <Box
      className="flex flex-col gap-2 w-full"
      component="form"
      onSubmit={handleSubmit(invoiceHandler)}
    >
      <Box className=" w-full">
        <Box className="flex gap-2 pb-4">
          <Controller
            name="personId"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  size="small"
                  options={persons?.rows ?? []}
                  getOptionLabel={(item: personType) => item?.name ?? ""}
                  value={
                    persons?.rows?.find((c) => c.id === field.value) ?? null
                  }
                  onChange={(_, value) => field.onChange(value?.id ?? null)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="شخص"
                      error={!!errors?.personId}
                      helperText={errors?.personId?.message}
                    />
                  )}
                  sx={{ width: "100%" }}
                />
              );
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              dispatch(api.util.invalidateTags(["persons"]));
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
                `${process.env.NEXT_PUBLIC_BASE_URL}admin/persons`,
                "اشخاص",
                `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
              );
            }}
          >
            <AddIcon />
          </Button>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="تاریخ"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            )}
          />
        </Box>
        <InvoiceRows
          key={items.reduce((acc, current) => {
            return (acc += Number(current?.count));
          }, 0)}
        />
      </Box>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="توضیحات"
            error={!!errors?.description}
            size="small"
            helperText={errors?.description?.message}
            className="w-full"
          />
        )}
      ></Controller>
      {errors.items && (
        <Typography color="error">حداقل یک کالا را وارد کنید</Typography>
      )}
      <Button
        loading={isLoading}
        component="button"
        type="submit"
        variant="contained"
        className="min-w-sm max-w-lg mx-auto"
      >
        ثبت
      </Button>
    </Box>
  );
};
export { InvoiceForm };
