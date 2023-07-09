import { LogLevel } from "./LogLevel";
import { CheeseColors } from "./CheeseColors";
import { CheeseConfig } from "./CheeseConfig";
import { ContextDependentCheeseConfig } from "./ContextDependentCheeseConfig";

type LogFn = `${LogLevel}`;
type LogFnPrepended = `_${LogLevel}`;
type LogFnAppended = `${LogLevel}_`;
type LogFnColored = `${LogLevel}${CheeseColors}`;
type LogFnColoredPrepended = `_${LogFnColored}`;
type LogFnColoredAppended = `${LogFnColored}_`;
type LogFnTable = `${LogLevel}Table`;
type LogFnTablePrepended = `_${LogFnTable}`;
type LogFnTableAppended = `${LogFnTable}_`;

type TableData<T extends object> = T[];

export type CheeseLogBase = {
  config: (cheeseConfig: CheeseConfig | ContextDependentCheeseConfig) => void;
  printConfig: () => void;
};

type CheeseLogFns = {
  [logFn in LogFn]: (...args: any[]) => void;
};
type CheeseLogFnsPrepended = {
  [logFn in LogFnPrepended]: (
    cheeseConfig: CheeseConfig,
    ...args: any[]
  ) => void;
};
type CheeseLogFnsAppended = {
  [logFn in LogFnAppended]: (...args: [...any, CheeseConfig]) => void;
};
type CheeseLogFnsColored = {
  [logFn in LogFnColored]: (...args: any[]) => void;
};
type CheeseLogFnsColoredPrepended = {
  [logFn in LogFnColoredPrepended]: (
    cheeseConfig: CheeseConfig,
    ...args: any[]
  ) => void;
};
type CheeseLogFnsColoredAppended = {
  [logFn in LogFnColoredAppended]: (...args: [...any, CheeseConfig]) => void;
};
type CheeseLogFnsTable = {
  [logFn in LogFnTable]: <T extends object>(...args: TableData<T>[]) => void;
};
type CheeseLogFnsTablePrepended = {
  [logFn in LogFnTablePrepended]: <T extends object>(
    cheeseConfig: CheeseConfig,
    ...args: TableData<T>[]
  ) => void;
};
type CheeseLogFnsTableAppended = {
  [logFn in LogFnTableAppended]: <T extends object>(
    ...args: [...TableData<T>, CheeseConfig]
  ) => void;
};

export type CheeseLog = CheeseLogBase &
  CheeseLogFns &
  CheeseLogFnsPrepended &
  CheeseLogFnsAppended &
  CheeseLogFnsTable &
  CheeseLogFnsTablePrepended &
  CheeseLogFnsTableAppended &
  CheeseLogFnsColored &
  CheeseLogFnsColoredPrepended &
  CheeseLogFnsColoredAppended;
