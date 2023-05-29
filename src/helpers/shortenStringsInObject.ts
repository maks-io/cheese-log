import { iterateAndModify, NestedObject } from "./iterateAndModify";

const getPlaceholder = (numberOfRemovedChars: number) =>
  `[...and ${numberOfRemovedChars} more characters]`;

export const shortenStringsInObject = (
  objectToModify: NestedObject,
  maxLength: number
): object => {
  const selector = (key, value) =>
    typeof value === "string" && value.length > maxLength;
  const modifier =
    maxLength === 0
      ? (value: any) => `[String(${value.length})]`
      : (value: any) =>
          `${value.substring(0, maxLength)}${getPlaceholder(
            value.length - maxLength
          )}`;

  const isString = typeof objectToModify === "string";
  let c;
  if (isString) {
    c = objectToModify;
  } else {
    c = Array.isArray(objectToModify) ? [] : {};
    Object.assign(c, objectToModify);
  }
  if (selector("", c)) {
    c = modifier(c);
    if (maxLength === 0) {
      return c;
    }
  }

  return iterateAndModify(c, selector, modifier);
};
