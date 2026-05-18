import Reset from "./reset/Reset";
import Timer from "./timer/Timer";
import Typing from "./typing/Typing";

function Panel() {

  return (
    <section id="panel">
      <Typing />
      <Timer />
      <Reset />
    </section>
  );

}

export default Panel;
