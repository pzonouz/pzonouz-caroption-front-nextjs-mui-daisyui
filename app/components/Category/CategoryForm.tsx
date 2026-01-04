import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { categorySchema, categoryType } from "@/app/schemas";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetParentCategoriesQuery,
} from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";

import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "@/app/lib/features/snackbar";

const CategoryForm = ({ category }: { category?: categoryType }) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<categoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      description: "",
      name: "",
      priority: "",
      show: false,
    },
  });
  useEffect(() => {
    if (category) reset(category);
  }, [category, reset]);
  const dispatch = useAppDispatch();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const { data: parentCategories } = useGetParentCategoriesQuery();
  const categoryHandler = (data: categoryType) => {
    if (category) {
      editCategory({ id: category?.id, ...data })
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
      createCategory(data)
        .unwrap()
        .then(() => {
          dispatch(setSnackbarSeverity("success"));
          dispatch(setSnackbarMessage("با موفقیت انجام شد"));
          dispatch(setSnackbarOpen(true));
          reset({ name: "", description: "", parentId: null, imageId: null });
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
      onSubmit={handleSubmit(categoryHandler)}
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
              size="small"
              helperText={errors?.name?.message}
              className="w-full"
            />
          )}
        ></Controller>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="توضیح"
              error={!!errors?.description}
              size="small"
            />
          )}
        ></Controller>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="اولویت"
              error={!!errors?.priority}
              size="small"
            />
          )}
        ></Controller>
        <Controller
          name="parentId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              size="small"
              options={parentCategories}
              getOptionLabel={(item) => item?.name ?? ""}
              value={
                parentCategories?.find((c) => c.id === field.value) ?? null
              }
              onChange={(_, value) => field.onChange(value?.id ?? null)}
              renderInput={(params) => <TextField {...params} label="والد" />}
              sx={{ width: "100%" }}
            />
          )}
        />
        <Controller
          control={control}
          name="show"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="نمایش"
            />
          )}
        />
      </Box>
      <Button
        loading={isLoading}
        component="button"
        type="submit"
        variant="contained"
        className="w-full "
      >
        ثبت
      </Button>
    </Box>
  );
};
export { CategoryForm };
