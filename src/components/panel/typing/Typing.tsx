'use client';

import { selectIsReadOnly, selectIsStart, selectReset, setIsStart }
  from "@/lib/features/controlSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import { setResults } from "@/lib/features/resultsSlice";
import { selectEntities, selectIds, setRemainedWords, setWord }
  from "@/lib/features/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function Typing() {

  const dispatch = useAppDispatch();
  const [ inputValue, setInputValue ] = useState('');
  const ids = useAppSelector(selectIds);
  const entities = useAppSelector(selectEntities);
  const isStart = useAppSelector(selectIsStart);
  const isReadOnly = useAppSelector(selectIsReadOnly);
  const reset = useAppSelector(selectReset);
  const language = useAppSelector(selectLanguage);
  const isFirstRender = useRef(true);
  const focusedWordIndex = useRef(0);
  const focusedWord = entities[ids[focusedWordIndex.current]];
  const effectiveKeystrokes = useRef(0);
  const correctWords = useRef(0);
  const wrongWords = useRef(0);

  useEffect(() => {
    if (isReadOnly || reset) {
      dispatch(setResults({
        correctWords: correctWords.current,
        wrongWords: wrongWords.current,
        effectiveKeystrokes: effectiveKeystrokes.current,
      }));
      correctWords.current = 0;
      wrongWords.current = 0;
      effectiveKeystrokes.current = 0;
      focusedWordIndex.current = 0;
      if (isReadOnly) {
        if (focusedWord.status === 'focused') {
          if (inputValue.length > 0) {
            dispatch(setWord({ id: focusedWord.id, status: 'inc-suc' }));
          } else {
            dispatch(setWord({ id: focusedWord.id, status: 'no-disp' }));
          }
        }
        if (focusedWord.status === 'failure') {
          dispatch(setWord({ id: focusedWord.id, status: 'inc-fai' }));
        }
      }
    }
    if (!isReadOnly && inputValue !== '') setInputValue('');
  }, [isReadOnly, reset, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    correctWords.current = 0;
    wrongWords.current = 0;
    effectiveKeystrokes.current = 0;
    focusedWordIndex.current = 0;
    setInputValue('');
  }, [language]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {

    if (!isStart) dispatch(setIsStart(true));

    const typedValue = event.currentTarget.value;
    setInputValue(typedValue);

    const tVL = typedValue.length;

    if (typedValue.slice(0, tVL) === focusedWord.word.slice(0, tVL)) {
      if (focusedWord.status === 'failure') {
        dispatch(setWord({ id: focusedWord.id, status: 'focused' }));
      }
    } else {
      dispatch(setWord({ id: focusedWord.id, status: 'failure' }));
    }

    if (/ $/.test(typedValue)) {
      if (typedValue.slice(0, -1) === focusedWord.word) {
        dispatch(setWord({ id: focusedWord.id, status: 'success' }));
        focusedWordIndex.current++;
        correctWords.current++;
        effectiveKeystrokes.current += focusedWord.word.length + 1;
      } else {
        dispatch(setWord({ id: focusedWord.id, status: 'failure' }));
        focusedWordIndex.current++;
        wrongWords.current++;
      }
      const nextFocusedWord = entities[ids[focusedWordIndex.current]];
      dispatch(setWord({ id: nextFocusedWord.id, status: 'focused' }));
      setInputValue('');

      const divs = document.querySelectorAll<HTMLDivElement>('.word');
      const firstRowTop = divs[0].offsetTop;
      const firstRowDivs = [...divs].filter(div => div.offsetTop === firstRowTop);
      if (focusedWord.id === firstRowDivs.at(-1)?.id) {
        dispatch(setRemainedWords());
      }
    }

  }

  return (
    <input id="typing-input"
      type="text"
      autoComplete='off'
      spellCheck='false'
      value={inputValue}
      readOnly={isReadOnly}
      onChange={handleChange}
      title={language === 'english' ? 'Typing' : 'Tuşlama'}
    />
  );

}

export default Typing;
