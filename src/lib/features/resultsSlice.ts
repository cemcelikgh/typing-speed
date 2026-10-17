import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Results {
  correctWords: number;
  wrongWords: number;
  effectiveKeystrokes: number;
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    correctWords: 0,
    wrongWords: 0,
    effectiveKeystrokes: 0,
  },
  reducers: {
    setResults: (_state, action: PayloadAction<Results>) => action.payload,
  },
});

export const setResults = resultsSlice.actions.setResults;
export const selectResults = (state: RootState) => state.results;

export default resultsSlice.reducer;
