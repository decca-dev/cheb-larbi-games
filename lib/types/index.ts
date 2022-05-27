export interface UserInterface {
  ID: string;
  name: string;
  bio?: string;
  avatar: string;
  email?: string;
  password?: string;
  isBanned?: boolean;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}
