'use client';

import type { WordList, Words, WordValue } from "@/types/types";
import { nanoid } from "@reduxjs/toolkit";
import { selectLanguage } from "@/lib/features/languageSlice";
import { selectReset } from "@/lib/features/controlsSlice";
import { setWords } from "@/lib/features/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import wordLists from "@/hooks/use-shuffle-words/wordLists";
import wordsAdapter from "@/utils/wordsAdapter";

// Fisher-Yates algorithm
function shuffle(words: WordList) {
  const arr = [...words];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleWords(words: WordList) {
  return [...shuffle(words), ...shuffle(words)];
}

function generateWords(shuffledWords: WordValue[]): Words {
  return shuffledWords.map((word, index) => ({
    word,
    id: nanoid(),
    status: index === 0 ? "focused" : 'in-line',
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
