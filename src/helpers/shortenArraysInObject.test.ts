import { shortenArraysInObject } from "./shortenArraysInObject";

describe("shortenArraysInObject", () => {
  it("does not mutate nested input and shortens nested arrays of primitives", () => {
    const original = {
      nested: {
        values: [1, 2, 3],
      },
      items: {
        matrix: [[1, 2, 3]],
        values: [1, 2, 3],
      },
    };

    const result = shortenArraysInObject(original, 1);

    expect(original).toEqual({
      nested: {
        values: [1, 2, 3],
      },
      items: {
        matrix: [[1, 2, 3]],
        values: [1, 2, 3],
      },
    });
    expect(result).toEqual({
      nested: {
        values: [1, "[...and 2 more elements]"],
      },
      items: {
        matrix: [[1, "[...and 2 more elements]"]],
        values: [1, "[...and 2 more elements]"],
      },
    });
  });
});
