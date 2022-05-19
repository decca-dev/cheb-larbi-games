export interface UserInterface {
  ID: string;
  name: string;
  bio: string;
  avatar: string;
  email: string;
  password: string;
  isBanned: boolean;
  bannedAt: Date;
  isAdmin: boolean;
}
