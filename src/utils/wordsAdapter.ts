import type { Word } from "@/types/types";
import { createEntityAdapter } from "@reduxjs/toolkit";

const wordsAdapter = createEntityAdapter<Word>();

export default wordsAdapter;
