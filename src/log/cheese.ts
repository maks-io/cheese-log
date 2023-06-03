import WhoAmINow, { Who } from "who-am-i-now";
import { CheeseConfig } from "../types/CheeseConfig";
import { LogLevel } from "../types/LogLevel";
import { warnUninitialized } from "../helpers/warnUninitialized";
import { cheeseConfigDefault } from "./cheeseConfigDefault";
import { prepareMsg } from "./prepareMsg";
import { reportInitialization } from "../helpers/reportInitialization";
import { extractCheeseConfigFromArgs } from "./extractCheeseConfigFromArgs";
import { CheeseColors } from "../types/CheeseColors";
import { capitalizeExtra } from "capitalize-lightweight";
import { CheeseLog, CheeseLogBase } from "../types/Cheese";
import { ContextDependentCheeseConfig } from "../types/ContextDependentCheeseConfig";

const who: Who = WhoAmINow();

let initialized: boolean = false;

let globalCheeseConfig: CheeseConfig | ContextDependentCheeseConfig;

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
        globalCheeseConfig,
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
      prepareMsg(logLevel, cheeseConfig, who, colorOverride, useTable, ...args)
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
      prepareMsg(logLevel, cheeseConfig, who, colorOverride, useTable, ...args)
    );
  };

const cheeseLogBase: CheeseLogBase = {
  config: (cheeseConfig: CheeseConfig | ContextDependentCheeseConfig) => {
    globalCheeseConfig =
      typeof cheeseConfig === "function"
        ? cheeseConfig
        : { ...cheeseConfigDefault, ...cheeseConfig };

    initialized = true;

    reportInitialization(who);
  },
};

const cheeseLogFunctions = {};

const colorValues = ["", ...Object.keys(CheeseColors)];

Object.values(LogLevel).forEach((logLevel) => {
  // add color functions:
  colorValues.forEach((colorValue) => {
    const key = `${logLevel}${capitalizeExtra(colorValue)}`;
    const chosenColor: undefined | CheeseColors =
      colorValue === "" ? undefined : (colorValue as CheeseColors);
    cheeseLogFunctions[key] = logWithGlobalConfig(logLevel, chosenColor);
    cheeseLogFunctions[`_${key}`] = logWithPrependedConfig(
      logLevel,
      chosenColor
    );
    cheeseLogFunctions[`${key}_`] = logWithAppendedConfig(
      logLevel,
      chosenColor
    );
  });

  // add table functions:
  const key = `${logLevel}Table`;
  cheeseLogFunctions[key] = logWithGlobalConfig(logLevel, undefined, true);
  cheeseLogFunctions[`_${key}`] = logWithPrependedConfig(
    logLevel,
    undefined,
    true
  );
  cheeseLogFunctions[`${key}_`] = logWithAppendedConfig(
    logLevel,
    undefined,
    true
  );
});

const cheese: CheeseLog = {
  ...cheeseLogBase,
  ...cheeseLogFunctions,
} as CheeseLog;

export default cheese;
