import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import dbConnect from "../../../lib/helpers/dbConnect";
import User from "../../../lib/models/User";
import { ironOptions } from "../../../lib/helpers/ironConfig";

dbConnect();
export default withIronSessionApiRoute(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
  }
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
},
ironOptions);
