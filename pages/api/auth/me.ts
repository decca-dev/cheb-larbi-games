import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function handler(req: NextApiRequest, res: NextApiResponse) {
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
  {
    cookieName: "cheb_larbi_loves_u",
    password: process.env.SESSION_PASSWORD as string,
  }
);
