import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/helpers/ironConfig";

export default withIronSessionApiRoute(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  req.session.destroy();
  res.status(300).redirect("/");
},
ironOptions);
