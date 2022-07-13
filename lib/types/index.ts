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
  level: number;
  xp: number;
  coins: number;
  gems: number;
  gamesPlayed?: GamePlayedInterface[];
}

export interface GamePlayedInterface {
  name: string;
  highestScore: string;
  totalScore: string;
  timePlayed: string;
  inventory: string[];
  equiped?: string;
}
