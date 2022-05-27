import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function handler(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.status(300).redirect("/");
  },
  {
    cookieName: "cheb_larbi_loves_u",
    password: process.env.SESSION_PASSWORD as string,
  }
);
