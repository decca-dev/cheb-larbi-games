import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import User from "../../../lib/models/User";
import dbConnect from "../../../lib/helpers/dbConnect";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/helpers/ironConfig";

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
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ error: true, message: "Email not registered." });
      return;
    }
    compare(password, user.password!, async (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        res
          .status(400)
          .json({ error: true, message: "Password does not match." });
        return;
      } else {
        req.session.user = {
          ID: user.ID,
          name: user.name,
          avatar: user.avatar,
          bio: user.bio,
          isBanned: user.isBanned,
          isAdmin: user.isAdmin,
          isLoggedIn: true,
          level: user.level,
          xp: user.xp,
          gamesPlayed: user.gamesPlayed,
        };
        await req.session.save();
        res.status(200).json({
          error: false,
          message: "Logged in successfully.",
          data: req.session.user,
        });
      }
    });
  }
},
ironOptions);
