export class BasicGame {
  public readonly ctx: CanvasRenderingContext2D;
  protected score: number;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.score = 0;
  }
  public draw(): void {}
  public genNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export class Entity {
  protected pos: Position;
  public draw(ctx: CanvasRenderingContext2D): void {}
  constructor(pos: Position) {
    this.pos = pos;
  }
}

export interface Position {
  x: number;
  y: number;
}

export type GameState = "START" | "PLAYING" | "GAME_OVER";
