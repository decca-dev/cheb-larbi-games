import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/models/User";
import dbConnect from "../../../lib/helpers/dbConnect";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/helpers/ironConfig";
import { shopItems, ShopItem } from "../../../lib/engine/games/flappylarbi";

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
  const user = await User.findOne({ ID: req.session.user?.ID });
  // Buying items
  if (req.method === "PUT") {
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
      //@ts-ignore
      user?.gamesPlayed["flappyLarbi"].inventory.includes(shopItem.id)
    ) {
      return res.status(400).json({
        error: true,
        message: `You already own that item.`,
      });
    }
    try {
      user!.coins = user!.coins - shopItem.cost;
      user!.gamesPlayed!["flappyLarbi"] = {
        ...user!.gamesPlayed!["flappyLarbi"],
        inventory: [
          //@ts-ignore
          ...user!.gamesPlayed!["flappyLarbi"].inventory,
          shopItem.id,
        ],
        equiped: shopItem.id,
      };
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
  // Setting equiped item
  if (req.method === "PATCH") {
    const itemID = req.body.itemID;
    //@ts-ignore
    if (!user?.gamesPlayed["flappyLarbi"].inventory.includes(itemID)) {
      return res.status(400).json({
        error: true,
        message: "User doesn't own such item, thus they can't equip it.",
      });
    }
    //@ts-ignore
    if (user.gamesPlayed["flappyLarbi"].equiped === itemID) {
      return res.status(400).json({
        error: true,
        message: "User already equiped that item!",
      });
    }
    try {
      //@ts-ignore
      user.gamesPlayed["flappyLarbi"].equiped = itemID;
      await user.save();
      res.status(200).json({
        error: false,
        message: `Successfully equiped ${itemID}!`,
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: `An error occured: ${error.message}`,
      });
    }
  }
},
ironOptions);
