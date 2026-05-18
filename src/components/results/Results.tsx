'use client';

import { selectIsReadOnly } from "@/lib/features/controlSlice";
import { selectLanguage } from "@/lib/features/languageSlice";
import { selectResults } from "@/lib/features/resultsSlice";
import { useAppSelector } from "@/lib/hooks";


function Results() {

  const isReadOnly = useAppSelector(selectIsReadOnly);
  const results = useAppSelector(selectResults);
  const lang = useAppSelector(selectLanguage);
  const isEn = lang === 'english' ? true : false;
  const effKey = results.effectiveKeystrokes;
  const wpm = Math.round(effKey / 5);

  return (isReadOnly &&
    <div id='results'>
      <div id="wpm-result">
        {isEn ? <>
        <div className="wpm correct-typing">{wpm} WPM</div>
        <div className="words-per-minute">{wpm} Words Per Minute</div>
        </> : <>
        <div className="wpm correct-typing">Dakikada {wpm} Kelime</div>
        <div className="words-per-minute">{wpm} WPM</div>
        </>}
      </div>
      <div id="typing-results">
        <div>
          {isEn ? 'Correct Words: ' : 'Doğru Kelime: '}<span className='correct-typing'>{results.correctWords}</span>
        </div>
        <div>
          {isEn ? 'Wrong Words: ' : 'Yanlış Kelime: '}<span className="failure-typing">{results.wrongWords}</span>
        </div>
        <div>
          {isEn ? 'Effective Keystrokes: ' : 'Faydalı Tuşlama: '}<span className='correct-typing'>{effKey}</span>
        </div>
      </div>
    </div>
  );

}

export default Results;
