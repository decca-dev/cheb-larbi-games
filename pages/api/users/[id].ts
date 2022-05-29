import User from "../../../lib/models/User";
import dbConnect from "../../../lib/helpers/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  error: boolean;
  message: string;
  data?: any;
}

dbConnect();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const id = req.query.id;
      const user = await User.findOne({ ID: id });
      if (user) {
        res.status(200).json({
          error: false,
          message: "User found",
          data: {
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
            ID: user.ID,
          },
        });
      } else {
        res.status(400).json({
          error: true,
          message: "User not found",
        });
      }

      break;

    default:
      break;
  }
}
