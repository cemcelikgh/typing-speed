import { createEntityAdapter } from "@reduxjs/toolkit";
import { Word } from "@/types/types";

const wordsAdapter = createEntityAdapter<Word>();

export default wordsAdapter;
