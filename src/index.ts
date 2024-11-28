import { Who } from "who-am-i-now";
import chalk from "chalk";
import cheese from "./log/cheese";
import { getTimestamp } from "./helpers/getTimestamp";
import { getStackTrace } from "./log/getStackTrace";
import { CheeseColors } from "./types/CheeseColors";
import { CheeseConfig } from "./types/CheeseConfig";
import { FormatMessageFn } from "./types/FormatMessageFn";
import { ContextDependentCheeseConfig } from "./types/ContextDependentCheeseConfig";
import { LogLevel } from "./types/LogLevel";

export { cheese, CheeseColors, LogLevel, getStackTrace, getTimestamp, chalk };

export type {
  CheeseConfig,
  ContextDependentCheeseConfig,
  FormatMessageFn,
  Who,
};
