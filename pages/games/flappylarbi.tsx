import Layout from "../../components/Layout";
import { useMetaData } from "../../lib/hooks/useMetaData";
import GameLayout from "../../components/GameLayout";

const flappylarbi = () => {
  return (
    <>
      {useMetaData(
        "Flappy Larbi",
        "Play Flappy Larbi. A Flappy bird inspired game, but with a Cheb Larbi twist!",
        "/games/flappylarbi"
      )}
      <Layout>
        <GameLayout>
          <h1>MAN</h1>
          <h1>MAN</h1>
          <h1>MAN</h1>
        </GameLayout>
      </Layout>
    </>
  );
};

export default flappylarbi;
