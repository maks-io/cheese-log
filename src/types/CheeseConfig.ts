import { Who } from "who-am-i-now";
import { LogLevel } from "./LogLevel";
import { CheeseColors } from "./CheeseColors";
import { FormatMessageFn } from "./FormatMessageFn";
import { TableOptions } from "./TableOptions";
import { LogLevelEnabledFn } from "./LogLevelEnabledFn";

type ContextDependingValue<T> = T | ((who: Who, logLevel: LogLevel) => T);

export interface CheeseConfig {
  allColorsDisabled?: ContextDependingValue<boolean>;
  autoColorizeObject?: ContextDependingValue<boolean>;
  colorOverride?: CheeseColors;
  dateFormat?: ContextDependingValue<string>;
  depth?: ContextDependingValue<number>;
  escapeWhitespaces?: ContextDependingValue<boolean>;
  forceNewlines?: ContextDependingValue<boolean>;
  formatMessage?: FormatMessageFn;
  logLevelEnabled?: LogLevelEnabledFn;
  maxArrayLength?: ContextDependingValue<number>;
  maxStringLength?: ContextDependingValue<number>;
  messagePrefix?: ContextDependingValue<string>;
  messageSuffix?: ContextDependingValue<string>;
  reportGlobalConfigChange?: boolean;
  reportInitialization?: boolean;
  showCheeseIcon?: ContextDependingValue<boolean>;
  showDate?: ContextDependingValue<boolean>;
  showLogLevel?: ContextDependingValue<boolean>;
  showOrigin?: ContextDependingValue<boolean>;
  spaces?: ContextDependingValue<boolean>;
  table?: ContextDependingValue<boolean>;
  tableOptions?: ContextDependingValue<TableOptions>;
}

export interface CheeseConfigEffective {
  allColorsDisabled: boolean;
  autoColorizeObject: boolean;
  colorOverride: CheeseColors;
  dateFormat: string;
  depth: number;
  escapeWhitespaces: boolean;
  forceNewlines: boolean;
  formatMessage?: FormatMessageFn;
  logLevelEnabled?: LogLevelEnabledFn;
  maxArrayLength: number;
  maxStringLength: number;
  messagePrefix: string;
  messageSuffix: string;
  showCheeseIcon: boolean;
  showDate: boolean;
  showLogLevel: boolean;
  showOrigin: boolean;
  spaces: boolean;
  table: boolean;
  tableOptions: TableOptions;
}

export const cheeseConfigAllowedKeys = [
  "allColorsDisabled",
  "autoColorizeObject",
  "colorOverride",
  "dateFormat",
  "depth",
  "escapeWhitespaces",
  "formatMessage",
  "logLevelEnabled",
  "maxArrayLength",
  "maxStringLength",
  "messagePrefix",
  "messageSuffix",
  "reportGlobalConfigChange",
  "reportInitialization",
  "showCheeseIcon",
  "showDate",
  "showLogLevel",
  "showOrigin",
  "spaces",
  "table",
  "tableOptions",
];
