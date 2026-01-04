import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISnackbar {
  open: Boolean;
  severity: AlertColor | null;
  message: string;
}

const initialState: ISnackbar = {
  open: false,
  severity: null,
  message: "",
};

export const snackbarSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSnackbarOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setSnackbarSeverity: (state, action: PayloadAction<AlertColor>) => {
      state.severity = action.payload;
    },
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
