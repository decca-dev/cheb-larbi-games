import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import User from "../../../lib/models/User";
import dbConnect from "../../../lib/helpers/dbConnect";

interface Data {
  error: boolean;
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user === null) {
    res.status(400).json({ error: true, message: "Email not registered." });
    return;
  }
  compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (!isMatch) {
      res
        .status(400)
        .json({ error: true, message: "Password does not match." });
      return;
    } else {
      res.status(200).json({
        error: false,
        message: "Logged in successfully.",
        data: {
          id: user.ID,
          name: user.name,
          avatar: user.avatar,
          isBanned: user.isBanned,
          isAdmin: user.isAdmin,
        },
      });
    }
  });
}
