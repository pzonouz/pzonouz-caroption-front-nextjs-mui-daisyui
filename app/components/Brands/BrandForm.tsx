import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema, brandType } from "@/app/schemas";
import { useCreateBrandMutation, useEditBrandMutation } from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";

import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "@/app/lib/features/snackbar";

const BrandForm = ({ brand }: { brand?: brandType }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<brandType>({
    resolver: zodResolver(brandSchema),
    values: brand ?? {
      name: "",
      description: "",
    },
  });

  const dispatch = useAppDispatch();
  const [createBrand, { isLoading }] = useCreateBrandMutation();
  const [editBrand] = useEditBrandMutation();

  const brandHandler = (data: brandType) => {
    if (brand) {
      editBrand({ id: brand.id, ...data })
        .unwrap()
        .then(() => {
          dispatch(setSnackbarSeverity("success"));
          dispatch(setSnackbarMessage("با موفقیت انجام شد"));
          dispatch(setSnackbarOpen(true));
          dispatch(setModalOpen(false));
        })
        .catch((err) => {
          dispatch(setSnackbarSeverity("error"));
          dispatch(setSnackbarMessage(translateErrors(err) ?? ""));
          dispatch(setSnackbarOpen(true));
        });
    } else {
      createBrand(data)
        .unwrap()
        .then(() => {
          dispatch(setSnackbarSeverity("success"));
          dispatch(setSnackbarMessage("با موفقیت انجام شد"));
          dispatch(setSnackbarOpen(true));
        })
        .catch((err) => {
          dispatch(setSnackbarSeverity("error"));
          dispatch(setSnackbarMessage(translateErrors(err) ?? ""));
          dispatch(setSnackbarOpen(true));
        });
    }
  };

  return (
    <Box
      className="flex flex-col gap-2 w-full"
      component="form"
      onSubmit={handleSubmit(brandHandler)}
    >
      <Box className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام"
              error={!!errors?.name}
              helperText={errors?.name?.message}
              size="small"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="توضیح" size="small" />
          )}
        />
        <Button
          loading={isLoading}
          type="submit"
          variant="contained"
          className="w-full"
        >
          ثبت
        </Button>
      </Box>
    </Box>
  );
};

export { BrandForm };
