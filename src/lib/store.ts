import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./features/wordsSlice";
import languageReducer from "./features/languageSlice";
import controlReducer from "./features/controlSlice";
import resultsReducer from "./features/resultsSlice";
import themeReducer from "./features/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      language: languageReducer,
      words: wordsReducer,
      control: controlReducer,
      results: resultsReducer,
      theme: themeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
