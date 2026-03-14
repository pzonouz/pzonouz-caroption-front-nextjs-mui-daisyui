import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parameterGroupSchema, parameterGroupType } from "@/app/schemas";
import {
  useCreateParameterGroupMutation,
  useEditParameterGroupMutation,
  useGetParentCategoriesQuery,
} from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";

import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";

const ParameterGroupForm = ({
  parameterGroup,
}: {
  parameterGroup?: parameterGroupType;
}) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<parameterGroupType>({
    resolver: zodResolver(parameterGroupSchema),
    values: parameterGroup ?? {
      name: "",
      categoryId: "",
      categoryName: "",
    },
  });
  const dispatch = useAppDispatch();
  const SnackbarOpen = useSnackbarOpen();
  const [createParamaterGroup, { isLoading }] =
    useCreateParameterGroupMutation();
  const [editParamaterGroup] = useEditParameterGroupMutation();
  const { data: parentCategories } = useGetParentCategoriesQuery();
  const parameterGroupHandler = (data: parameterGroupType) => {
    if (parameterGroup) {
      editParamaterGroup({ id: parameterGroup?.id, ...data })
        .unwrap()
        .then(() => {
          SnackbarOpen({ status: "success" });
          dispatch(setModalOpen(false));
        })
        .catch((err) => {
          SnackbarOpen({ status: "error", message: translateErrors(err) });
        });
    } else {
      createParamaterGroup(data)
        .unwrap()
        .then(() => {
          SnackbarOpen({ status: "success" });
          reset({ name: "", categoryName: "", categoryId: null });
        })
        .catch((err) => {
          SnackbarOpen({ status: "error", message: translateErrors(err) });
        });
    }
  };

  return (
    <Box
      className="flex flex-col gap-2 w-full"
      component="form"
      onSubmit={handleSubmit(parameterGroupHandler)}
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
          name="categoryId"
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
              renderInput={(params) => (
                <TextField {...params} label="دسته بندی کالا" />
              )}
              sx={{ width: "100%" }}
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
export { ParameterGroupForm };
