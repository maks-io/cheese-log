type ActualValue = string | number | Record<string, number> | null | undefined;

export type NestedObject =
  | {
      [name: string]: ActualValue | NestedObject | NestedObject[];
    }
  | NestedObject[];

export const iterateAndModify = (
  o: NestedObject,
  selector: (key: string, value: any) => boolean,
  modifier: (value: any) => any
): NestedObject => {
  Object.keys(o).forEach(function (key: string) {
    if (!o[key]) {
      return;
    }
    if (typeof o[key] === "string" || typeof o[key] === "number") {
      if (selector(key as string, o[key])) {
        o[key] = modifier(o[key] as string | number);
      }
    } else if (typeof o[key] === "object") {
      if (selector(key as string, o[key])) {
        o[key] = modifier(o[key] as any);
      } else if (Array.isArray(o[key])) {
        (o[key] as NestedObject[]).forEach((k) => {
          iterateAndModify(k, selector, modifier);
        });
      } else {
        iterateAndModify(o[key] as NestedObject, selector, modifier);
      }
    } else {
      // do nothing for other cases
    }
  });
  return o;
};
