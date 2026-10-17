import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { mode: Theme | undefined } = { mode: undefined };

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
    },
  },
});

export const setTheme = themeSlice.actions.setTheme;
export const selectTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
