import { CHEESE_ICON } from "../log/cheeseIcon";

const prefix = `[${CHEESE_ICON} cheese-log]`;

export const reportGlobalConfigChange = (): void => {
  console.log(
    prefix,
    "Global config has been changed. This might be a mistake."
  );
};
