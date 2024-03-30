import { Who } from "who-am-i-now";
import { CheeseConfig } from "../types/CheeseConfig";
import { formatMessageDefault } from "./formatMessageDefault";

export const cheeseConfigDefault: CheeseConfig = {
  allColorsDisabled: (who: Who) =>
      who.browserName === "Firefox" || who.browserName === "Safari",
  autoColorizeObject: true,
  colorOverride: undefined,
  dateFormat: "YYYY-MM-DD, HH:mm:ss.SSS",
  depth: 100,
  escapeWhitespaces: false,
  forceNewlines: false,
  formatMessage: formatMessageDefault,
  logLevelEnabled: () => process.env.NODE_ENV !== "production",
  maxArrayLength: 10000,
  maxStringLength: 10000,
  messagePrefix: undefined,
  messageSuffix: undefined,
  reportGlobalConfigChange: true,
  reportInitialization: true,
  showCheeseIcon: true,
  showDate: true,
  showLogLevel: true,
  showOrigin: false,
  spaces: true,
  table: false,
  tableOptions: {headerSeparator: "=", rowSeparator: "-"},
};
