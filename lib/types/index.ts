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
  gamesPlayed?: Games;
}
export interface Games {
  [name: string]: Game;
}

export interface Game {
  [name: string]: ObjType;
}

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type ObjType = PropType<Game, "name">;
