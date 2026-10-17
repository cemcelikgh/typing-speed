import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "./features/controlsSlice";
import languageReducer from "./features/languageSlice";
import resultsReducer from "./features/resultsSlice";
import themeReducer from "./features/themeSlice";
import wordsReducer from "./features/wordsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      language: languageReducer,
      words: wordsReducer,
      controls: controlsReducer,
      results: resultsReducer,
      theme: themeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
