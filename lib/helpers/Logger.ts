import chalk from "chalk";

export class Logger {
  private src: string;
  constructor(src: string) {
    this.src = src;
  }
  public info(message: string) {
    console.log(
      `[${this.toHHMMSS(new Date())}] ${chalk.green("INFO")} [${
        this.src
      }] ${message}`
    );
  }

  public error(err: Error | string) {
    const message = typeof err === "string" ? err : err.message;
    console.error(
      `[${this.toHHMMSS(new Date())}] ${chalk.red("ERROR")} [${
        this.src
      }] ${message}`
    );
  }

  public warn(message: string) {
    console.log(
      `[${this.toHHMMSS(new Date())}] ${chalk.yellow("WARN")} [${
        this.src
      }] ${message}`
    );
  }

  public toHHMMSS(time: Date) {
    let hours = time.getHours().toString().padStart(2, "0");
    let minutes = time.getMinutes().toString().padStart(2, "0");
    let seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
}
