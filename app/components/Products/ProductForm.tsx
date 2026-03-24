import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  imageType,
  productParameterValueType,
  productSchema,
  productType,
} from "@/app/schemas";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetParametersByCategoryQuery,
} from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";

import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  NativeSelect,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { ImageHandlerComponent } from "../Image/ImageHandlerComponent";
import { ImageShow } from "../Image/ImageShow";
import { FormatNumber, NormalizeForFront, Slugify } from "@/app/utils";
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";

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
    values: NormalizeForFront(product, [
      "productParameterValues",
      "parameters",
    ]) ?? {
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
      productParameterValues: [],
      parameters: [],
    },
  });

  const { data: parameters } = useGetParametersByCategoryQuery(
    watch("categoryId"),
    {
      skip: !Boolean(watch("categoryId")),
    },
  );
  useEffect(() => {
    if (product)
      reset(
        NormalizeForFront(product, [
          "productParameterValues",
          "parameters",
        ]) ?? {
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
          productParameterValues: [],
          parameters: [],
        },
      );
  }, [product]);
  useEffect(() => {
    if (parameters && !product) {
      setValue("parameters", parameters);
      const productParameterValues: productParameterValueType[] = [];
      parameters?.map((p) => {
        if (p.type == "SL") {
          productParameterValues.push({
            parameterId: p.id,
            selectableValue: p.selectables?.[0],
          });
        }
        if (p.type == "BL") {
          productParameterValues.push({
            parameterId: p.id,
            boolValue: false,
          });
        }
        if (p.type == "TX") {
          productParameterValues.push({
            parameterId: p.id,
            textValue: "",
          });
        }
      });
      setValue("productParameterValues", productParameterValues);
    }
  }, [parameters, product]);
  const imageId = watch("imageId");
  const imageUrl = watch("imageUrl");
  const image: imageType | null = imageId
    ? { id: imageId, name: "", imageUrl: imageUrl ?? "" }
    : null;

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [editProduct] = useEditProductMutation();

  const { data: categories } = useGetCategoriesQuery("");
  const { data: brands } = useGetBrandsQuery("");

  const snackbarOpen = useSnackbarOpen();
  const productHandler = (data: productType) => {
    if (product) {
      editProduct({ id: product.id, ...data })
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          dispatch(setModalOpen(false));
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    } else {
      createProduct(data)
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          reset({ name: "", description: "", imageId: null });
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
          name="position"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="مکان" size="small" />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={FormatNumber(field.value ?? "")}
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
              value={FormatNumber(field.value ?? "")}
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
              options={categories?.rows ?? []}
              getOptionLabel={(item) => item?.name ?? ""}
              value={
                categories?.rows?.find((c) => c.id === field.value) ?? null
              }
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
              options={brands?.rows ?? []}
              getOptionLabel={(item) => item?.name ?? ""}
              value={brands?.rows?.find((c) => c.id === field.value) ?? null}
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
      <Box className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 grid-flow-row gap-8">
        {parameters?.map((item) => {
          if (item?.type == "SL") {
            return (
              <Box
                key={item?.id}
                className="flex items-center justify-between border-2 border-solid p-2 rounded-md border-slate-300"
              >
                <Typography>{item?.name}</Typography>
                <NativeSelect
                  value={
                    watch("productParameterValues")?.find(
                      (i) => i.parameterId == item.id,
                    )?.selectableValue || ""
                  }
                  onChange={(e) => {
                    setValue("productParameterValues", [
                      ...watch("productParameterValues").filter(
                        (p) => p.parameterId != item.id,
                      ),
                      {
                        parameterId: item?.id,
                        selectableValue: e.currentTarget?.value,
                      },
                    ]);
                  }}
                >
                  {item?.selectables?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
            );
          }
          if (item?.type == "BL") {
            return (
              <Box
                key={item?.id}
                className="flex items-center item-center justify-between p-2 border-2 border-solid border-slate-300 rounded-md"
              >
                <Typography>{item?.name}</Typography>
                <Switch
                  checked={
                    watch("productParameterValues")?.find(
                      (i) => i.parameterId == item.id,
                    )?.boolValue || false
                  }
                  onChange={(e) => {
                    setValue("productParameterValues", [
                      ...watch("productParameterValues").filter(
                        (p) => p.parameterId != item.id,
                      ),
                      {
                        parameterId: item?.id,
                        boolValue: Boolean(e.target.checked),
                      },
                    ]);
                  }}
                />
              </Box>
            );
          }
          if (item?.type == "TX") {
            return (
              <Box
                key={item?.id}
                className="flex items-center item-center justify-between p-2 border-2 border-solid border-slate-300 rounded-md"
              >
                <Typography>{item?.name}</Typography>
                <TextField />
              </Box>
            );
          }
        })}
      </Box>
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
