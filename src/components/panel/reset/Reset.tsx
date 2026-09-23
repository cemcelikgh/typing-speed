'use client';

import { resetTest } from "@/lib/features/controlsSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ClockRotateLeft from "./ClockRotateLeft";
import styles from './Reset.module.css';

function Reset() {

  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.reset}
      onClick={ () => { dispatch(resetTest()) } }
      title={language === 'english' ? 'Reset' : 'Yenile'}
    >
      <ClockRotateLeft className={styles['reset-icon']} />
    </div>
  );

}

export default Reset;
