'use client';

import { selectWord } from '@/lib/features/wordsSlice';
import { useAppSelector } from '@/lib/hooks';
import styles from './Word.module.css';

function Word({ id }: { id: string }) {

  const word = useAppSelector(selectWord(id));

  return (word.display &&
    <div
      className={`${styles.word} ${word.status}`}
      id={id}
    >
      {word.word}
    </div>
  );

}

export default Word;
