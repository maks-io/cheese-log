import dayjs from "dayjs";
import { Who } from "who-am-i-now";
import { LogLevel } from "../types/LogLevel";
import { CheeseConfig, CheeseConfigEffective } from "../types/CheeseConfig";
import { CheeseColors } from "../types/CheeseColors";
import { ContextDependentCheeseConfig } from "../types/ContextDependentCheeseConfig";
import { turnArgsIntoReadymadeString } from "./turnArgsIntoReadymadeString";
import { formatMessageDefault } from "./formatMessageDefault";

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

  const resolveCheeseConfig = (
    cheeseConfig: CheeseConfig | ContextDependentCheeseConfig,
  ): CheeseConfig =>
    typeof cheeseConfig === "function" ? cheeseConfig(who, logLevel) : cheeseConfig;

  const resultingCheeseConfig: CheeseConfig = {
    ...resolveCheeseConfig(globalCheeseConfig),
    ...resolveCheeseConfig(configOverride),
  };

  const resultingCheeseConfigRecord = resultingCheeseConfig as Record<
    string,
    unknown
  >;

  const getEffectiveConfigProp = (propName: string) => {
    const value = resultingCheeseConfigRecord[propName];
    return typeof value === "function" ? value(who, logLevel) : value;
  };

  const resultingCheeseConfigEffective: CheeseConfigEffective = {
    allColorsDisabled: getEffectiveConfigProp("allColorsDisabled") as boolean,
    autoColorizeObject: getEffectiveConfigProp("autoColorizeObject") as boolean,
    colorOverride: getEffectiveConfigProp("colorOverride") as
      | CheeseColors
      | undefined,
    dateFormat: getEffectiveConfigProp("dateFormat") as string,
    depth: getEffectiveConfigProp("depth") as number,
    escapeWhitespaces: getEffectiveConfigProp("escapeWhitespaces") as boolean,
    forceNewlines: getEffectiveConfigProp("forceNewlines") as boolean,
    formatMessage: resultingCheeseConfig.formatMessage ?? formatMessageDefault,
    maxArrayLength: getEffectiveConfigProp("maxArrayLength") as number,
    maxStringLength: getEffectiveConfigProp("maxStringLength") as number,
    messagePrefix: getEffectiveConfigProp("messagePrefix") as string | undefined,
    messageSuffix: getEffectiveConfigProp("messageSuffix") as string | undefined,
    showCheeseIcon: getEffectiveConfigProp("showCheeseIcon") as boolean,
    showDate: getEffectiveConfigProp("showDate") as boolean,
    showLogLevel: getEffectiveConfigProp("showLogLevel") as boolean,
    showOrigin: getEffectiveConfigProp("showOrigin") as boolean,
    spaces: getEffectiveConfigProp("spaces") as boolean,
    table: useTable || (getEffectiveConfigProp("table") as boolean),
    tableOptions: getEffectiveConfigProp("tableOptions") as any,
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
