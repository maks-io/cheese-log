import { iterateAndModify, NestedObject } from "./iterateAndModify";

const getPlaceholder = (numberOfRemovedChars: number) =>
  `[...and ${numberOfRemovedChars} more characters]`;

export const shortenStringsInObject = (
  objectToModify: NestedObject,
  maxLength: number
): object => {
  if (!objectToModify) {
    return objectToModify;
  }

  const selector = (_, value) =>
    typeof value === "string" && value.length > maxLength;
  const modifier =
    maxLength === 0
      ? (value: any) => `[String(${value.length})]`
      : (value: any) =>
          `${value.substring(0, maxLength)}${getPlaceholder(
            value.length - maxLength
          )}`;

  let c;
  if (typeof objectToModify !== "object") {
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
