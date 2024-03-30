import dayjs from "dayjs";
import { Who } from "who-am-i-now";
import { LogLevel } from "../types/LogLevel";
import { CheeseConfig, CheeseConfigEffective } from "../types/CheeseConfig";
import { CheeseColors } from "../types/CheeseColors";
import { ContextDependentCheeseConfig } from "../types/ContextDependentCheeseConfig";
import { turnArgsIntoReadymadeString } from "./turnArgsIntoReadymadeString";

export const prepareMsg = (
  logLevel: LogLevel,
  globalCheeseConfig: CheeseConfig | ContextDependentCheeseConfig,
  configOverride: CheeseConfig | ContextDependentCheeseConfig,
  who: Who,
  colorOverridePredefined?: CheeseColors,
  useTable = false,
  ...args: any[]
): string => {
  const millisecondsSince1970 = dayjs().valueOf();

  const resultingCheeseConfig: CheeseConfig =
    typeof configOverride === "function"
      ? { ...globalCheeseConfig, ...configOverride(who, logLevel) }
      : { ...globalCheeseConfig, ...configOverride };

  const getEffectiveConfigProp = (propName: string) =>
    typeof resultingCheeseConfig[propName] === "function"
      ? resultingCheeseConfig[propName](who, logLevel)
      : resultingCheeseConfig[propName];

  const resultingCheeseConfigEffective: CheeseConfigEffective = {
    allColorsDisabled: getEffectiveConfigProp("allColorsDisabled"),
    autoColorizeObject: getEffectiveConfigProp("autoColorizeObject"),
    colorOverride: getEffectiveConfigProp("colorOverride"),
    dateFormat: getEffectiveConfigProp("dateFormat"),
    depth: getEffectiveConfigProp("depth"),
    escapeWhitespaces: getEffectiveConfigProp("escapeWhitespaces"),
    forceNewlines: getEffectiveConfigProp("forceNewlines"),
    formatMessage: resultingCheeseConfig.formatMessage,
    maxArrayLength: getEffectiveConfigProp("maxArrayLength"),
    maxStringLength: getEffectiveConfigProp("maxStringLength"),
    messagePrefix: getEffectiveConfigProp("messagePrefix"),
    messageSuffix: getEffectiveConfigProp("messageSuffix"),
    showCheeseIcon: getEffectiveConfigProp("showCheeseIcon"),
    showDate: getEffectiveConfigProp("showDate"),
    showLogLevel: getEffectiveConfigProp("showLogLevel"),
    showOrigin: getEffectiveConfigProp("showOrigin"),
    spaces: getEffectiveConfigProp("spaces"),
    table: useTable || getEffectiveConfigProp("table"),
    tableOptions: getEffectiveConfigProp("tableOptions"),
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
    messagePrefix,
    messageSuffix,
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
      tableOptions,
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
    colorOverridePredefined ?? colorOverride,
    messagePrefix,
    messageSuffix,
  );
};
