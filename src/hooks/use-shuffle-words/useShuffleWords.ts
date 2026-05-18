'use client';

import { selectLanguage } from "@/lib/features/languageSlice";
import wordList from "@/hooks/use-shuffle-words/wordLists";
import { setWords } from "@/lib/features/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { selectReset } from "@/lib/features/controlSlice";
import { wordsAdapter } from "@/utils/wordsAdapter";

//  Fisher-Yates algorithm
function shuffle(array: string[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  return arr;
}

function shuffleWordArray(array: string[]) {
  const arr1 = shuffle(array);
  const arr2 = shuffle(array);
  return [...arr1, ...arr2];
}

function generateWordObjectArray(shuffledWordArray: string[]) {
  return shuffledWordArray.map((word, index) => (
    {
      word,
      id: nanoid(),
      status: index === 0 ? 'focused' : 'in-line',
      display: true,
    }
  ));
}

function useShuffleWords() {

  const language = useAppSelector(selectLanguage);
  const reset = useAppSelector(selectReset);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reset === true) return;
    const languageArray = wordList[language];
    const shuffledWordArray = shuffleWordArray(languageArray);
    const wordObjectArray = generateWordObjectArray(shuffledWordArray);
    const wordsInitialShape = wordsAdapter.getInitialState();
    const wordsState = wordsAdapter.setAll(wordsInitialShape, wordObjectArray);
    dispatch(setWords(wordsState));
  }, [language, reset, dispatch]);

}

export default useShuffleWords;
