'use client';

import type { ChangeEvent } from 'react';
import { selectIds, selectWord, setRemainedWords, setWordStatus }
  from '@/lib/features/wordsSlice';
import { selectIsReadOnly, selectIsStart, selectReset, setIsStart }
  from '@/lib/features/controlsSlice';
import { selectLanguage } from '@/lib/features/languageSlice';
import { setResults } from '@/lib/features/resultsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import wordStyles from '@/components/words/word/Word.module.css';
import styles from './Typing.module.css';

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

  const finalizeTyping = useEffectEvent(() => {
    if (focusedWord.status === 'focused') {
      if (inputValue.length > 0) { 
        dispatch(setWordStatus({ id: focusedWord.id, status:'inc-suc' }));
      } else {
        dispatch(setWordStatus({ id: focusedWord.id, status:'no-disp' }));
      }
    } else if (focusedWord.status === 'failure') {
      dispatch(setWordStatus({ id: focusedWord.id, status: 'inc-fai' }));
    }
    dispatch(setResults({
      correctWords: correctWords.current,
      wrongWords: wrongWords.current,
      effectiveKeystrokes: effectiveKeystrokes.current,
    }));
  });

  useEffect(() => { if (isReadOnly) finalizeTyping() }, [isReadOnly, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setInputValue('');
    setFocusedWordIndex(0);
    correctWords.current = 0;
    wrongWords.current = 0;
    effectiveKeystrokes.current = 0;
  }, [language, reset]);

  function handleTyping(event: ChangeEvent<HTMLInputElement>) {

    if (!isStart) dispatch(setIsStart(true));

    const typedValue = event.currentTarget.value;
    setInputValue(typedValue);

    const tVL = typedValue.length;

    if (typedValue.slice(0, tVL) === focusedWord.word.slice(0, tVL)) {
      if (focusedWord.status === "failure") {
        dispatch(setWordStatus({ id: focusedWord.id, status: "focused" }));
      }
    } else {
      dispatch(setWordStatus({ id: focusedWord.id, status: "failure" }));
    }

    if (/ $/.test(typedValue)) {
      if (typedValue.slice(0, -1) === focusedWord.word) {
        dispatch(setWordStatus({ id: focusedWord.id, status: "success" }));
        setFocusedWordIndex(focusedWordIndex + 1);
        correctWords.current++;
        effectiveKeystrokes.current += focusedWord.word.length + 1;
      } else {
        dispatch(setWordStatus({ id: focusedWord.id, status: "failure" }));
        setFocusedWordIndex(focusedWordIndex + 1);
        wrongWords.current++;
      }
      dispatch(setWordStatus({ id: nextFocusedWord.id, status: "focused" }));
      setInputValue('');

      const divs = document.querySelectorAll<HTMLDivElement>('.' + wordStyles.word);
      const firstRowTop = divs[0].offsetTop;
      const firstRowDivs = [...divs].filter(div => div.offsetTop === firstRowTop);
      if (focusedWord.id === firstRowDivs.at(-1)?.id) dispatch(setRemainedWords());
    }

  }

  return (
    <input
      className={styles['typing-input']}
      type='text'
      value={inputValue}
      readOnly={isReadOnly}
      onChange={handleTyping}
      autoComplete='off'
      spellCheck='false'
      title={language === 'english' ? 'Typing' : 'Tuşlama'}
    />
  );

}

export default Typing;
