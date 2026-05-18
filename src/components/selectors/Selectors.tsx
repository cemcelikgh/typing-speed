import ThemeSelector from "@/utils/theme-selector/ThemeSelector";
import LanguageSelector from "./language-selector/LanguageSelector";

function Selectors() {
  return (
    <section id='selectors'>
      <LanguageSelector />
      <ThemeSelector />
    </section>
  );
}

export default Selectors;
