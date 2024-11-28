import chalk, { ChalkInstance } from "chalk";
import { CheeseColors } from "../types/CheeseColors";

export const getTextColorFn = (
  color?: CheeseColors,
): ChalkInstance | ((str: string) => string) => {
  if (!color) {
    return (str: string) => str;
  }
  return {
    gray: chalk.blackBright,
    lightgray: chalk.gray,
    blue: chalk.blue,
    lightblue: chalk.blueBright,
    cyan: chalk.cyan,
    lightcyan: chalk.cyanBright,
    red: chalk.red,
    lightred: chalk.redBright,
    green: chalk.green,
    lightgreen: chalk.greenBright,
    yellow: chalk.yellow,
    lightyellow: chalk.yellowBright,
    magenta: chalk.magenta,
    lightmagenta: chalk.magentaBright,
    black: chalk.black,
    white: chalk.white,
  }[color.toLowerCase()];
};
