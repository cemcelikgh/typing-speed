import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Word } from "@/types/types";
import wordsAdapter from "@/utils/wordsAdapter";
import wordStyles from '@/components/words/word/Word.module.css';

interface WordStatus {
  id: string;
  status: string;
}

const initialState = wordsAdapter.getInitialState();

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (_state, action: PayloadAction<EntityState<Word, string>>) => action.payload,
    setWord: (state, action: PayloadAction<WordStatus>) => {
      state.entities[action.payload.id].status = action.payload.status;
    },
    setRemainedWords: state => {
      const remainedWords = state.ids.map(id => {
        const word = state.entities[id];
        const wordStatus = word.status;
        if (wordStatus !== wordStyles['in-line']) {
          return {
            ...word,
            display: wordStatus === wordStyles.focused,
          };
        } else return word;
      });
      wordsAdapter.setAll(state, remainedWords);
    },
    setCompletedWords: state => {
      const completedWords = state.ids.reduce<Word[]>((acc, id) => {
        const word = state.entities[id];
        if (word.status !== wordStyles['in-line']) {
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

export const { setWords, setWord, setCompletedWords, setRemainedWords } = wordsSlice.actions;

export const selectIds = (state: RootState) => state.words.ids;
export const selectWord = (id: string) => (state: RootState) => state.words.entities[id];

export default wordsSlice.reducer;
