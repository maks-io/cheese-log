import { iterateAndModify, NestedObject } from "./iterateAndModify";

const getPlaceholder = (numberOfRemovedElements: number) =>
  `[...and ${numberOfRemovedElements} more elements]`;

export const shortenArraysInObject = (
  objectToModify: NestedObject,
  maxLength: number
): object => {
  if (typeof objectToModify !== "object" && !Array.isArray(objectToModify)) {
    return objectToModify;
  }
  const selector = (key, value) =>
    Array.isArray(value) && value.length > maxLength;
  const modifier =
    maxLength === 0
      ? (value: any[]) => `[Array(${value.length})]`
      : (value: any[]) => [
          ...value.slice(0, maxLength),
          getPlaceholder(value.length - maxLength),
        ];

  let c: any = Array.isArray(objectToModify) ? [] : {};
  Object.assign(c, objectToModify);
  if (selector("", c)) {
    c = modifier(c);
    if (maxLength === 0) {
      return c;
    }
  }

  return iterateAndModify(c, selector, modifier);
};
