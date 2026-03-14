import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { categorySchema, categoryType, imageType } from "@/app/schemas";
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
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import { ImageHandlerComponent } from "../Image/ImageHandlerComponent";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { ImageShow } from "../Image/ImageShow";
import { Slugify } from "@/app/utils";
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";

const CategoryForm = ({ category }: { category?: categoryType }) => {
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<categoryType>({
    resolver: zodResolver(categorySchema),
    values: category ?? {
      name: "",
      description: "",
      slug: "",
      priority: "",
      show: false,
      imageId: null,
    },
  });
  const imageId = watch("imageId");
  const imageUrl = watch("imageUrl");
  const image: imageType | null = imageId
    ? { id: imageId, name: "", imageUrl: imageUrl ?? "" }
    : null;

  const nameValue = watch("name");
  useEffect(() => {
    setValue("slug", Slugify(nameValue));
  }, [nameValue]);

  const dispatch = useAppDispatch();
  const snackbarOpen = useSnackbarOpen();
  const [open, setOpen] = useState<boolean>(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const { data: parentCategories } = useGetParentCategoriesQuery();
  const categoryHandler = (data: categoryType) => {
    if (category) {
      editCategory({ id: category?.id, ...data })
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          dispatch(setModalOpen(false));
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    } else {
      createCategory(data)
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          reset({ name: "", description: "", parentId: null, imageId: null });
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    }
  };

  useEffect(() => {
    if (image?.id) {
      setValue("imageId", image.id);
    }
  }, [image?.id]);

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
          name="slug"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="شناسه"
              error={!!errors?.slug}
              size="small"
              helperText={errors?.slug?.message}
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
              options={parentCategories ?? []}
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
        <ImageHandlerComponent<categoryType>
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
      <IconButton
        className="w-20"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddToPhotosIcon />
      </IconButton>
      {image && <ImageShow image={image} />}
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
