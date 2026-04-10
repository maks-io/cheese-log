import { extractFirstRelevantStackFrame } from "./getStackTrace";

describe("extractFirstRelevantStackFrame", () => {
  it("skips the error header and internal cheese-log stack frames", () => {
    const stack = [
      "Error: boom",
      "    at getStackTrace (/Users/me/project/node_modules/cheese-log/build/bundle.js:1:1)",
      "    at Object.log (cheese-log@4.0.1)",
      "    at myApp (/Users/me/project/src/app.ts:10:2)",
    ].join("\n");

    expect(extractFirstRelevantStackFrame(stack)).toBe(
      "at myApp (/Users/me/project/src/app.ts:10:2)",
    );
  });

  it("supports stacks that do not begin with an error header", () => {
    const stack = [
      "    at Object.log (cheese-log@4.0.1)",
      "    at myApp (/Users/me/project/src/app.ts:10:2)",
    ].join("\n");

    expect(extractFirstRelevantStackFrame(stack)).toBe(
      "at myApp (/Users/me/project/src/app.ts:10:2)",
    );
  });
});
