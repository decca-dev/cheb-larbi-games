import { Schema, model, Model } from "mongoose";
import { UserInterface, GamePlayedInterface } from "../types";

const UserSchema = new Schema<UserInterface>({
  ID: {
    type: String,
    unique: true,
    default: `${Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    )}`,
  },
  name: { type: String, unique: true },
  bio: {
    type: String,
    unique: true,
    maxlength: 30,
    default: "We stan Cheb Larbi",
  },
  avatar: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isBanned: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  gems: { type: Number, default: 0 },
  gamesPlayed: { type: Array<GamePlayedInterface>, default: [] }
});

let User: Model<UserInterface, {}, {}, {}>;

try {
  User = model("User", UserSchema);
} catch (e) {
  User = model("User");
}

export default User;
