import WhoAmINow, { Who } from "who-am-i-now";
import { CheeseConfig, CheeseConfigEffective } from "../types/CheeseConfig";
import { LogLevel } from "../types/LogLevel";
import { warnUninitialized } from "../helpers/warnUninitialized";
import { cheeseConfigDefault } from "./cheeseConfigDefault";
import { prepareMsg } from "./prepareMsg";
import { reportInitialization } from "../helpers/reportInitialization";
import { reportGlobalConfigChange } from "../helpers/reportGlobalConfigChange";
import { nullFn } from "./nullFn";
import { extractCheeseConfigFromArgs } from "./extractCheeseConfigFromArgs";
import { CheeseColors } from "../types/CheeseColors";
import { capitalizeExtra } from "capitalize-lightweight";
import { CheeseLog, CheeseLogBase } from "../types/Cheese";
import { ContextDependentCheeseConfig } from "../types/ContextDependentCheeseConfig";
import { LogLevelEnabledFn } from "../types/LogLevelEnabledFn";
import { reportConfig } from "../helpers/reportConfig";

const who: Who = WhoAmINow();

let initialized: boolean = false;

let cheese: CheeseLog;

let globalCheeseConfig: CheeseConfig | ContextDependentCheeseConfig;

const cheeseLogFunctions = {};

const getGlobalCheeseConfigEffective = (): CheeseConfig => ({
  ...cheeseConfigDefault,
  ...(typeof globalCheeseConfig === "function"
    ? globalCheeseConfig(who, LogLevel.log) // logLevel doesn't matter for the reporting checks
    : globalCheeseConfig),
});

const cheeseLogBase: CheeseLogBase = {
  config: (cheeseConfig: CheeseConfig | ContextDependentCheeseConfig) => {
    globalCheeseConfig =
      typeof cheeseConfig === "function"
        ? cheeseConfig
        : { ...cheeseConfigDefault, ...cheeseConfig };

    const globalCheeseConfigEffective: CheeseConfig =
      getGlobalCheeseConfigEffective();

    initializeFunctions(globalCheeseConfigEffective.logLevelEnabled, cheese);

    if (!initialized) {
      if (globalCheeseConfigEffective.reportInitialization) {
        reportInitialization(who);
      }
    } else {
      if (globalCheeseConfigEffective.reportGlobalConfigChange) {
        reportGlobalConfigChange();
      }
    }
    initialized = true;
  },
  printConfig: () => {
    const currentConfig = getGlobalCheeseConfigEffective();
    reportConfig(currentConfig);
  },
};

const logWithGlobalConfig =
  (logLevel: LogLevel, colorOverride?: CheeseColors, useTable = false) =>
  (...args: any[]) => {
    if (!initialized) {
      warnUninitialized(logLevel);
      return;
    }
    console[logLevel](
      prepareMsg(
        logLevel,
        getGlobalCheeseConfigEffective(),
        {},
        who,
        colorOverride,
        useTable,
        ...args
      )
    );
  };

const logWithPrependedConfig =
  (logLevel: LogLevel, colorOverride?: CheeseColors, useTable = false) =>
  (cheeseConfig: CheeseConfig, ...args: any[]) => {
    if (!initialized) {
      warnUninitialized(logLevel);
      return;
    }
    console[logLevel](
      prepareMsg(
        logLevel,
        globalCheeseConfig,
        cheeseConfig,
        who,
        colorOverride,
        useTable,
        ...args
      )
    );
  };

const logWithAppendedConfig =
  (logLevel: LogLevel, colorOverride?: CheeseColors, useTable = false) =>
  (...args: [...any, CheeseConfig]) => {
    if (!initialized) {
      warnUninitialized(logLevel);
      return;
    }
    const cheeseConfig: CheeseConfig | ContextDependentCheeseConfig | null =
      extractCheeseConfigFromArgs(logLevel, ...args);
    if (!cheeseConfig) {
      return;
    }
    args.pop(); // <- remove config so that it doesn't get printed
    console[logLevel](
      prepareMsg(
        logLevel,
        globalCheeseConfig,
        cheeseConfig,
        who,
        colorOverride,
        useTable,
        ...args
      )
    );
  };

const colorValues = ["", ...Object.keys(CheeseColors)];

const initializeFunctions = (
  logLevelEnabledFn?: LogLevelEnabledFn,
  cheeseInstance?: CheeseLog
) => {
  const functionHolder = cheeseInstance ?? cheeseLogFunctions;

  Object.values(LogLevel).forEach((logLevel) => {
    const logLevelEnabled = !logLevelEnabledFn
      ? true
      : logLevelEnabledFn(logLevel);

    // add color functions:
    colorValues.forEach((colorValue) => {
      const key = `${logLevel}${capitalizeExtra(colorValue)}`;
      const chosenColor: undefined | CheeseColors =
        colorValue === "" ? undefined : (colorValue as CheeseColors);
      functionHolder[key] = !logLevelEnabled
        ? nullFn
        : logWithGlobalConfig(logLevel, chosenColor);
      functionHolder[`_${key}`] = !logLevelEnabled
        ? nullFn
        : logWithPrependedConfig(logLevel, chosenColor);
      functionHolder[`${key}_`] = !logLevelEnabled
        ? nullFn
        : logWithAppendedConfig(logLevel, chosenColor);
    });

    // add table functions:
    const key = `${logLevel}Table`;
    functionHolder[key] = !logLevelEnabled
      ? nullFn
      : logWithGlobalConfig(logLevel, undefined, true);
    functionHolder[`_${key}`] = !logLevelEnabled
      ? nullFn
      : logWithPrependedConfig(logLevel, undefined, true);
    functionHolder[`${key}_`] = !logLevelEnabled
      ? nullFn
      : logWithAppendedConfig(logLevel, undefined, true);
  });
};

initializeFunctions();

cheese = {
  ...cheeseLogBase,
  ...cheeseLogFunctions,
} as CheeseLog;

export default cheese;
