import type { EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Word, Words, WordStatus } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import wordsAdapter from "@/utils/wordsAdapter";

interface WordStatusPayload {
  id: string;
  status: WordStatus;
}

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (_state, action: PayloadAction<EntityState<Word, string>>) => action.payload,
    setWordStatus: (state, action: PayloadAction<WordStatusPayload>) => {
      state.entities[action.payload.id].status = action.payload.status;
    },
    setRemainedWords: state => {
      const remainedWords = state.ids.map(id => {
        const word = state.entities[id];
        if (word.status !== 'in-line') {
          return {
            ...word,
            display: word.status === "focused",
          };
        } else return word;
      });
      wordsAdapter.setAll(state, remainedWords);
    },
    setCompletedWords: state => {
      const completedWords = state.ids.reduce<Words>((acc, id) => {
        const word = state.entities[id];
        if (word.status !== 'in-line') {
          acc.push({
            ...word,
            display: true,
          });
        }
        return acc;
      }, []);
      wordsAdapter.setAll(state, completedWords);
    },
  },
});

export const { setWords, setWordStatus, setCompletedWords, setRemainedWords } = wordsSlice.actions;

export const selectIds = (state: RootState) => state.words.ids;
export const selectWord = (id: string) => (state: RootState) => state.words.entities[id];

export default wordsSlice.reducer;
