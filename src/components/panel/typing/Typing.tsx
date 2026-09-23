'use client';

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { selectIds, selectWord, setRemainedWords, setWord }
  from "@/lib/features/wordsSlice";
import { selectIsReadOnly, selectIsStart, selectReset, setIsStart }
  from "@/lib/features/controlsSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import { setResults } from "@/lib/features/resultsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from './Typing.module.css';
import wordStyles from '@/components/words/word/Word.module.css';

function Typing() {

  const [inputValue, setInputValue] = useState('');
  const [focusedWordIndex, setFocusedWordIndex] = useState(0);

  const ids = useAppSelector(selectIds);
  const isStart = useAppSelector(selectIsStart);
  const isReadOnly = useAppSelector(selectIsReadOnly);
  const reset = useAppSelector(selectReset);
  const language = useAppSelector(selectLanguage);
  const focusedWord = useAppSelector(selectWord(ids[focusedWordIndex]));
  const nextFocusedWord = useAppSelector(selectWord(ids[focusedWordIndex + 1]));

  const isFirstRender = useRef(true);
  const effectiveKeystrokes = useRef(0);
  const correctWords = useRef(0);
  const wrongWords = useRef(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReadOnly) {

      if (focusedWord.status === wordStyles.focused) {
        if (inputValue.length > 0) {
          dispatch(setWord({ id: focusedWord.id, status: wordStyles['inc-suc'] }));
        } else {
          dispatch(setWord({ id: focusedWord.id, status: wordStyles['no-disp'] }));
        }
      } else if (focusedWord.status === wordStyles.failure) {
        dispatch(setWord({ id: focusedWord.id, status: wordStyles['inc-fai'] }));
      }

      dispatch(setResults({
        correctWords: correctWords.current,
        wrongWords: wrongWords.current,
        effectiveKeystrokes: effectiveKeystrokes.current,
      }));

    }
  }, [isReadOnly, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setInputValue('');
    setFocusedWordIndex(0);
    correctWords.current = 0;
    wrongWords.current = 0;
    effectiveKeystrokes.current = 0;
  }, [language, reset]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {

    if (!isStart) dispatch(setIsStart(true));

    const typedValue = event.currentTarget.value;
    setInputValue(typedValue);

    const tVL = typedValue.length;

    if (typedValue.slice(0, tVL) === focusedWord.word.slice(0, tVL)) {
      if (focusedWord.status === wordStyles.failure) {
        dispatch(setWord({ id: focusedWord.id, status: wordStyles.focused }));
      }
    } else {
      dispatch(setWord({ id: focusedWord.id, status: wordStyles.failure }));
    }

    if (/ $/.test(typedValue)) {
      if (typedValue.slice(0, -1) === focusedWord.word) {
        dispatch(setWord({ id: focusedWord.id, status: wordStyles.success }));
        setFocusedWordIndex(focusedWordIndex + 1);
        correctWords.current++;
        effectiveKeystrokes.current += focusedWord.word.length + 1;
      } else {
        dispatch(setWord({ id: focusedWord.id, status: wordStyles.failure }));
        setFocusedWordIndex(focusedWordIndex + 1);
        wrongWords.current++;
      }
      dispatch(setWord({ id: nextFocusedWord.id, status: wordStyles.focused }));
      setInputValue('');

      const divs = document.querySelectorAll<HTMLDivElement>('.' + wordStyles.word);
      const firstRowTop = divs[0].offsetTop;
      const firstRowDivs = [...divs].filter(div => div.offsetTop === firstRowTop);
      if (focusedWord.id === firstRowDivs.at(-1)?.id) dispatch(setRemainedWords());
    }

  }

  return (
    <input
      type='text'
      className={styles['typing-input']}
      value={inputValue}
      readOnly={isReadOnly}
      onChange={handleChange}
      autoComplete='off'
      spellCheck='false'
      title={language === 'english' ? 'Typing' : 'Tuşlama'}
    />
  );

}

export default Typing;
