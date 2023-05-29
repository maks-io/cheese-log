import { LogLevel } from "../types/LogLevel";

export const warnUninitialized = (logLevel: LogLevel) =>
  console.warn(
    `Cheese log would like to print a .${logLevel}() message, but it has not been initialized yet - please use cheese.config() to do so!`
  );
