import dayjs from "dayjs";
import { Who } from "who-am-i-now";
import { cheeseConfigDefault } from "./cheeseConfigDefault";
import { LogLevel } from "../types/LogLevel";
import { CheeseConfig, CheeseConfigEffective } from "../types/CheeseConfig";
import { CheeseColors } from "../types/CheeseColors";
import { ContextDependentCheeseConfig } from "../types/ContextDependentCheeseConfig";
import { turnArgsIntoReadymadeString } from "./turnArgsIntoReadymadeString";

export const prepareMsg = (
  logLevel: LogLevel,
  usedCheeseConfig: CheeseConfig | ContextDependentCheeseConfig,
  who: Who,
  colorOverridePredefined?: CheeseColors,
  useTable = false,
  ...args: any[]
): string => {
  const millisecondsSince1970 = dayjs().valueOf();

  const resultingCheeseConfig: CheeseConfig =
    typeof usedCheeseConfig === "function"
      ? { ...cheeseConfigDefault, ...usedCheeseConfig(who, logLevel) }
      : { ...cheeseConfigDefault, ...usedCheeseConfig };

  const getEffectiveConfigProp = (propName: string) =>
    typeof resultingCheeseConfig[propName] === "function"
      ? resultingCheeseConfig[propName](who, logLevel)
      : resultingCheeseConfig[propName];

  const resultingCheeseConfigEffective: CheeseConfigEffective = {
    autoColorizeObject: getEffectiveConfigProp("autoColorizeObject"),
    depth: getEffectiveConfigProp("depth"),
    table: useTable || getEffectiveConfigProp("table"),
    spaces: getEffectiveConfigProp("spaces"),
    showLogLevel: getEffectiveConfigProp("showLogLevel"),
    showDate: getEffectiveConfigProp("showDate"),
    dateFormat: getEffectiveConfigProp("dateFormat"),
    showOrigin: getEffectiveConfigProp("showOrigin"),
    showCheeseIcon: getEffectiveConfigProp("showCheeseIcon"),
    maxArrayLength: getEffectiveConfigProp("maxArrayLength"),
    maxStringLength: getEffectiveConfigProp("maxStringLength"),
    colorOverride: getEffectiveConfigProp("colorOverride"),
    allColorsDisabled: getEffectiveConfigProp("allColorsDisabled"),
    escapeWhitespaces: getEffectiveConfigProp("escapeWhitespaces"),
    forceNewlines: getEffectiveConfigProp("forceNewlines"),
    tableOptions: getEffectiveConfigProp("tableOptions"),
    formatMessage: resultingCheeseConfig.formatMessage,
  };

  const {
    formatMessage,
    dateFormat,
    maxStringLength,
    maxArrayLength,
    showDate,
    showLogLevel,
    spaces,
    table,
    depth,
    autoColorizeObject,
    showCheeseIcon,
    colorOverride,
    showOrigin,
    allColorsDisabled,
    escapeWhitespaces,
    forceNewlines,
    tableOptions,
  } = resultingCheeseConfigEffective;

  return formatMessage(
    turnArgsIntoReadymadeString(
      args,
      maxStringLength,
      maxArrayLength,
      spaces,
      table,
      depth,
      allColorsDisabled,
      colorOverridePredefined,
      colorOverride,
      autoColorizeObject,
      escapeWhitespaces,
      forceNewlines,
      tableOptions
    ),
    who,
    showLogLevel,
    logLevel,
    millisecondsSince1970,
    showDate,
    dateFormat,
    showOrigin,
    autoColorizeObject,
    showCheeseIcon,
    allColorsDisabled,
    colorOverridePredefined ?? colorOverride
  );
};
