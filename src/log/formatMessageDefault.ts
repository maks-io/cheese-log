import { Who } from "who-am-i-now";
import chalk from "chalk";
import { LogLevel } from "../types/LogLevel";
import { CHEESE_ICON } from "./cheeseIcon";
import { getStackTrace } from "./getStackTrace";
import { FormatMessageFn } from "../types/FormatMessageFn";
import { getTimestamp } from "../helpers/getTimestamp";

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
  colorOverride: string,
  messagePrefix: string,
  messageSuffix: string,
) => {
  const cheeseIconPrepared = showCheeseIcon ? CHEESE_ICON + " " : "";
  const messagePrefixPrepared = messagePrefix ? messagePrefix + " " : "";
  const messageSuffixPrepared = messageSuffix ?? "";
  const logLevelPrepared = showLogLevel
    ? "[" + logLevel + "]" + (showDate ? " " : "")
    : "";
  const datePrepared = showDate
    ? getTimestamp(dateFormat, millisecondsSince1970)
    : "";
  const originInfo = showOrigin ? (getStackTrace() ?? "") : "";

  let prefixPrepared = `${cheeseIconPrepared}${messagePrefixPrepared}${logLevelPrepared}${datePrepared}`;
  if (!allColorsDisabled) {
    const textColorFn = who.isServerApp ? chalk.black : chalk.white;
    if (logLevel === LogLevel.error) {
      prefixPrepared = chalk.bgRed(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.warn) {
      prefixPrepared = chalk.bgYellow(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.info) {
      prefixPrepared = chalk.bgGray(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.log) {
      prefixPrepared = chalk.bgBlackBright(textColorFn(prefixPrepared));
    } else if (logLevel === LogLevel.debug) {
      prefixPrepared = chalk.bgMagenta(textColorFn(prefixPrepared));
    }
  }

  const originInfoPrepared = originInfo ? `   ${originInfo}\n` : "";
  return `${prefixPrepared}\n${originInfoPrepared}${message}${messageSuffixPrepared}`;
};
