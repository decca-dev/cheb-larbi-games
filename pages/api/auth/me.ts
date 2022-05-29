import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import dbConnect from "../../../lib/helpers/dbConnect";
import User from "../../../lib/models/User";
import { ironOptions } from "../../../lib/helpers/ironConfig";

interface Data {
  error: boolean;
  message?: string;
  data?: any;
  isLoggedIn?: boolean;
}

type actions = "name" | "bio";

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
      if (action === "bio") {
        try {
          user!.bio = req.body.bio;
          await user?.save();
          req.session.user!.bio = req.body.bio;
          await req.session.save();
          res.status(200).json({
            error: false,
            message: "Bio successfully edited",
          });
        } catch (error: any) {
          res.status(400).json({
            error: true,
            message: `An error occured trying to edit bio: ${error.message}`,
          });
        }
      } else if (action === "name") {
        try {
          user!.name = req.body.name;
          await user?.save();
          req.session.user!.name = req.body.name;
          await req.session.save();
          res.status(200).json({
            error: false,
            message: "Name successfully edited",
          });
        } catch (error: any) {
          res.status(400).json({
            error: true,
            message: `An error occured trying to edit name: ${error.message}`,
          });
        }
      }
      break;
    default:
      break;
  }
},
ironOptions);
