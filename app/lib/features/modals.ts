import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "Edit" | "Delete" | null;
export interface Modal {
  open: Boolean;
  type: ModalType;
  id: string;
}

const initialState: Modal = {
  open: false,
  type: null,
  id: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<Boolean>) => {
      state.open = action.payload;
    },
    setModalId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setModalType: (state, action: PayloadAction<ModalType>) => {
      state.type = action.payload;
    },
  },
});

export const { setModalOpen, setModalId, setModalType } = modalSlice.actions;
export default modalSlice.reducer;
