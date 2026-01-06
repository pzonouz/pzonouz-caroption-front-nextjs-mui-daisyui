import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { imageType, productSchema, productType } from "@/app/schemas";
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
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "@/app/lib/features/snackbar";
import { ImageHandlerComponent } from "../Image/ImageHandlerComponent";
import { ImageShow } from "../Image/ImageShow";
import { Slugify } from "@/app/utils";

const ProductForm = ({ product }: { product?: productType }) => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<productType>({
    resolver: zodResolver(productSchema),
    values: product ?? {
      name: "",
      description: "",
      info: "",
      price: "",
      count: "",
      categoryId: "",
      brandId: "",
      slug: "",
      imageUrl: "",
      position: "",
      code: "",
      show: false,
      slug: "",
    },
  });

  const imageId = watch("imageId");
  const imageUrl = watch("imageUrl");
  const image: imageType | null = imageId
    ? { id: imageId, name: "", imageUrl: imageUrl ?? "" }
    : null;

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [editProduct] = useEditProductMutation();

  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();

  const productHandler = (data: productType) => {
    if (product) {
      editProduct({ id: product.id, ...data })
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

  const formatNumber = (value: string) =>
    value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
              helperText={errors?.name?.message}
              size="small"
              onChange={(e) => {
                field.onChange(e.target?.value);
                setValue("slug", Slugify(e.target?.value));
              }}
            />
          )}
        />

        <Controller
          name="slug"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="شناسه" size="small" />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="توضیح" size="small" />
          )}
        />

        <Controller
          name="info"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="توضیح کوتاه" size="small" />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={formatNumber(field.value ?? "")}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                field.onChange(raw);
              }}
              label="قیمت"
              size="small"
            />
          )}
        />

        <Controller
          name="count"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={formatNumber(field.value ?? "")}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                field.onChange(raw);
              }}
              label="تعداد"
              size="small"
            />
          )}
        />

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
            />
          )}
        />

        {/* ⭐ Generic Image Handler */}
        <ImageHandlerComponent<productType>
          open={open}
          setOpen={setOpen}
          image={image}
          setImage={(img) => {
            setValue("imageId", img?.id ?? null);
            setValue("imageUrl", img?.imageUrl ?? "");
          }}
          setValue={setValue}
          field="imageId"
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
            />
          )}
        />

        <Controller
          name="show"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="نمایش"
            />
          )}
        />
      </Box>

      <IconButton className="w-20" onClick={() => setOpen(true)}>
        <AddToPhotosIcon />
      </IconButton>

      <ImageShow image={image} />

      <Button
        loading={isLoading}
        type="submit"
        variant="contained"
        className="w-full"
      >
        ثبت
      </Button>
    </Box>
  );
};

export { ProductForm };
