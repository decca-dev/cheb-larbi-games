import { Position, BasicGame, Entity } from "../globals/BasicGame";

export const PIPE_WIDTH = 50;
export const BIRD_WIDTH = 25;
export const BIRD_HEIGHT = 25;
export const GAP = 100;
export const GRAVITY = 1.2;

export interface ShopItem {
  name: string;
  id: string;
  cost: number;
  image: string;
}

export const shopItems: ShopItem[] = [
  {
    name: "Silver Bird Skin",
    id: "bird-silver",
    cost: 100,
    image: "../../../public/assets/game-assets/fl-bird-silver.svg",
  },
  {
    name: "Gold Bird Skin",
    id: "bird-gold",
    cost: 500,
    image: "../../../public/assets/game-assets/fl-bird-gold.svg",
  },
  {
    name: "Diamond Bird Skin",
    id: "bird-diamond",
    cost: 1000,
    image: "../../../public/assets/game-assets/fl-bird-diamond.svg",
  },
  {
    name: "Ruby Bird Skin",
    id: "bird-ruby",
    cost: 1500,
    image: "../../../public/assets/game-assets/fl-bird-ruby.svg",
  },
];

export class FlappyLarbi extends BasicGame {
  protected bird: Bird;
  protected pipes: Pipe[];
  constructor(ctx: CanvasRenderingContext2D, bird: Bird) {
    super(ctx);
    this.bird = bird;
    this.pipes = [];
  }
  public addAsset(name: string, image: HTMLImageElement): FlappyLarbi {
    this.assets[name] = image;
    return this;
  }
  public reset(): void {
    this.bird.pos.x = 20;
    this.bird.pos.y = this.ctx.canvas.height / 2;
    this.state = "START";
    this.draw();
    this.score = 0;
    this.pipes = [];
    this.addPipe(
      new Pipe(
        { x: this.ctx.canvas.width - 50, y: 0 },
        this.genNumber(80, this.ctx.canvas.height - 2 * 80),
        this.ctx.canvas.height,
        GAP
      )
        .addAsset("TOP_PIPE", this.assets["TOP_PIPE"])
        .addAsset("BOTTOM_PIPE", this.assets["BOTTOM_PIPE"])
    );
  }
  public addPipe(pipe: Pipe): void {
    this.pipes.push(pipe);
  }
  public drawBg(): void {
    this.ctx.drawImage(
      this.assets["BG"],
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }
  public draw(): void {
    switch (this.state) {
      case "START":
        {
          this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
          this.ctx.drawImage(
            this.assets["THUMBNAIL"],
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
          this.ctx.textAlign = "center";
          this.ctx.font = "20px Sans-serif";
          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = 8;
          this.ctx.strokeText(
            `Click anywhere to start`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
          );
          this.ctx.fillStyle = "white";
          this.ctx.fillText(
            "Click anywhere to start",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
          );
        }
        break;

      case "GAME_OVER":
        {
          this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
          this.drawBg();
          this.bird.draw(this.ctx);
          this.ctx.fillStyle = "black";
          this.ctx.font = "20px Verdana";
          this.ctx.textAlign = "center";
          this.ctx.fillText(
            "Game Over!",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 - 20
          );
          this.ctx.fillText(
            `You scored ${this.score} points`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
          );
        }
        break;

      case "PLAYING":
        {
          this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
          this.drawBg();
          for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].draw(this.ctx);
            if (this.pipes[i].pos.x === this.ctx.canvas.width / 4) {
              this.addPipe(
                new Pipe(
                  { x: this.ctx.canvas.width - 50, y: 0 },
                  this.genNumber(80, this.ctx.canvas.height - 2 * 80),
                  this.ctx.canvas.height,
                  GAP
                )
                  .addAsset("TOP_PIPE", this.assets["TOP_PIPE"])
                  .addAsset("BOTTOM_PIPE", this.assets["BOTTOM_PIPE"])
              );
            }
            if (this.bird.pos.y >= this.ctx.canvas.height) {
              this.state = "GAME_OVER";
            }
            if (this.bird.pos.y <= 0) {
              this.state = "GAME_OVER";
            }
            //* Collision detection
            /**
            *! Top Bird: bird.y - bird.radius
            *! Bottom Bird: bird.y + bird.radius
            *! Right Bird: bird.x + bird.radius
            *! Left Bird: bird.x - bird.radius

            *? Top Pipe: pipe.y
            *? Bottom Pipe: pipe.y + pipe.height
            *? Right Pipe: pipe.x + pipe.width
            *? Left Pipe: pipe.x
            */
            //* Top Pipe Collision detection
            if (
              this.bird.pos.x + this.bird.radius >
                this.pipes[i].pos.x - this.bird.radius &&
              this.bird.pos.x - this.bird.radius <
                this.pipes[i].pos.x + PIPE_WIDTH &&
              this.bird.pos.y + this.bird.radius > GAP &&
              this.bird.pos.y - this.bird.radius <
                this.pipes[i].topHeight - BIRD_HEIGHT
            ) {
              this.state = "GAME_OVER";
            }
            //* Bottom Pipe Collision detection
            if (
              this.bird.pos.x + this.bird.radius > this.pipes[i].pos.x &&
              this.bird.pos.x - this.bird.radius <
                this.pipes[i].pos.x + PIPE_WIDTH &&
              this.bird.pos.y + this.bird.radius >
                this.pipes[i].topHeight + GAP &&
              this.bird.pos.y - this.bird.radius <
                this.pipes[i].topHeight + GAP + this.pipes[i].bottomHeight
            ) {
              this.state = "GAME_OVER";
            }
            if (this.pipes[i].pos.x === 5) {
              this.score++;
            }
            if (this.pipes[i].pos.x === -PIPE_WIDTH) {
              this.pipes.shift();
            }
            this.pipes[i].pos.x--;
          }
          this.bird.update(this.ctx);
          this.ctx.font = "50px Sans-serif";
          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = 8;
          this.ctx.strokeText(`${this.score}`, this.ctx.canvas.width / 2, 50);
          this.ctx.fillStyle = "white";
          this.ctx.fillText(`${this.score}`, this.ctx.canvas.width / 2, 50);
        }
        break;
    }
  }
}

export class Bird extends Entity {
  public radius: number;
  constructor(pos: Position) {
    super(pos);
    this.radius = 12;
  }
  public addAsset(name: string, image: HTMLImageElement): Bird {
    this.assets[name] = image;
    return this;
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.assets["image"],
      this.pos.x,
      this.pos.y,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
  }
  public jump(): void {
    this.pos.y -= 50;
  }
  public fall(): void {
    this.pos.y += GRAVITY;
  }
  public update(ctx: CanvasRenderingContext2D): void {
    this.draw(ctx);
    this.fall();
  }
}

export class Pipe extends Entity {
  public readonly topHeight: number;
  public readonly bottomHeight: number;
  public readonly gapHeight: number;
  constructor(
    pos: Position,
    topHeight: number,
    bottomHeight: number,
    gapHeight: number
  ) {
    super(pos);
    this.topHeight = topHeight;
    this.bottomHeight = bottomHeight;
    this.gapHeight = gapHeight;
  }
  public addAsset(name: string, image: HTMLImageElement): Pipe {
    this.assets[name] = image;
    return this;
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.assets["TOP_PIPE"],
      this.pos.x,
      this.pos.y,
      PIPE_WIDTH,
      this.topHeight
    );
    ctx.drawImage(
      this.assets["BOTTOM_PIPE"],
      this.pos.x,
      this.topHeight + this.gapHeight,
      PIPE_WIDTH,
      this.bottomHeight
    );
  }
}
