import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema, personType } from "@/app/schemas";
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
import { useSnackbarOpen } from "@/app/lib/CustomHooks/useSnackbarOpen";
import { useCreatePersonMutation, useEditPersonMutation } from "@/app/lib/api";

const PersonForm = ({ person }: { person?: personType }) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<personType>({
    resolver: zodResolver(personSchema),
    values: person ?? {
      firstName: "",
      name: "",
      address: "",
      phoneNumber: "",
    },
  });

  const dispatch = useAppDispatch();
  const snackbarOpen = useSnackbarOpen();
  const [createperson, { isLoading }] = useCreatePersonMutation();
  const [editperson] = useEditPersonMutation();
  const personHandler = (data: personType) => {
    if (person) {
      editperson({ id: person?.id, ...data })
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          dispatch(setModalOpen(false));
        })
        .catch((err) => {
          snackbarOpen({ status: "error", message: translateErrors(err) });
        });
    } else {
      createperson(data)
        .unwrap()
        .then(() => {
          snackbarOpen({ status: "success" });
          reset({ firstName: "", name: "", address: "", phoneNumber: "" });
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
      onSubmit={handleSubmit(personHandler)}
    >
      <Box className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام"
              error={!!errors?.firstName}
              size="small"
              helperText={errors?.firstName?.message}
              className="w-full"
            />
          )}
        ></Controller>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام خانوادگی"
              error={!!errors?.name}
              size="small"
              helperText={errors?.name?.message}
              className="w-full"
            />
          )}
        ></Controller>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="آدرس"
              error={!!errors?.address}
              size="small"
            />
          )}
        ></Controller>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="شماره تماس"
              error={!!errors?.phoneNumber}
              size="small"
            />
          )}
        ></Controller>
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
    </Box>
  );
};
export { PersonForm };
