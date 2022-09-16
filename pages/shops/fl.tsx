import type { NextPage, NextPageContext } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/helpers/ironConfig";
import { shopItems, ShopItem } from "../../lib/engine/games/flappylarbi";
import Image from "next/image";
import Layout from "../../components/Layout";
import { UserInterface } from "../../lib/types";
import { useMetaData } from "../../lib/hooks/useMetaData";

type ItemProps = ShopItem & {
  userCoins: number;
  equiped: string;
  owned: string[];
};

const fl: NextPage<{ user: UserInterface }> = ({ user }) => {
  return (
    <>
      {useMetaData(
        "Flappy Larbi Shop",
        "Buy/equip different items.",
        "/shops/fl"
      )}
      <Layout>
        <h1 className="font-bold text-center text-3xl text-white">
          Flappy Larbi Item Shop
        </h1>
        <div className="mt-10 flex sm:flex-row flex-col items-center justify-around">
          {shopItems.map((item, i) => {
            //@ts-ignore
            if (user.gamesPlayed["flappyLarbi"]?.inventory.includes(item.id))
              return;
            return (
              <ItemCard
                name={item.name}
                cost={item.cost}
                id={item.id}
                image={item.image}
                userCoins={user.coins}
                //@ts-ignore
                equiped={user.gamesPlayed["flappyLarbi"].equiped}
                //@ts-ignore
                owned={user.gamesPlayed["flappyLarbi"].inventory}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

const ItemCard = ({
  name,
  id,
  cost,
  image,
  userCoins,
  equiped,
  owned,
}: ItemProps) => {
  return (
    <div
      className={
        equiped !== id
          ? "rounded-xl shadow-xl border-2 flex flex-col items-center transition hover:scale-90 duration-150 ease-in-out hover:translate-y-1 bg-slate-100 w-48 h-64 pt-5 mb-5 sm:mb-0"
          : "rounded-xl shadow-xl border-2 flex flex-col items-center transition hover:scale-90 duration-150 ease-in-out hover:translate-y-1 bg-emerald-300 w-48 h-64 pt-5 mb-5 sm:mb-0"
      }
    >
      {equiped === id && (
        <p className="text-gray-600 font-bold text-xl animate-bounce">
          Equiped
        </p>
      )}
      <Image
        src={image.replace("../../../public", "")}
        width="100"
        height="100"
      />
      <h1 className="font-bold text-xl">{name}</h1>
      <h2 className="font-semibold text-lg">ID: {id}</h2>
      <span
        className={
          userCoins >= cost ? "text-green-500 text-lg" : "text-gray-700 text-lg"
        }
      >
        Cost: {cost}
      </span>
      {equiped !== id && !owned.includes(id) && (
        <button
          className={
            userCoins >= cost
              ? "w-24 h-10 bg-green-500 rounded-md text-white mb-5"
              : "w-24 h-10 bg-gray-400 rounded-md text-white mb-5 cursor-not-allowed"
          }
        >
          Purchase
        </button>
      )}
      {equiped !== id && owned.includes(id) && (
        <button className="w-24 h-10 bg-green-500 rounded-md text-white mb-5">
          Use
        </button>
      )}
    </div>
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

export default fl;
