import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    isStart: false,
    isReadOnly: false,
    reset: false,
  },
  reducers: {
    setIsStart : (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload;
    },
    setIsReadOnly : (state, action: PayloadAction<boolean>) => {
      state.isReadOnly = action.payload;
    },
    setReset : (state, action: PayloadAction<boolean>) => {
      state.reset = action.payload;
    },
  },
});

export const { setIsStart, setIsReadOnly, setReset } = controlSlice.actions;
export const selectIsStart = (state: RootState) => state.control.isStart;
export const selectIsReadOnly = (state: RootState) => state.control.isReadOnly;
export const selectReset = (state: RootState) => state.control.reset;
export default controlSlice.reducer;
