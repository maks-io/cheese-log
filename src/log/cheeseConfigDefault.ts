import { Who } from "who-am-i-now";
import { CheeseConfig } from "../types/CheeseConfig";
import { formatMessageDefault } from "./formatMessageDefault";

export const cheeseConfigDefault: CheeseConfig = {
  reportInitialization: true,
  reportGlobalConfigChange: true,
  autoColorizeObject: true,
  allColorsDisabled: (who: Who) =>
    who.browserName === "Firefox" || who.browserName === "Safari",
  depth: 100,
  table: false,
  tableOptions: { headerSeparator: "=", rowSeparator: "-" },
  spaces: true,
  showLogLevel: true,
  showDate: true,
  showCheeseIcon: true,
  showOrigin: false,
  dateFormat: "YYYY-MM-DD, HH:mm:ss.SSS",
  maxArrayLength: 10000,
  maxStringLength: 10000,
  colorOverride: undefined,
  escapeWhitespaces: false,
  forceNewlines: false,
  logLevelEnabled: () => process.env.NODE_ENV !== "production",
  formatMessage: formatMessageDefault,
};
