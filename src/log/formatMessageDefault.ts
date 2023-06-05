import { Who } from "who-am-i-now";
import dayjs from "dayjs";
import {
  bgDarkGray,
  bgLightGray,
  bgMagenta,
  bgRed,
  bgYellow,
  black,
  white,
} from "ansicolor";
import { LogLevel } from "../types/LogLevel";
import { CHEESE_ICON } from "./cheeseIcon";
import { getStackTrace } from "./getStackTrace";
import { FormatMessageFn } from "../types/FormatMessageFn";

export const formatMessageDefault: FormatMessageFn = (
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
  colorOverride: string
) => {
  const cheeseIconPrepared = showCheeseIcon ? CHEESE_ICON + " " : "";
  const logLevelPrepared = showLogLevel
    ? "[" + logLevel + "]" + (showDate ? " " : "")
    : "";
  const datePrepared = showDate
    ? dayjs(millisecondsSince1970, "x").format(dateFormat)
    : "";
  const originInfo = showOrigin ? getStackTrace()?.[0] ?? "" : "";

  let prefixPrepared = `${cheeseIconPrepared}${logLevelPrepared}${datePrepared}`;
  if (!allColorsDisabled) {
    const textColorFn = who.isServerApp ? black : white;
    if (logLevel === LogLevel.error) {
      prefixPrepared = bgRed(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.warn) {
      prefixPrepared = bgYellow(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.info) {
      prefixPrepared = bgLightGray(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.log) {
      prefixPrepared = bgDarkGray(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.debug) {
      prefixPrepared = bgMagenta(textColorFn(prefixPrepared));
    }
  }

  const originInfoPrepared = originInfo ? `   ${originInfo}\n` : "";
  return `${prefixPrepared}\n${originInfoPrepared}${message}`;
};
