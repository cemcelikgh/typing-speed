import { english, turkish } from "@/hooks/use-shuffle-words/wordLists";

export type Theme = 'green' | 'blue' | 'light' | 'dark';

type EnglishWord = typeof english[number];

type TurkishWord = typeof turkish[number];

export type WordList = readonly EnglishWord[] | readonly TurkishWord[];

export type WordValue = EnglishWord | TurkishWord;

export type WordStatus = "focused" | "in-line" | "success" | "inc-suc" | "failure" | "inc-fai" | "no-disp";

export interface Word {
  word: WordValue;
  id: string;
  status: WordStatus;
  display: boolean;
}

export type Words = Word[];
