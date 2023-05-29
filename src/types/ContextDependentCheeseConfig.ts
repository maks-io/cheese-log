import { Who } from "who-am-i-now";
import { CheeseConfig } from "./CheeseConfig";
import { LogLevel } from "./LogLevel";

export type ContextDependentCheeseConfig = (
  who: Who,
  logLevel: LogLevel
) => CheeseConfig;
