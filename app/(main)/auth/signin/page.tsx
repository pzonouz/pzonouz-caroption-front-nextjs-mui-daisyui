"use client";
import { useSigninMutation } from "@/app/lib/api";
import CloseIcon from "@mui/icons-material/Close";
import { translateErrors } from "@/app/lib/errorProcess";
import { signinSchema, signinType } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinType>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [snackBarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [signin, { isLoading }] = useSigninMutation();
  const router = useRouter();
  const signinHandler = (data: signinType) => {
    signin(data)
      .unwrap()
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("با موفقیت انجام شد");
        setOpen(true);
        router.push("/profile");
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
        onSubmit={handleSubmit(signinHandler)}
      >
        <Typography>ورود</Typography>
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
