'use client';

import { selectLanguage } from "@/lib/features/languageSlice";
import { selectTheme } from "@/lib/features/themeSlice";
import { useAppSelector } from "@/lib/hooks";

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
        <link rel="icon" href={`/images/theme-icon/${theme}.svg`} type="image/svg+xml" />}
      </head>
      <body>
        <main>
          <h1>{title}</h1>
          {children}
        </main>
      </body>
    </html>
  );

}

export default Html;
