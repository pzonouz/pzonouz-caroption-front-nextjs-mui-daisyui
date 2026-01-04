"use client";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setSnackbarOpen } from "@/app/lib/features/snackbar";

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const disptch = useAppDispatch();
  const open = useAppSelector((state) => state?.snackbar.open);
  const snackBarSeverity = useAppSelector((state) => state?.snackbar.severity);
  const snackbarMessage = useAppSelector((state) => state?.snackbar.message);
  const action = (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => disptch(setSnackbarOpen(false))}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      {children}
      <Snackbar open={Boolean(open)}>
        <Alert
          action={action}
          severity={snackBarSeverity ?? "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export { SnackbarProvider };
