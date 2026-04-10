declare module "string-table" {
  const stringTable: {
    create: (
      data: ReadonlyArray<Record<string, unknown>>,
      options?: unknown,
    ) => string;
  };

  export default stringTable;
}

declare module "util" {
  export function inspect(
    value: unknown,
    options?: Record<string, unknown>,
  ): string;

  const util: {
    inspect: typeof inspect;
  };

  export default util;
}
