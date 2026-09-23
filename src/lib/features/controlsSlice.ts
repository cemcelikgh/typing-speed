import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    isStart: false,
    isReadOnly: false,
    resetTrigger: 0,
  },
  reducers: {
    setIsStart: (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload;
    },
    setIsReadOnly: (state, action: PayloadAction<boolean>) => {
      state.isReadOnly = action.payload;
    },
    resetTest: state => {
      state.resetTrigger++;
      state.isReadOnly = false;
      state.isStart = false;
    },
  },
});

export const { setIsStart, setIsReadOnly, resetTest } = controlsSlice.actions;

export const selectIsStart = (state: RootState) => state.controls.isStart;
export const selectIsReadOnly = (state: RootState) => state.controls.isReadOnly;
export const selectReset = (state: RootState) => state.controls.resetTrigger;

export default controlsSlice.reducer;
