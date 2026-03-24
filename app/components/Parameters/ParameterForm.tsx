import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parameterType, parameterSchema } from "@/app/schemas";
import {
  useCreateParameterMutation,
  useEditParameterMutation,
  useGetParameterGroupsQuery,
} from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/modals";
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";
import { NormalizeForBack, NormalizeForFront } from "@/app/utils";
import { useState } from "react";

const ParameterForm = ({ parameter }: { parameter?: parameterType }) => {
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<parameterType>({
    resolver: zodResolver(parameterSchema),
    values: NormalizeForFront(parameter, ["selectables"]) ?? {
      name: "",
      description: "",
      parameterGroup: "",
      parameterGroupId: "",
      type: "SL",
      selectables: [],
      priority: "",
    },
  });
  const safeArray = (value: any): any[] => {
    return Array.isArray(value) ? value : [];
  };
  const dispatch = useAppDispatch();
  const snackbarOpen = useSnackbarOpen();
  const [createParamater, { isLoading }] = useCreateParameterMutation();
  const [editParameter] = useEditParameterMutation();
  const { data: parameterGroups, isLoading: loading } =
    useGetParameterGroupsQuery("");
  const parameterHandler = (data: parameterType) => {
    data = NormalizeForBack(data);
    if (parameter) {
      editParameter({ id: parameter?.id, ...data })
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          dispatch(setModalOpen(false));
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    } else {
      createParamater(data)
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          reset({
            name: "",
            description: "",
            parameterGroup: "",
            parameterGroupId: "",
            type: "SL",
            selectables: [],
            priority: "",
          });
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    }
  };

  return (
    <>
      {loading && <CircularProgress />}
      <Box
        className="flex flex-col gap-2 w-full"
        component="form"
        onSubmit={handleSubmit(parameterHandler)}
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
                label="توضیحات"
                error={!!errors?.description}
                size="small"
                helperText={errors?.description?.message}
                className="w-full"
              />
            )}
          />
          <Controller
            name="parameterGroupId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                size="small"
                options={parameterGroups?.rows ?? []}
                getOptionLabel={(item) => item?.name ?? ""}
                value={
                  parameterGroups?.rows?.find((c) => c.id === field.value) ??
                  null
                }
                onChange={(_, value) => field.onChange(value?.id ?? null)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="دسته بندی"
                    error={!!errors?.parameterGroupId}
                    helperText={errors?.parameterGroupId?.message}
                  />
                )}
                sx={{ width: "100%" }}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl size="small">
                <InputLabel>نوع</InputLabel>
                <Select
                  value={field?.value}
                  onChange={(e) => {
                    field.onChange(e?.target?.value);
                  }}
                  label="نوع"
                >
                  <MenuItem value={"SL"}>قابل انتخاب</MenuItem>
                  <MenuItem value={"BL"}>بله خیر</MenuItem>
                  <MenuItem value={"TX"}>متن</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {watch("type") == "SL" && (
            <Controller
              name="selectables"
              control={control}
              render={({ field }) => {
                const [input, setInput] = useState("");

                const addChip = () => {
                  const value = input.trim();
                  if (!value) return;
                  if (field.value?.includes(value)) return;

                  field.onChange([...field?.value, value]);
                  setInput("");
                };

                const removeChip = (chip: string) => {
                  field.onChange(field?.value.filter((v) => v !== chip));
                };

                return (
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel shrink>قابل انتخاب</InputLabel>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 1,
                        minHeight: 56,
                        px: 1.5,
                        py: 1,
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 1,
                        "&:focus-within": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      {safeArray(field?.value).map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          onDelete={() => removeChip(item)}
                          size="small"
                        />
                      ))}

                      <InputBase
                        value={input}
                        placeholder={
                          field?.value.length === 0 ? "اضافه کردن" : ""
                        }
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addChip();
                          }
                        }}
                        sx={{
                          flex: 1,
                          minWidth: 120,
                        }}
                      />
                    </Box>
                  </FormControl>
                );
              }}
            />
          )}
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
    </>
  );
};
export { ParameterForm };
