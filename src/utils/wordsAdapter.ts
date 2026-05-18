import { Word } from "@/types/types";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const wordsAdapter = createEntityAdapter<Word>();
