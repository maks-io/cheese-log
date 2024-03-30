import { Who } from "who-am-i-now";
import cheese from "./log/cheese";
import { CheeseColors } from "./types/CheeseColors";
import { CheeseConfig } from "./types/CheeseConfig";
import { FormatMessageFn } from "./types/FormatMessageFn";
import { ContextDependentCheeseConfig } from "./types/ContextDependentCheeseConfig";
import { LogLevel } from "./types/LogLevel";

export { cheese, CheeseColors, LogLevel };
export type {
  CheeseConfig,
  ContextDependentCheeseConfig,
  FormatMessageFn,
  Who,
};
export default cheese;
