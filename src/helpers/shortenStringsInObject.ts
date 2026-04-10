import { iterateAndModify, NestedObject } from "./iterateAndModify";

const getPlaceholder = (numberOfRemovedChars: number) =>
  `[...and ${numberOfRemovedChars} more characters]`;

export const shortenStringsInObject = (
  objectToModify: unknown,
  maxLength: number,
): unknown => {
  if (!objectToModify) {
    return objectToModify;
  }

  const selector = (_key: string, value: unknown) =>
    typeof value === "string" && value.length > maxLength;
  const modifier: (value: unknown) => unknown =
    maxLength === 0
      ? (value) => `[String(${String(value).length})]`
      : (value) =>
          `${String(value).substring(0, maxLength)}${getPlaceholder(
            String(value).length - maxLength
          )}`;

  if (typeof objectToModify === "string") {
    return selector("", objectToModify) ? modifier(objectToModify) : objectToModify;
  }

  if (typeof objectToModify !== "object") {
    return objectToModify;
  }

  return iterateAndModify(objectToModify as NestedObject, selector, modifier);
};
