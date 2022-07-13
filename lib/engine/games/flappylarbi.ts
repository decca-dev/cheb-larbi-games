import { Position, BasicGame, Entity, GameState } from "../globals/BasicGame";

const PIPE_WIDTH = 50;
const BIRD_WIDTH = 25;
const BIRD_HEIGHT = 25;
const GAP = 100;
const GRAVITY = 1.2;
const TOP_PIPE = new Image();
const BOTTOM_PIPE = new Image();
TOP_PIPE.src = "../../../public/assets/game-assets/fl-top-pipe.svg";
BOTTOM_PIPE.src = "../../../public/assets/game-assets/fl-bottom-pipe.svg";
let state: GameState = "START";

enum BirdType {
  NORMAL,
  SILVER,
  GOLD,
  DIAMOND,
  RUBY,
}

class FlappyLarbi extends BasicGame {
  protected bird: Bird;
  protected pipes: Pipe[];
  constructor(ctx: CanvasRenderingContext2D, bird: Bird) {
    super(ctx);
    this.bird = bird;
    this.pipes = [];
  }
}

class Bird extends Entity {
  public radius: number;
  public birdType: BirdType;
  constructor(pos: Position, birdType: BirdType) {
    super(pos);
    this.radius = 12;
    this.birdType = birdType;
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    let image = new Image();
    switch (this.birdType) {
      case BirdType.NORMAL:
        image.src = "../../../public/assets/game-assets/fl-bird-normal.svg";
        break;
      case BirdType.SILVER:
        image.src = "../../../public/assets/game-assets/fl-bird-silver.svg";
        break;
      case BirdType.GOLD:
        image.src = "../../../public/assets/game-assets/fl-bird-gold.svg";
        break;
      case BirdType.DIAMOND:
        image.src = "../../../public/assets/game-assets/fl-bird-diamond.svg";
        break;
      case BirdType.RUBY:
        image.src = "../../../public/assets/game-assets/fl-bird-ruby.svg";
        break;
      default:
        image.src = "../../../public/assets/game-assets/fl-bird-normal.svg";
        break;
    }
    ctx.drawImage(image, this.pos.x, this.pos.y, BIRD_WIDTH, BIRD_HEIGHT);
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

class Pipe extends Entity {
  protected topHeight: number;
  protected bottomHeight: number;
  protected gapHeight: number;
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
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(TOP_PIPE, this.pos.x, this.pos.y, PIPE_WIDTH, this.topHeight);
    ctx.drawImage(
      BOTTOM_PIPE,
      this.pos.x,
      this.topHeight + this.gapHeight,
      PIPE_WIDTH,
      this.bottomHeight
    );
  }
}

// const genNumber = (min: number, max: number): number => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const image = new Image();
//   image.src =
//     "https://cdn.discordapp.com/attachments/801556899606691851/983107790690193478/unknown.png";

//   const PIPE_WIDTH = 50;
//   const BIRD_WIDTH = 25;
//   const BIRD_HEIGHT = 25;
//   const GAP = 100;
//   const GRAVITY = 1.2;
//   let GAME_STATE: "STARTING" | "PLAYING" | "LOST" = "STARTING";

//   interface Position {
//     x: number;
//     y: number;
//   }

//   interface Pipe {
//     topHeight: number;
//     bottomHeight: number;
//     pos: Position;
//     gapHeight: number;
//   }

//   class Game {
//     public ctx: CanvasRenderingContext2D;
//     public bird: Bird;
//     public pipes: Pipe[];
//     public score: number;
//     constructor(ctx: CanvasRenderingContext2D, bird: Bird) {
//       ctx = ctx;
//       this.bird = bird;
//       this.score = 0;
//       this.pipes = [];
//     }
//     public drawBg(): void {
//       ctx.fillStyle = "#70c5ce";
//       ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     }
//     public drawPipe(i: number): void {
//       ctx.fillStyle = "green";
//       ctx.fillRect(
//         this.pos.x,
//         this.pos.y,
//         PIPE_WIDTH,
//         this.topHeight
//       );
//       ctx.fillRect(
//         this.pos.x,
//         this.topHeight + this.gapHeight,
//         PIPE_WIDTH,
//         this.bottomHeight
//       );
//     }
//     public draw(): void {
//       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//       this.drawBg();
//       for (let i = 0; i < this.pipes.length; i++) {
//         this.drawPipe(i);
//         if (this.pos.x === 125) {
//           this.addPipe({
//             pos: { x: ctx.canvas.width - 50, y: 0 },
//             gapHeight: GAP,
//             topHeight: genNumber(80, ctx.canvas.height - 2 * 80),
//             bottomHeight: ctx.canvas.height,
//           });
//         }
//         //! Stop bird from falling outside of the canvas border
//         if (this.bird.pos.y + BIRD_HEIGHT / 2 >= ctx.canvas.height) {
//           GAME_STATE = "LOST";
//         }
//         //! Stop bird from flying outside of the canvas border
//         if (this.bird.pos.y <= 0) {
//           GAME_STATE = "LOST";
//         }
//         //* Collision detection
//         /**
//          *! Top Bird: bird.y - bird.radius
//          *! Bottom Bird: bird.y + bird.radius
//          *! Right Bird: bird.x + bird.radius
//          *! Left Bird: bird.x - bird.radius

//          *? Top Pipe: pipe.y
//          *? Bottom Pipe: pipe.y + pipe.height
//          *? Right Pipe: pipe.x + pipe.width
//          *? Left Pipe: pipe.x
//         */
//         //* Top Pipe Collision detection
//         if (
//           this.bird.pos.x + this.bird.radius >
//             this.pos.x - this.bird.radius &&
//           this.bird.pos.x - this.bird.radius < this.pos.x + PIPE_WIDTH &&
//           this.bird.pos.y + this.bird.radius > GAP &&
//           this.bird.pos.y - this.bird.radius <
//             this.topHeight - BIRD_HEIGHT
//         ) {
//           GAME_STATE = "LOST";
//         }
//         //* Bottom Pipe Collision detection
//         if (
//           this.bird.pos.x + this.bird.radius > this.pos.x &&
//           this.bird.pos.x - this.bird.radius < this.pos.x + PIPE_WIDTH &&
//           this.bird.pos.y + this.bird.radius > this.topHeight + GAP &&
//           this.bird.pos.y - this.bird.radius <
//             this.topHeight + GAP + this.bottomHeight
//         ) {
//           GAME_STATE = "LOST";
//         }
//         if (this.pos.x === 5) {
//           this.score++;
//         }
//         if (this.pos.x + PIPE_WIDTH <= 0) {
//           this.pipes.shift();
//         }
//         this.pos.x--;
//       }
//       this.bird.update();
//       ctx.fillStyle = "#ffffff";
//       ctx.font = "20px Verdana";
//       ctx.fillText(
//         `${this.score}`,
//         ctx.canvas.width / 2,
//         ctx.canvas.height / 2
//       );
//     }
//     public addPipe(pipe: Pipe): void {
//       this.pipes.push(pipe);
//     }
//   }

//   class Bird {
//     public pos: Position;
//     public ctx: CanvasRenderingContext2D;
//     public radius: number;
//     constructor(pos: Position, ctx: CanvasRenderingContext2D) {
//       this.pos = pos;
//       ctx = ctx;
//       this.radius = 12;
//     }
//     public draw(): void {
//       // ctx.fillStyle = "#000";
//       // ctx.fillRect(this.pos.x, this.pos.y, 25, 25);
//       ctx.drawImage(image, this.pos.x, this.pos.y, BIRD_WIDTH, BIRD_HEIGHT);
//     }
//     public jump(): void {
//       this.pos.y -= 50;
//     }
//     public fall(): void {
//       this.pos.y += GRAVITY;
//     }
//     public update(): void {
//       this.draw();
//       this.fall();
//     }
//   }

//   const canvas = document.querySelector("#game") as HTMLCanvasElement;
//   const ctx = canvas.getContext("2d");
//   const bird = new Bird({ x: 20, y: canvas.width / 2 }, ctx!);
//   const game = new Game(ctx!, bird);
//   game.addPipe({
//     pos: { x: ctx!.canvas.width - 50, y: 0 },
//     gapHeight: GAP,
//     topHeight: genNumber(0, canvas.height - GAP),
//     bottomHeight: canvas.height,
//   });

//   canvas.addEventListener("click", () => {
//     if (GAME_STATE === "STARTING") {
//       GAME_STATE = "PLAYING";
//       bird.jump();
//       loop();
//     } else {
//       bird.jump();
//     }
//   });

//   if (
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//       navigator.userAgent
//     )
//   ) {
//     // some code..
//   }

//   // canvas.addEventListener("touchstart", () => {
//   //   if (GAME_STATE === "STARTING") {
//   //     GAME_STATE = "PLAYING";
//   //     bird.jump();
//   //     loop();
//   //   } else {
//   //     bird.jump();
//   //   }
//   // });

//   const loop = () => {
//     if (GAME_STATE === "PLAYING") {
//       requestAnimationFrame(loop);
//       game.draw();
//     } else if (GAME_STATE === "LOST") {
//       alert("lol");
//     }
//     game.draw();
//   };

//   loop();
