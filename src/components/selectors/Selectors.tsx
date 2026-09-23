import LanguageSelector from "./language-selector/LanguageSelector";
import ThemeSelector from "@/utils/theme-selector/ThemeSelector";
import styles from './Selectors.module.css';

function Selectors() {
  return (
    <section className={styles.selectors}>
      <LanguageSelector />
      <ThemeSelector />
    </section>
  );
}

export default Selectors;
