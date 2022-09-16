import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import dbConnect from "../../../lib/helpers/dbConnect";
import User from "../../../lib/models/User";
import { ironOptions } from "../../../lib/helpers/ironConfig";
import { Logger } from "../../../lib/helpers/Logger";

const logger = new Logger("/API/AUTH/ME");

interface Data {
  error: boolean;
  message?: string;
  data?: any;
  isLoggedIn?: boolean;
}

type actions = "name" | "bio" | "game";

dbConnect();
export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      if (req.session.user) {
        res.status(200).json({
          error: false,
          data: req.session.user,
          isLoggedIn: true,
        });
      } else {
        res.status(200).json({
          error: false,
          data: {},
          isLoggedIn: false,
        });
      }
      break;
    case "POST":
      const user = await User.findOne({ ID: req.session.user?.ID });
      const action = req.query.action as actions;
      switch (action) {
        case "name":
          {
            try {
              user!.name = req.body.name;
              await user?.save();
              req.session.user!.name = req.body.name;
              await req.session.save();
              res.status(200).json({
                error: false,
                message: "Name successfully edited",
              });
              logger.info("User successfully edited their name!");
            } catch (error: any) {
              res.status(400).json({
                error: true,
                message: `An error occured trying to edit name: ${error.message}`,
              });
              logger.error(`User couldn't edit their name.\n${error.message}`);
            }
          }

          break;

        case "bio":
          {
            try {
              user!.bio = req.body.bio;
              await user?.save();
              req.session.user!.bio = req.body.bio;
              await req.session.save();
              res.status(200).json({
                error: false,
                message: "Bio successfully edited",
              });
              logger.info("User successfully edited their bio!");
            } catch (error: any) {
              res.status(400).json({
                error: true,
                message: `An error occured trying to edit bio: ${error.message}`,
              });
              logger.error(`User couldn't edit their bio.\n${error.message}`);
            }
          }
          break;

        case "game":
          const data = JSON.parse(req.body);
          logger.info(`Got data from beacon request.\n${JSON.stringify(data)}`);
          {
            try {
              user!.gamesPlayed![data.name] = {
                highestScore: data.highestScore,
                totalScore: data.totalScore,
                timePlayed: data.timePlayed,
                inventory: data.inventory,
                equiped: data.equiped,
              };
              await user?.save();
              req.session.user!.gamesPlayed![data.name] = {
                highestScore: data.highestScore,
                totalScore: data.totalScore,
                timePlayed: data.timePlayed,
                inventory: data.inventory,
                equiped: data.equiped,
              };
              await req.session.save();
              res.status(200).json({
                error: false,
                message: `Data for ${data.name} game was saved!`,
              });
              logger.info(`Saved ${data.name} game data!`);
            } catch (error: any) {
              res.status(400).json({
                error: true,
                message: `An error occured trying to save game data: ${error.message}`,
              });
              logger.error(
                `An error occured trying to save ${data.name} game data.\n${error.message}`
              );
            }
          }

          break;

        default:
          break;
      }
      break;
    default:
      break;
  }
},
ironOptions);
