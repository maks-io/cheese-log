import { Who } from "who-am-i-now";
import { LogLevel } from "./LogLevel";
import { CheeseColors } from "./CheeseColors";
import { FormatMessage } from "./FormatMessage";
import { TableOptions } from "./TableOptions";

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
  tableOptions?: ContextDependingValue<TableOptions>;
  formatMessage?: FormatMessage;
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
  tableOptions: TableOptions;
  formatMessage?: FormatMessage;
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
  "tableOptions",
  "formatMessage",
];
