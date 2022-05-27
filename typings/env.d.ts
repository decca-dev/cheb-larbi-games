import { UserInterface } from "../lib/types";

declare module "iron-session" {
  interface IronSessionData {
    user?: UserInterface;
  }
}
