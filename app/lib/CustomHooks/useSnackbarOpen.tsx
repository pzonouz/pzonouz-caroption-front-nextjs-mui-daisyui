import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "../features/snackbar";
import { useAppDispatch } from "../hooks";

export const useSnackbarOpen = () => {
  const dispatch = useAppDispatch();

  return ({
    status,
    message,
  }: {
    status: "success" | "error";
    message?: string;
  }) => {
    dispatch(setSnackbarSeverity(status));
    dispatch(
      setSnackbarMessage(
        message ||
          (status === "success" ? "با موفقیت انجام شد" : "با شکست مواجه شد"),
      ),
    );
    dispatch(setSnackbarOpen(true));
  };
};
