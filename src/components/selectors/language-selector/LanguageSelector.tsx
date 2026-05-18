'use client'

import { selectLanguage, setLanguage } from "@/lib/features/languageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChangeEvent } from "react";

function LanguageSelector() {

  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  function handleLang(event: ChangeEvent<HTMLSelectElement>) {
    const language = event.target.value;
    const lang = language === 'english' ? 'english' : 'turkish';
    dispatch(setLanguage(lang));
  }

  return (
    <select id="language-selector" value={language} onChange={handleLang}>
      <option key='1' value='english'>English</option>
      <option key='2' value='turkish'>Türkçe</option>
    </select>
  );

}

export default LanguageSelector;
