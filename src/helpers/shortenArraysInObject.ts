import { iterateAndModify, NestedObject } from "./iterateAndModify";

const getPlaceholder = (numberOfRemovedElements: number) =>
  `[...and ${numberOfRemovedElements} more elements]`;

export const shortenArraysInObject = (
  objectToModify: unknown,
  maxLength: number,
): unknown => {
  if (
    (typeof objectToModify !== "object" || !objectToModify) &&
    !Array.isArray(objectToModify)
  ) {
    return objectToModify;
  }
  const selector = (_key: string, value: unknown) =>
    Array.isArray(value) && value.length > maxLength;
  const modifier: (value: unknown) => unknown =
    maxLength === 0
      ? (value) => `[Array(${(value as any[]).length})]`
      : (value) => [
          ...(value as any[]).slice(0, maxLength),
          getPlaceholder((value as any[]).length - maxLength),
        ];

  return iterateAndModify(objectToModify as NestedObject, selector, modifier);
};
