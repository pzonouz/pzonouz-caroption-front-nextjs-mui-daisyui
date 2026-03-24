import { invoiceItemType } from "@/app/schemas";
import { FormatNumber } from "@/app/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Iinvoice {
  newRow: invoiceItemType | null;
  existingRows: invoiceItemType[];
}

const initialState: Iinvoice = {
  newRow: null,
  existingRows: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addNewRow: (state, action: PayloadAction<invoiceItemType>) => {
      state.existingRows = [...state?.existingRows, action.payload];
    },
    setRows: (state, action: PayloadAction<invoiceItemType[]>) => {
      state.existingRows = action.payload;
    },
    updateRows: (state, action: PayloadAction<invoiceItemType>) => {
      const rows = [...state?.existingRows];
      const existingRowIndex = rows.findIndex(
        (i) => i?.productId == action?.payload?.productId,
      );
      if (existingRowIndex == -1) return;
      rows[existingRowIndex] = {
        productId: action?.payload?.productId,
        price: action?.payload?.price,
        count: action?.payload?.count,
        discount: action?.payload?.discount,
      };
      state.existingRows = rows;
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.existingRows = state?.existingRows.filter(
        (r) => r.productId != action?.payload,
      );
    },
  },
});

export const { addNewRow, updateRows, setRows, deleteRow } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
