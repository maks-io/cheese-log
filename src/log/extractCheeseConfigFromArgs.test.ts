import { LogLevel } from "../types/LogLevel";
import { extractCheeseConfigFromArgs } from "./extractCheeseConfigFromArgs";

describe("extractCheeseConfigFromArgs", () => {
  it("accepts forceNewlines as a valid config key", () => {
    const cheeseConfig = { forceNewlines: true };

    expect(
      extractCheeseConfigFromArgs(LogLevel.info, "hello world", cheeseConfig),
    ).toEqual(cheeseConfig);
  });
});
