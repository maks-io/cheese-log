import c, { AnsicolorMethods } from "ansicolor";
import { CheeseColors } from "../types/CheeseColors";

export const getTextColorFn = (
  color?: CheeseColors
): AnsicolorMethods | ((str: string) => string) => {
  if (!color) {
    return (str: string) => str;
  }
  return {
    gray: c.darkGray,
    lightgray: c.lightGray,
    blue: c.blue,
    lightblue: c.lightBlue,
    cyan: c.cyan,
    lightcyan: c.lightCyan,
    red: c.red,
    lightred: c.lightRed,
    green: c.green,
    lightgreen: c.lightGreen,
    yellow: c.yellow,
    lightyellow: c.lightYellow,
    magenta: c.magenta,
    lightmagenta: c.lightMagenta,
    black: c.black,
    white: c.white,
  }[color.toLowerCase()];
};
