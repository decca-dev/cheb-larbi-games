import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/models/User";
import { genSalt, hash } from "bcryptjs";
import dbConnect from "../../../lib/helpers/dbConnect";

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
  if (req.method === "POST") {
    const { name, email, avatar, password } = req.body;
    const existingName = await User.findOne({ name: name });
    const existingEmail = await User.findOne({ email: email });
    if (existingName) {
      res
        .status(400)
        .json({ error: true, message: "Username already in use." });
      return;
    }
    if (existingEmail) {
      res.status(400).json({ error: true, message: "Email already in use." });
      return;
    }
    const user = new User({
      name: name,
      avatar: avatar,
      email: email,
    });
    genSalt(10, (ERROR, salt) => {
      hash(password, salt, async (error, hash) => {
        if (error) throw error;
        try {
          user.password = hash;
          await user.save();
          res.status(200).json({
            error: false,
            message: "Registered successfully!",
          });
        } catch (err: any) {
          res.status(400).json({
            error: true,
            message: `Failed to register: ${err.message}`,
          });
          throw err;
        }
      });
    });
  }
}
