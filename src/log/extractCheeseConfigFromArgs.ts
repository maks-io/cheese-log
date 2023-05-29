import { LogLevel } from "../types/LogLevel";
import { CheeseConfig, cheeseConfigAllowedKeys } from "../types/CheeseConfig";
import { ContextDependentCheeseConfig } from "../types/ContextDependentCheeseConfig";

export const extractCheeseConfigFromArgs = (
  logLevel: LogLevel,
  ...args: any[]
): CheeseConfig | ContextDependentCheeseConfig | null => {
  try {
    const cheeseConfig: CheeseConfig = args[args.length - 1];
    if (
      (typeof cheeseConfig === "object" &&
        Object.keys(cheeseConfig).some(
          (key) => !cheeseConfigAllowedKeys.includes(key)
        )) ||
      (typeof cheeseConfig !== "object" && typeof cheeseConfig !== "function")
    ) {
      console.warn(
        `It seems like you didn't provide a proper CheeseConfig object - calling cheese.${logLevel}_() expects a valid CheeseConfig as the last config!`
      );
      return null;
    }
    return cheeseConfig;
  } catch (e) {
    return null;
  }
};
