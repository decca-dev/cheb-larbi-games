export class BasicGame {
  public readonly ctx: CanvasRenderingContext2D;
  public score: number;
  public state: GameState;
  public readonly assets: Assets;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.score = 0;
    this.state = "START";
    this.assets = {};
  }
  public addAsset(name: string, image: HTMLImageElement) {}
  public reset(): void {}
  public genNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  public isOnMobile(): boolean {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }
    return false;
  }
}

export class Entity {
  public readonly pos: Position;
  public readonly assets: Assets;
  constructor(pos: Position) {
    this.pos = pos;
    this.assets = {};
  }
  public draw(ctx: CanvasRenderingContext2D, ...args: any): void {}
  public addAsset(name: string, image: HTMLImageElement) {}
}

export interface Position {
  x: number;
  y: number;
}

export type GameState = "START" | "PLAYING" | "GAME_OVER";

export interface Assets {
  [name: string]: HTMLImageElement;
}
