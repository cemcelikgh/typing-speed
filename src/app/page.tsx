import Panel from "@/components/panel/Panel";
import Results from "@/components/results/Results";
import Selectors from "@/components/selectors/Selectors";
import Words from "@/components/words/Words";


function Home() {
  return <>
    <Selectors />
    <Panel />
    <Results />
    <Words />
  </>;
}

export default Home;
