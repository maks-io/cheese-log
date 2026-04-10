type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type NestedValue =
  | Primitive
  | {
      [name: string]: NestedValue;
    }
  | NestedValue[];

export type NestedObject =
  | {
      [name: string]: NestedValue;
    }
  | NestedValue[];

const isObjectLike = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const modifyNestedValue = (
  value: NestedValue,
  selector: (key: string, value: unknown) => boolean,
  modifier: (value: unknown) => unknown,
  key = "",
): NestedValue => {
  if (selector(key, value)) {
    return modifier(value) as NestedValue;
  }

  if (Array.isArray(value)) {
    return value.map((entry) =>
      modifyNestedValue(entry as NestedValue, selector, modifier),
    );
  }

  if (isObjectLike(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        modifyNestedValue(childValue as NestedValue, selector, modifier, childKey),
      ]),
    ) as NestedObject;
  }

  return value;
};

export const iterateAndModify = (
  value: NestedObject,
  selector: (key: string, value: unknown) => boolean,
  modifier: (value: unknown) => unknown,
): NestedObject => modifyNestedValue(value, selector, modifier) as NestedObject;
