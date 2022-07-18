import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/models/User";
import dbConnect from "../../../lib/helpers/dbConnect";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/helpers/ironConfig";
import { shopItems, ShopItem } from "../../../lib/engine/games/flappylarbi";
import { GamePlayedInterface } from "../../../lib/types";

interface Data {
  error: boolean;
  message: string;
  data?: any;
}

dbConnect();
export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const user = await User.findOne({ ID: req.session.user?.ID });
    const itemID = req.body.itemID;
    const shopItem: ShopItem = shopItems.find((item) => item.id === itemID)!;
    if (user!.coins < shopItem.cost) {
      return res.status(400).json({
        error: true,
        message: `You still need ${
          shopItem.cost - user!.coins
        } more coins to buy ${shopItem.name}.`,
      });
    }
    if (
      user?.gamesPlayed
        ?.find((game) => game.name === "flappy larbi")
        ?.inventory.includes(shopItem.id)
    ) {
      return res.status(400).json({
        error: true,
        message: `You already own that item.`,
      });
    }
    try {
      let index = user!.gamesPlayed?.findIndex(
        (game) => game.name === "flappy larbi"
      )!;
      user!.coins = user!.coins - shopItem.cost;
      user!.gamesPlayed![index] = {
        ...user!.gamesPlayed![index],
        inventory: [...user!.gamesPlayed![index].inventory, shopItem.id],
        equiped: shopItem.id,
      } as GamePlayedInterface;
      await user?.save();
      res.status(200).json({
        error: false,
        message: "Item successfully bought!",
      });
    } catch (error: any) {
      res.status(200).json({
        error: true,
        message: `An error occured.\n${error.message}`,
      });
    }
  }
},
ironOptions);
