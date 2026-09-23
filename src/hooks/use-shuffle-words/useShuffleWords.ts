'use client';

import { nanoid } from "@reduxjs/toolkit";
import { selectLanguage } from "@/lib/features/languageSlice";
import { selectReset } from "@/lib/features/controlsSlice";
import { setWords } from "@/lib/features/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import wordsAdapter from "@/utils/wordsAdapter";
import wordLists from "@/hooks/use-shuffle-words/wordLists";
import wordStyles from '@/components/words/word/Word.module.css';

// Fisher-Yates algorithm
function shuffle(words: string[]) {
  const arr = [...words];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  return arr;
}

function shuffleWords(words: string[]) {
  return [...shuffle(words), ...shuffle(words)];
}

function generateWords(shuffledWords: string[]) {
  return shuffledWords.map((word, index) => ({
    word,
    id: nanoid(),
    status: index === 0 ? wordStyles.focused : wordStyles['in-line'],
    display: true,
  }));
}

function useShuffleWords() {

  const language = useAppSelector(selectLanguage);
  const reset = useAppSelector(selectReset);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const selectedWords = wordLists[language];
    const shuffledWords = shuffleWords(selectedWords);
    const words = generateWords(shuffledWords);
    const wordsInitialShape = wordsAdapter.getInitialState();
    const wordsState = wordsAdapter.setAll(wordsInitialShape, words);
    dispatch(setWords(wordsState));
  }, [language, reset, dispatch]);

}

export default useShuffleWords;
