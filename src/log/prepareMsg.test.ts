import { prepareMsg } from "./prepareMsg";
import { LogLevel } from "../types/LogLevel";
import { FormatMessageFn } from "../types/FormatMessageFn";

const who = {
  browserName: "Chrome",
  isServerApp: false,
} as any;

const captureFormatMessage: FormatMessageFn = (
  message,
  _who,
  showLogLevel,
  _logLevel,
  _millisecondsSince1970,
  showDate,
  _dateFormat,
  _showOrigin,
  _autoColorizeObject,
  showCheeseIcon,
  _allColorsDisabled,
  _colorOverride,
  messagePrefix,
  messageSuffix,
) =>
  JSON.stringify({
    message,
    messagePrefix,
    messageSuffix,
    showDate,
    showLogLevel,
    showCheeseIcon,
  });

describe("prepareMsg", () => {
  it("merges function-based global config with object overrides", () => {
    const result = prepareMsg(
      LogLevel.info,
      () => ({
        formatMessage: captureFormatMessage,
        messagePrefix: "global",
        messageSuffix: " global",
        reportGlobalConfigChange: false,
        reportInitialization: false,
        showCheeseIcon: false,
        showDate: false,
        showLogLevel: false,
      }),
      {
        messageSuffix: " override",
      },
      who,
      undefined,
      false,
      "hello world",
    );

    expect(JSON.parse(result)).toEqual({
      message: "hello world",
      messagePrefix: "global",
      messageSuffix: " override",
      showDate: false,
      showLogLevel: false,
      showCheeseIcon: false,
    });
  });
});
