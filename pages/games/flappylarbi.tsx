import Layout from "../../components/Layout";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/helpers/ironConfig";
import { useMetaData } from "../../lib/hooks/useMetaData";
import GameLayout from "../../components/GameLayout";
import {
  FlappyLarbi,
  Bird,
  Pipe,
  GAP,
} from "../../lib/engine/games/flappylarbi";
import { useEffect, useRef } from "react";
import type { Game, UserInterface } from "../../lib/types";
import type { NextPage, NextPageContext } from "next";

const flappylarbi: NextPage<{ user: UserInterface }> = ({ user }) => {
  const userGameData = user.gamesPlayed!["flappyLarbi"];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let data: Game;
  if (userGameData !== undefined) {
    data = {
      name: "flappyLarbi",
      highestScore: userGameData?.highestScore!,
      totalScore: userGameData?.totalScore!,
      timePlayed: userGameData?.timePlayed!,
      inventory: userGameData?.inventory!,
      equiped: userGameData?.equiped,
      coinsToAdd: 0,
    };
  } else {
    data = {
      name: "flappyLarbi",
      highestScore: 0,
      totalScore: 0,
      timePlayed: 0,
      inventory: [],
      equiped: "bird-normal",
      coinsToAdd: 0,
    };
  }
  console.log(data);
  const gameScores: number[] = [];
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");

    const birdImage = new Image();
    const TOP_PIPE = new Image();
    const BOTTOM_PIPE = new Image();
    const THUMBNAIL = new Image();
    const BG = new Image();
    birdImage.src = `/assets/game-assets/fl-${data.equiped}.svg`;
    THUMBNAIL.src = "/assets/game-icons/flappy-larbi.svg";
    TOP_PIPE.src = "/assets/game-assets/fl-top-pipe.svg";
    BOTTOM_PIPE.src = "/assets/game-assets/fl-bottom-pipe.svg";
    BG.src = "/assets/game-assets/fl-bg.svg";

    const bird = new Bird({ x: 20, y: canvas.width / 2 }).addAsset(
      "image",
      birdImage
    );
    const game = new FlappyLarbi(ctx!, bird)
      .addAsset("THUMBNAIL", THUMBNAIL)
      .addAsset("TOP_PIPE", TOP_PIPE)
      .addAsset("BOTTOM_PIPE", BOTTOM_PIPE)
      .addAsset("BG", BG);

    game.addPipe(
      new Pipe(
        { x: canvas.width - 50, y: 0 },
        game.genNumber(0, canvas.height - GAP),
        canvas.height,
        GAP
      )
        .addAsset("TOP_PIPE", TOP_PIPE)
        .addAsset("BOTTOM_PIPE", BOTTOM_PIPE)
    );

    if (!game.isOnMobile()) {
      canvas.addEventListener("click", () => {
        if (game.state === "START") {
          game.state = "PLAYING";
          bird.jump();
          loop();
        } else if (game.state === "PLAYING") {
          bird.jump();
        } else {
          gameScores.push(game.score);
          (data.totalScore as number) += game.score;
          (data.coinsToAdd as number) += Math.floor(Math.random() * 10) + 1;
          game.reset();
          game.draw();
        }
      });
    } else {
      canvas.addEventListener("touchstart", () => {
        if (game.state === "START") {
          game.state = "PLAYING";
          bird.jump();
          loop();
        } else if (game.state === "PLAYING") {
          bird.jump();
        } else {
          gameScores.push(game.score);
          (data.totalScore as number) += game.score;
          (data.coinsToAdd as number) += Math.floor(Math.random() * 10) + 1;
          game.reset();
          game.draw();
        }
      });
    }

    const loop = () => {
      if (game.state === "PLAYING") {
        requestAnimationFrame(loop);
        game.draw();
      } else {
        game.draw();
      }
    };

    loop();

    const start = new Date().getTime();

    document.addEventListener("visibilitychange", () => {
      const end = new Date().getTime();
      const totalTime = end - start;
      const date = new Date(totalTime);
      gameScores.push(data.highestScore as number);
      if (document.visibilityState === "hidden") {
        navigator.sendBeacon(
          "/api/auth/me?action=game",
          JSON.stringify({
            name: "flappyLarbi",
            totalScore: data.totalScore,
            highestScore: Math.max(...gameScores),
            timePlayed: (data.timePlayed as number) + totalTime,
            equiped: data.equiped,
            inventory: data.inventory,
            coinsToAdd: data.coinsToAdd,
            time:
              `${date.getHours()}`.padEnd(2, "00") +
              ":" +
              `${date.getMinutes()}`.padEnd(2, "00") +
              ":" +
              `${date.getSeconds()}`.padEnd(2, "00"),
          })
        );
      }
    });
  }, []);

  return (
    <>
      {useMetaData(
        "Flappy Larbi",
        "Play Flappy Larbi. A Flappy bird inspired game, but with a Cheb Larbi twist!",
        "/games/flappylarbi"
      )}
      <Layout>
        <GameLayout>
          <canvas
            ref={canvasRef}
            width={400}
            height={550}
            className="select-none"
          ></canvas>
        </GameLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  //@ts-ignore
  async function getServerSideProps(ctx: NextPageContext) {
    const user = ctx.req?.session.user;
    if (user?.isLoggedIn) {
      return {
        props: {
          user: user,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/401",
          permanent: false,
        },
      };
    }
  },
  ironOptions
);

export default flappylarbi;
