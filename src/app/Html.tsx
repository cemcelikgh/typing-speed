'use client';

import { selectLanguage } from "@/lib/features/languageSlice";
import { selectTheme } from "@/lib/features/themeSlice";
import { useAppSelector } from "@/lib/hooks";
import styles from './Html.module.css';

function Html({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const language = useAppSelector(selectLanguage);
  const lang = language === 'english' ? 'en' : 'tr';
  const titles = { en: 'Typing Speed', tr: 'Tuşlama Hızı' }
  const title = titles[lang];
  const theme = useAppSelector(selectTheme);

  return (
    <html lang={lang} className={theme} style={{colorScheme: theme}}>
      <head>
        <title>{title}</title>
        {theme &&
        <link rel="icon" href={`/images/theme-icons/${theme}-keyboard.svg`} type="image/svg+xml" />}
      </head>
      <body>
        <main className={styles.main}>
          <h1 className={styles.heading}>{title}</h1>
          {children}
        </main>
      </body>
    </html>
  );

}

export default Html;
