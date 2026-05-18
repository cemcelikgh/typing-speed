import { createSlice, PayloadAction }
  from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { EntityState } from "@reduxjs/toolkit";
import { wordsAdapter } from "@/utils/wordsAdapter";
import { Word } from "@/types/types";

interface WordStatus {
  id: string;
  status: 'in-line' | 'focused' | 'success' | 'failure' | 'inc-suc' | 'inc-fai' | 'no-disp';
}

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords:
      (_state, action: PayloadAction<EntityState<Word, string>>) => {
        return action.payload;
      },
    setWord: (state, action: PayloadAction<WordStatus>) => {
      state.entities[action.payload.id].status = action.payload.status;
    },
    setRemainedWords: state => {
      const remainedWords = state.ids.reduce<Word[]>((acc, id) => {
        const entity = state.entities[id];
        const status = entity.status;
        if (status !== 'in-line') {
          acc.push({
            ...entity,
            display: status !== 'focused' ? false : true,
          });
        } else acc.push(entity);
        return acc;
      }, []);
      wordsAdapter.setAll(state, remainedWords);
    },
    setCompletedWords: state => {
      const completedWords = state.ids.reduce<Word[]>((acc, id) => {
        const entity = state.entities[id];
        if (entity.status !== 'in-line') {
          acc.push({
            ...entity,
            display: true,
          });
        }
        return acc;
      }, []);
      wordsAdapter.setAll(state, completedWords);
    },
  },
});

export const { setWords, setWord, setCompletedWords, setRemainedWords } = wordsSlice.actions;
export const selectIds = (state: RootState) => state.words.ids;
export const selectEntities = (state: RootState) => state.words.entities;
export default wordsSlice.reducer;
