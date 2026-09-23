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

  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);

  const titles = { en: 'Typing Speed', tr: 'Tuşlama Hızı' };
  const lang = language === 'english' ? 'en' : 'tr';
  const title = titles[lang];

  return (
    <html
      lang={lang}
      className={theme}
      style={{ colorScheme: theme }}
    >
      <head>
        <title>{title}</title>
        {theme &&
        <link
          rel="icon"
          href={`/theme-icons/${theme}-keyboard.svg`}
          type="image/svg+xml"
        />}
      </head>
      <body>
        <main className={styles.main}>
          <h1 className={styles.heading}>
            {title}
          </h1>
          {children}
        </main>
      </body>
    </html>
  );

}

export default Html;
