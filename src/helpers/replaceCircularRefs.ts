export const replaceCircularRefs = (value: any, cache: any): any => {
  cache = cache || new WeakSet();

  if (value && typeof value === "object") {
    if (cache.has(value)) return "[Circular]";

    cache.add(value);

    const o: Record<string, unknown> | unknown[] = Array.isArray(value) ? [] : {};
    for (const idx in value) {
      (o as Record<string, unknown>)[idx] = replaceCircularRefs(value[idx], cache);
    }

    cache.delete(value);
    return o;
  }

  return value;
};
