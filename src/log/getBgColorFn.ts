import c, { AnsicolorMethods } from "ansicolor";
import { CheeseColors } from "../types/CheeseColors";

export const getBgColorFn = (
  color?: CheeseColors
): AnsicolorMethods | ((str: string) => string) => {
  if (!color) {
    return (str: string) => str;
  }
  return {
    gray: c.bgDarkGray,
    lightgray: c.bgLightGray,
    blue: c.bgBlue,
    lightblue: c.bgLightBlue,
    cyan: c.bgCyan,
    lightcyan: c.bgLightCyan,
    red: c.bgRed,
    lightred: c.bgLightRed,
    green: c.bgGreen,
    lightgreen: c.bgLightGreen,
    yellow: c.bgYellow,
    lightyellow: c.bgLightYellow,
    magenta: c.bgMagenta,
    lightmagenta: c.bgLightMagenta,
    black: c.bgBlack,
    white: c.bgWhite,
  }[color.toLowerCase()];
};
