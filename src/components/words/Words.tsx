'use client';

import { selectIds } from "@/lib/features/wordsSlice";
import { selectIsReadOnly } from "@/lib/features/controlsSlice";
import { useAppSelector } from "@/lib/hooks";
import Word from './word/Word';
import useShuffleWords from "@/hooks/use-shuffle-words/useShuffleWords";
import styles from './Words.module.css';

function Words() {

  useShuffleWords();

  const ids = useAppSelector(selectIds);
  const isReadOnly = useAppSelector(selectIsReadOnly);

  return (
    <section className={`${styles.words}${isReadOnly ? ' ' + styles['typed-words'] : ''}`}>
      {ids.map(id =>
      <Word id={id} key={id} />)}
    </section>
  );

}

export default Words;
