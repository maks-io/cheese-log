import { Who } from "who-am-i-now";
import { LogLevel } from "./LogLevel";
import { CheeseColors } from "./CheeseColors";

export type FormatMessageFn = (
  message: string,
  who: Who,
  showLogLevel: boolean,
  logLevel: LogLevel,
  millisecondsSince1970: number,
  showDate: boolean,
  dateFormat: string,
  showOrigin: boolean,
  autoColorizeObject: boolean,
  showCheeseIcon: boolean,
  allColorsDisabled: boolean,
  colorOverride: CheeseColors,
  messagePrefix: string,
  messageSuffix: string,
) => string;
