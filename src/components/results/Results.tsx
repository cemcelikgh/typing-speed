'use client';

import { selectIsReadOnly } from "@/lib/features/controlSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import { selectResults } from "@/lib/features/resultsSlice";
import { useAppSelector } from "@/lib/hooks";
import styles from './Results.module.css';

function Results() {

  const isReadOnly = useAppSelector(selectIsReadOnly);
  const results = useAppSelector(selectResults);
  const lang = useAppSelector(selectLanguage);
  const isEn = lang === 'english' ? true : false;
  const effKey = results.effectiveKeystrokes;
  const wpm = Math.round(effKey / 5);

  return (isReadOnly &&
    <section className={styles.results}>
      <div className={styles["wpm-result"]}>
        {isEn ? <>
        <div className={`${styles.wpm} ${styles["correct-typing"]}`}>{wpm} WPM</div>
        <div className={styles["words-per-minute"]}>{wpm} Words Per Minute</div>
        </> : <>
        <div className={`${styles.wpm} ${styles["correct-typing"]}`}>Dakikada {wpm} Kelime</div>
        <div className={styles["words-per-minute"]}>{wpm} WPM</div>
        </>}
      </div>
      <div className={styles["typing-results"]}>
        <div>
          {isEn ? 'Correct Words: ' : 'Doğru Kelime: '}<span className={styles["correct-typing"]}>{results.correctWords}</span>
        </div>
        <div>
          {isEn ? 'Wrong Words: ' : 'Yanlış Kelime: '}<span className={styles["failure-typing"]}>{results.wrongWords}</span>
        </div>
        <div>
          {isEn ? 'Effective Keystrokes: ' : 'Faydalı Tuşlama: '}<span className={styles["correct-typing"]}>{effKey}</span>
        </div>
      </div>
    </section>
  );

}

export default Results;
