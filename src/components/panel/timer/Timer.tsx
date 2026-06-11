'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import { selectIsStart, selectReset, setIsReadOnly, setIsStart, setReset }
  from "@/lib/features/controlSlice";
import { setCompletedWords } from "@/lib/features/wordsSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import styles from './Timer.module.css';

function Timer() {

  const [seconds, setSeconds] = useState(60);
  const [aMinute, setAMinute] = useState(1);
  const language = useAppSelector(selectLanguage);
  const isStart = useAppSelector(selectIsStart);
  const reset = useAppSelector(selectReset);
  const secondsIntIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const aMinuteIntIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstRender = useRef(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isStart) {
      secondsIntIdRef.current = setInterval(()=> {
      setSeconds(secs => secs - 1);
      }, 1000);
      aMinuteIntIdRef.current = setInterval(()=> {
      setAMinute(min => min - 1);
      }, 60000);
    }
    return () => {
      if (secondsIntIdRef.current) clearInterval(secondsIntIdRef.current);
      if (aMinuteIntIdRef.current) clearInterval(aMinuteIntIdRef.current);
    }
  }, [isStart]);

  useEffect(() => {
    if (aMinute === 0) {
      dispatch(setIsReadOnly(true));
      dispatch(setIsStart(false));
      dispatch(setCompletedWords());
    }
  }, [aMinute, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setSeconds(60);
    setAMinute(1);
    dispatch(setIsReadOnly(false));
    dispatch(setIsStart(false));
    dispatch(setReset(false));
  }, [language, dispatch]);

  useEffect(() => {
    if (reset) {
    setSeconds(60);
    setAMinute(1);
    dispatch(setIsReadOnly(false));
    dispatch(setIsStart(false));
    dispatch(setReset(false));
    }
  }, [reset, dispatch]);

  return (
    <div className={styles.timer} title={language === 'english' ? 'Timer' : 'Kronometre'}>
      { seconds === 60 ? '01:00'
      : seconds > 9 ? '00:' + seconds
      : `00:0${seconds}`}
    </div>
  );

}

export default Timer;
