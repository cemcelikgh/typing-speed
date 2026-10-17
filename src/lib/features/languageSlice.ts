import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

type Lang = 'english' | 'turkish';

export const languageSlice = createSlice({
  name: 'language',
  initialState: 'english' satisfies Lang as Lang,
  reducers: {
    setLanguage: (_state, action: PayloadAction<Lang>) => action.payload,
  },
});

export const setLanguage = languageSlice.actions.setLanguage;
export const selectLanguage = (state: RootState) => state.language;

export default languageSlice.reducer;
