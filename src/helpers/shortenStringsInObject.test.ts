import { shortenStringsInObject } from "./shortenStringsInObject";

describe("shortenStringsInObject", () => {
  it("does not mutate nested input and shortens nested strings inside arrays", () => {
    const original = {
      nested: {
        text: "abcdefghij",
      },
      items: ["abcdefghij", { text: "abcdefghij" }],
    };

    const result = shortenStringsInObject(original, 4);

    expect(original).toEqual({
      nested: {
        text: "abcdefghij",
      },
      items: ["abcdefghij", { text: "abcdefghij" }],
    });
    expect(result).toEqual({
      nested: {
        text: "abcd[...and 6 more characters]",
      },
      items: [
        "abcd[...and 6 more characters]",
        { text: "abcd[...and 6 more characters]" },
      ],
    });
  });
});
