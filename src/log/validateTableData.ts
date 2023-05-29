type TableValidationResult =
  | "NO_ARRAY"
  | "EMPTY_ARRAY"
  | "KEYS_NOT_CONSISTENT"
  | "OK";

export const validateTableData = (someData: any): TableValidationResult => {
  if (!Array.isArray(someData)) {
    return "NO_ARRAY";
  }
  if (someData.length === 0) {
    return "EMPTY_ARRAY";
  }
  const keysOfFirstEntry = Object.keys(someData[0]);
  for (let e of someData) {
    if (JSON.stringify(Object.keys(e)) !== JSON.stringify(keysOfFirstEntry)) {
      return "KEYS_NOT_CONSISTENT";
    }
  }

  return "OK";
};

export const mapTableValidationResultToMsg = (
  result: TableValidationResult
): string => {
  if (result === "NO_ARRAY") {
    return "Table data must be an array";
  } else if (result === "EMPTY_ARRAY") {
    return "Table data array must have at least one data entry";
  } else if (result === "KEYS_NOT_CONSISTENT") {
    return "All table data entries must have the same set of keys";
  }
  return "";
};
