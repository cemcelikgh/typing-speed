'use client';

import { selectIds } from "@/lib/features/wordsSlice";
import { useAppSelector } from "@/lib/hooks";
import useShuffleWords from "@/hooks/use-shuffle-words/useShuffleWords";
import Word from './word/Word';
import { selectIsReadOnly } from "@/lib/features/controlSlice";

function Words() {
  
  useShuffleWords();

  const ids = useAppSelector(selectIds);
  const isReadOnly = useAppSelector(selectIsReadOnly);

  return (
    <section id="words" className={isReadOnly ? 'typed-words': undefined}>
      {ids.map(id => <Word id={id} key={id} />)}
    </section>
  );

}

export default Words;
