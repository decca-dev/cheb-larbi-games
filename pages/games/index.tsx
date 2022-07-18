import Layout from "../../components/Layout";
import { useMetaData } from "../../lib/hooks/useMetaData";
import type { NextPage } from "next";
import GameCard from "../../components/GameCard";

export interface Game {
  name: string;
  description: string;
  image: string;
  url: string;
}

const games: Game[] = [
  {
    name: "Flappy Larbi",
    description:
      "Totally not a flappy bird clone with different bird skins and other features.",
    image: "/assets/game-icons/flappy-larbi.svg",
    url: "/games/flappylarbi",
  },
  {
    name: "Duckhunt",
    description:
      "Shoot these pesky birds like a true moroccan with various weapons and projectiles.",
    image: "/assets/game-icons/duckhunt.svg",
    url: "/games/duckhunt",
  },
  {
    name: "Guess the song",
    description:
      "It takes an expert to know the name of all these songs, and that export is YOU.",
    image: "/assets/game-icons/guess-the-song.svg",
    url: "/games/guessthesong",
  },
];

const index: NextPage = () => {
  return (
    <>
      {useMetaData(
        "Games",
        "Checkout all the awesome cheb larbi games",
        "/games"
      )}
      <Layout>
        <div className="flex flex-col">
          {games.map((game, i) => {
            return <GameCard key={i} game={game} />;
          })}
        </div>
      </Layout>
    </>
  );
};

export default index;
