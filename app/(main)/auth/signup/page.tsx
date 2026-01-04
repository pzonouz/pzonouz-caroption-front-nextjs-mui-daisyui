"use client";

import { useSignupMutation } from "@/app/lib/api";
import { translateErrors } from "@/app/lib/errorProcess";
import { signupSchema, signupType } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [snackBarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [signup, { isLoading }] = useSignupMutation();
  const signupHandler = (data: signupType) => {
    signup(data)
      .unwrap()
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("با موفقیت انجام شد");
        setOpen(true);
      })
      .catch((err) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(translateErrors(err) ?? "");
        setOpen(true);
      });
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar open={open}>
        <Alert
          action={action}
          severity={snackBarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        className="mt-20 p-5"
        component="form"
        onSubmit={handleSubmit(signupHandler)}
      >
        <Typography>ایجاد کاربر</Typography>
        <Box className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <TextField
            {...register("email")}
            label="ایمیل"
            error={!!errors?.email}
            size="small"
            helperText={errors?.email?.message}
          />
          <TextField
            type="password"
            {...register("password")}
            label="پسورد"
            error={!!errors?.password}
            size="small"
            helperText={errors?.password?.message}
          />
          <TextField
            type="password"
            {...register("confirmPassword")}
            label="تایید پسورد"
            error={!!errors?.confirmPassword}
            size="small"
            helperText={errors?.confirmPassword?.message}
          />
          <Button
            type="submit"
            loading={isLoading}
            variant="contained"
            className="w-full"
          >
            ثبت
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default page;
