'use client';

import { selectIsStart, selectReset, setIsReadOnly, setIsStart }
  from "@/lib/features/controlsSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import { setCompletedWords } from "@/lib/features/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import styles from './Timer.module.css';

function Timer() {

  const [seconds, setSeconds] = useState(60);

  const isStart = useAppSelector(selectIsStart);
  const language = useAppSelector(selectLanguage);
  const reset = useAppSelector(selectReset);

  const secondsIntIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstRender = useRef(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isStart) {
      secondsIntIdRef.current = setInterval(()=> {
      setSeconds(secs => secs - 1);
      }, 1000);
    }
    return () => {
      if (secondsIntIdRef.current) clearInterval(secondsIntIdRef.current);
    }
  }, [isStart]);

  useEffect(() => {
    if (seconds === 0) {
      dispatch(setIsReadOnly(true));
      dispatch(setIsStart(false));
      dispatch(setCompletedWords());
    }
  }, [seconds, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setSeconds(60);
    dispatch(setIsReadOnly(false));
    dispatch(setIsStart(false));
  }, [language, dispatch]);

  useEffect(() => {
    if (reset === 0) return;
    setSeconds(60);
  }, [reset]);

  return (
    <div
      className={styles.timer}
      title={language === 'english' ? 'Timer' : 'Kronometre'}
    >
      { seconds < 10 ? `00:0${seconds}`
      : seconds < 60 ? '00:' + seconds
      : '01:00' }
    </div>
  );

}

export default Timer;
