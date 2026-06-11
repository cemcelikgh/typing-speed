import Reset from "./reset/Reset";
import Timer from "./timer/Timer";
import Typing from "./typing/Typing";
import styles from './Panel.module.css';

function Panel() {

  return (
    <section className={styles.panel}>
      <Typing />
      <Timer />
      <Reset />
    </section>
  );

}

export default Panel;
