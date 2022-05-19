import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/models/User";
import { genSalt, hash } from "bcryptjs";
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
  const { name, email, avatar, password } = req.body;
  const existingName = await User.findOne({ name: name });
  const existingEmail = await User.findOne({ email: email });
  if (existingName) {
    res.status(400).json({ error: true, message: "Username already in use." });
    return;
  }
  if (existingEmail) {
    res.status(400).json({ error: true, message: "Email already in use." });
    return;
  }
  const user = new User({
    name: name,
    avatar: avatar,
    bio: "I love Cheb Larbi!",
    email: email,
  });
  genSalt(10, (ERROR, salt) => {
    hash(password, salt, async (error, hash) => {
      if (error) throw error;
      try {
        user.password = hash;
        await user.save();
        res.redirect("/auth/login");
      } catch (err) {
        throw err;
      }
    });
  });
}
