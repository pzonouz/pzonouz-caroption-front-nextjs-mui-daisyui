import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { productSchema, productType } from "@/app/schemas";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
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

const ProductForm = ({ product }: { product?: productType }) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<productType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      info: "",
      price: "",
      count: "",
      categoryId: "",
      brandId: "",
      entityId: "",
      slug: "",
      imageId: "",
      imageIds: "",
      imageUrl: "",
      position: "",
      code: "",
      show: false,
    },
  });
  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const dispatch = useAppDispatch();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [editProduct] = useEditProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const productHandler = (data: productType) => {
    if (product) {
      editProduct({ id: product?.id, ...data })
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
      createProduct(data)
        .unwrap()
        .then(() => {
          dispatch(setSnackbarSeverity("success"));
          dispatch(setSnackbarMessage("با موفقیت انجام شد"));
          dispatch(setSnackbarOpen(true));
          reset({ name: "", description: "", imageId: null });
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
      onSubmit={handleSubmit(productHandler)}
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
          name="info"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="توضیح کوتاه"
              error={!!errors?.info}
              size="small"
            />
          )}
        ></Controller>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              size="small"
              options={categories ?? []}
              getOptionLabel={(item) => item?.name ?? ""}
              value={categories?.find((c) => c.id === field.value) ?? null}
              onChange={(_, value) => field.onChange(value?.id ?? null)}
              renderInput={(params) => (
                <TextField {...params} label="دسته بندی" />
              )}
              sx={{ width: "100%" }}
            />
          )}
        />
        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              size="small"
              options={brands ?? []}
              getOptionLabel={(item) => item?.name ?? ""}
              value={brands?.find((c) => c.id === field.value) ?? null}
              onChange={(_, value) => field.onChange(value?.id ?? null)}
              renderInput={(params) => <TextField {...params} label="برند" />}
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
export { ProductForm };
