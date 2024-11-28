import c, { ChalkInstance } from "chalk";
import { CheeseColors } from "../types/CheeseColors";

export const getBgColorFn = (
  color?: CheeseColors,
): ChalkInstance | ((str: string) => string) => {
  if (!color) {
    return (str: string) => str;
  }
  return {
    gray: c.bgBlackBright,
    lightgray: c.bgGray,
    blue: c.bgBlue,
    lightblue: c.bgBlueBright,
    cyan: c.bgCyan,
    lightcyan: c.bgCyanBright,
    red: c.bgRed,
    lightred: c.bgRedBright,
    green: c.bgGreen,
    lightgreen: c.bgGreenBright,
    yellow: c.bgYellow,
    lightyellow: c.bgYellowBright,
    magenta: c.bgMagenta,
    lightmagenta: c.bgMagentaBright,
    black: c.bgBlack,
    white: c.bgWhite,
  }[color.toLowerCase()];
};
