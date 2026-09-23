'use client';

import { Theme } from '@/types/types';
import { selectLanguage } from '@/lib/features/languageSlice';
import { setTheme } from '@/lib/features/themeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import DisplaySolid from './icons/DisplaySolid';
import LeafSolid from './icons/LeafSolid';
import MoonSolid from './icons/MoonSolid';
import SkyatlasSolid from './icons/SkyatlasSolid';
import SunSolid from './icons/SunSolid';
import styles from './ThemeSelector.module.css';

function ThemeSelector() {

  const [check, setCheck] = useState([false, false, false, true, false]);
  const isSystemTheme = check[3];
  const prefersColorSchemeRef = useRef<Theme>(null);
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    prefersColorSchemeRef.current = mediaQuery.matches ? 'light' : 'dark';

    function changeHandler(event: MediaQueryListEvent) {
      const mode = event.matches ? 'light' : 'dark';
      prefersColorSchemeRef.current = mode;
      if (isSystemTheme) dispatch(setTheme(mode));
    }

    mediaQuery.addEventListener('change', changeHandler);
    return () => { mediaQuery.removeEventListener('change', changeHandler) };

  }, [isSystemTheme, dispatch]);

  function handleSetTheme(theme: Theme | null) {
    if (theme === 'dark') dispatch(setTheme('dark'));
    else if (theme === 'light') dispatch(setTheme('light'));
    else if (theme === 'green')  dispatch(setTheme('green'));
    else dispatch(setTheme('blue'));
  }

  return (
    <fieldset className={styles['theme-switcher']}>
      <label
        htmlFor='set-green-theme'
        className={`${styles.switch} ${styles['green-switch']}`}
        title={language === 'english' ? 'Green Theme' : 'Yeşil Tema'}
      >
        <input
          id="set-green-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='green'
          checked={check[0]}
          onChange={() => {
            handleSetTheme('green');
            setCheck([true, false, false, false, false]);
          }}
        />
        <LeafSolid className={styles['switch-icon']} />
      </label>
      <label
        htmlFor='set-blue-theme'
        className={`${styles.switch} ${styles['blue-switch']}`}
        title={language === 'english' ? 'Blue Theme' : 'Mavi Tema'}
      >
        <input
          id="set-blue-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='blue'
          checked={check[1]}
          onChange={() => {
            handleSetTheme('blue');
            setCheck([false, true, false, false, false]);
          }}
        />
        <SkyatlasSolid className={styles['switch-icon']} />
      </label>
      <div className={styles['arc-border']} />
      <label
        htmlFor='set-light-theme'
        className={`${styles.switch} ${styles['light-switch']}`}
        title={language === 'english' ? 'Light Theme' : 'Açık Tema'}
      >
        <input
          id="set-light-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='light'
          checked={check[2]}
          onChange={() => {
            handleSetTheme('light');
            setCheck([false, false, true, false, false]);
          }}
        />
        <SunSolid className={styles['switch-icon']} />
      </label>
      <label
        htmlFor='set-system-theme'
        className={`${styles.switch} ${styles['system-switch']}`}
        title={language === 'english' ? 'System Theme' : 'Sistem Teması'}
      >
        <input
          id="set-system-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='system'
          checked={check[3]}
          onChange={() => {
            handleSetTheme(prefersColorSchemeRef.current);
            setCheck([false, false, false, true, false]);
          }}
        />
        <DisplaySolid className={styles['switch-icon']} />
      </label>
      <label
        htmlFor='set-dark-theme'
        className={`${styles.switch} ${styles['dark-switch']}`}
        title={language === 'english' ? 'Dark Theme' : 'Koyu Tema'}
      >
        <input
          id="set-dark-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='dark'
          checked={check[4]}
          onChange={() => {
            handleSetTheme('dark');
            setCheck([false, false, false, false, true]);
          }}
        />
        <MoonSolid className={styles['switch-icon']} />
      </label>
    </fieldset>
  );

}

export default ThemeSelector;
