import { Who } from "who-am-i-now";
import { LogLevel } from "./LogLevel";
import { CheeseColors } from "./CheeseColors";
import { FormatMessageFn } from "./FormatMessageFn";
import { TableOptions } from "./TableOptions";
import { LogLevelEnabledFn } from "./LogLevelEnabledFn";

type ContextDependingValue<T> = T | ((who: Who, logLevel: LogLevel) => T);

export interface CheeseConfig {
  maxStringLength?: ContextDependingValue<number>;
  maxArrayLength?: ContextDependingValue<number>;
  spaces?: ContextDependingValue<boolean>;
  depth?: ContextDependingValue<number>;
  autoColorizeObject?: ContextDependingValue<boolean>;
  table?: ContextDependingValue<boolean>;
  dateFormat?: ContextDependingValue<string>;
  showOrigin?: ContextDependingValue<boolean>;
  showDate?: ContextDependingValue<boolean>;
  showLogLevel?: ContextDependingValue<boolean>;
  showCheeseIcon?: ContextDependingValue<boolean>;
  colorOverride?: CheeseColors;
  allColorsDisabled?: ContextDependingValue<boolean>;
  escapeWhitespaces?: ContextDependingValue<boolean>;
  forceNewlines?: ContextDependingValue<boolean>;
  tableOptions?: ContextDependingValue<TableOptions>;
  formatMessage?: FormatMessageFn;
  logLevelEnabled?: LogLevelEnabledFn;
}

export interface CheeseConfigEffective {
  maxStringLength: number;
  maxArrayLength: number;
  spaces: boolean;
  depth: number;
  autoColorizeObject: boolean;
  table: boolean;
  dateFormat: string;
  showDate: boolean;
  showOrigin: boolean;
  showLogLevel: boolean;
  showCheeseIcon: boolean;
  colorOverride: CheeseColors;
  allColorsDisabled: boolean;
  escapeWhitespaces: boolean;
  forceNewlines: boolean;
  tableOptions: TableOptions;
  formatMessage?: FormatMessageFn;
  logLevelEnabled?: LogLevelEnabledFn;
}

export const cheeseConfigAllowedKeys = [
  "maxStringLength",
  "maxArrayLength",
  "spaces",
  "depth",
  "autoColorizeObject",
  "table",
  "dateFormat",
  "showDate",
  "showOrigin",
  "showLogLevel",
  "showCheeseIcon",
  "colorOverride",
  "allColorsDisabled",
  "escapeWhitespaces",
  "tableOptions",
  "formatMessage",
  "logLevelEnabled",
];
