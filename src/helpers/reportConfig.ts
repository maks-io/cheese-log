import { CHEESE_ICON } from "../log/cheeseIcon";
import { CheeseConfig } from "../types/CheeseConfig";

const prefix = `[${CHEESE_ICON} cheese-log]`;

export const reportConfig = (config: CheeseConfig): void => {
  const printableConfig = {};
  Object.keys(config).forEach((prop) => {
    const value = config[prop];
    if (typeof value !== "function") {
      printableConfig[prop] = value;
    } else {
      printableConfig[prop] = value.toString();
    }
  });

  console.log(prefix, "current config:");
  console.log(printableConfig);
};
