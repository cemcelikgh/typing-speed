'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import { setTheme } from '@/lib/features/themeSlice';
import { Theme } from '@/types/types';
import MoonSolid from './icons/MoonSolid';
import DisplaySolid from './icons/DisplaySolid';
import SunSolid from './icons/SunSolid';
import SkyatlasSolid from './icons/SkyatlasSolid';
import LeafSolid from './icons/LeafSolid';
import { selectLanguage } from '@/lib/features/languageSlice';
import styles from './ThemeSelector.module.css';

function ThemeSelector() {

  const prefersColorSchemeRef = useRef<Theme>(null);

  const [check, setCheck] = useState([false, false, false, true, false]);

  const dispatch = useAppDispatch();

  const language = useAppSelector(selectLanguage);

  useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    prefersColorSchemeRef.current = mediaQuery.matches ? 'dark' : 'light';

    function changeHandler(event: MediaQueryListEvent) {
      const mode = event.matches ? 'dark' : 'light';
      prefersColorSchemeRef.current = mode;
      if (check[3]) dispatch(setTheme(mode));
    }

    mediaQuery.addEventListener('change', changeHandler);
    return () => { mediaQuery.removeEventListener('change', changeHandler) }

  }, [check[3], dispatch]);

  function handleSetTheme(theme: Theme | null) {
    if (theme === 'dark') dispatch(setTheme('dark'))
      else if (theme === 'light') dispatch(setTheme('light'))
      else if (theme === 'green')  dispatch(setTheme('green'))
      else dispatch(setTheme('blue'));
  }

  return (
    <fieldset className={styles['theme-switcher']}>
      <label htmlFor='set-green-theme' className={`${styles.switch} ${styles['green-switch']}`}
        title={language === 'english' ? 'Green Theme' : 'Yeşil Tema'}
      >
        <input type="radio" name="theme" value='green'
          id="set-green-theme" className={styles.option}
          checked={check[0]}
          onChange={() => {
            handleSetTheme('green');
            setCheck([true, false, false, false, false]);
          }}
        />
        <LeafSolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-blue-theme' className={`${styles.switch} ${styles['blue-switch']}`}
        title={language === 'english' ? 'Blue Theme' : 'Mavi Tema'}
      >
        <input id="set-blue-theme" className={styles.option}
          type="radio" name="theme" value='blue'
          checked={check[1]}
          onChange={() => {
            handleSetTheme('blue');
            setCheck([false, true, false, false, false]);
          }}
        />
        <SkyatlasSolid className={styles['switch-icon']} />
      </label>
      <div className={styles['arc-border']}></div>
      <label htmlFor='set-light-theme' className={`${styles.switch} ${styles['light-switch']}`}
        title={language === 'english' ? 'Light Theme' : 'Açık Tema'}
      >
        <input id="set-light-theme" className={styles.option}
          type="radio" name="theme" value='light'
          checked={check[2]}
          onChange={() => {
            handleSetTheme('light');
            setCheck([false, false, true, false, false]);
          }}
        />
        <SunSolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-system-theme' className={`${styles.switch} ${styles['system-switch']}`}
        title={language === 'english' ? 'System Theme' : 'Sistem Teması'}
      >
        <input id="set-system-theme" className={styles.option}
          type="radio" name="theme" value='system'
          checked={check[3]}
          onChange={() => {
            handleSetTheme(prefersColorSchemeRef.current);
            setCheck([false, false, false, true, false]);
          }}
        />
        <DisplaySolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-dark-theme' className={`${styles.switch} ${styles['dark-switch']}`}
        title={language === 'english' ? 'Dark Theme' : 'Koyu Tema'}
      >
        <input id="set-dark-theme" className={styles.option}
          type="radio" name="theme" value='dark'
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
