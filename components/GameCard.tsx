import Image from "next/image";
import { Game } from "../pages/games";
import { FC } from "react";

const GameCard: FC<{ game: Game }> = ({ game }) => {
  return (
    <div
      className="flex flex-row w-auto py-3 shadow-2xl rounded-lg transition hover:scale-90 ease-in-out duration-200 text-white"
      onClick={() => (window.location.href = game.url)}
    >
      <div className="ml-3 mt-2">
        <Image src={game.image} width="137" height="84" />
      </div>
      <div className="flex flex-col ml-2">
        <h1 className="text-xl">{game.name}</h1>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
