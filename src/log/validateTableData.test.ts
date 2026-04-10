import {
  mapTableValidationResultToMsg,
  validateTableData,
} from "./validateTableData";

describe("validateTableData", () => {
  it("rejects non-object rows", () => {
    expect(validateTableData([null])).toBe("NON_OBJECT_ENTRY");
    expect(validateTableData(["hello"])).toBe("NON_OBJECT_ENTRY");
    expect(mapTableValidationResultToMsg("NON_OBJECT_ENTRY")).toBe(
      "All table data entries must be objects",
    );
  });
});
