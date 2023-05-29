import { shortenStringsInObject } from "../helpers/shortenStringsInObject";
import util from "util";
import stringTable from "string-table";
import { getTextColorFn } from "./getTextColorFn";
import { CheeseColors } from "../types/CheeseColors";
import {
  mapTableValidationResultToMsg,
  validateTableData,
} from "./validateTableData";
import { processOneArg } from "./processOneArg";
import { TableOptions } from "../types/TableOptions";

export const turnArgsIntoReadymadeString = (
  args: any[],
  maxStringLength: number,
  maxArrayLength: number,
  spaces: boolean,
  table: boolean,
  depth: number,
  allColorsDisabled: boolean,
  colorOverridePredefined: CheeseColors,
  colorOverride: CheeseColors,
  autoColorizeObject: boolean,
  tableOptions: TableOptions
): string => {
  if (args.length === 0) {
    return "(logging empty message)";
  }

  const joiner = spaces ? " " : "";

  return args
    .map((arg, index) => {
      if (table) {
        const textColorFn = getTextColorFn(
          allColorsDisabled
            ? undefined
            : colorOverridePredefined ?? colorOverride
        );

        const tableValidationResult = validateTableData(arg);
        if (tableValidationResult !== "OK") {
          const errorMsg = `Table data at index ${index} not valid -> ${mapTableValidationResultToMsg(
            tableValidationResult
          )}`;
          return textColorFn(`\n(${errorMsg})\n`);
        }

        const tableDataPrepared = arg.map((tableEntry) => {
          const tableEntryPrepared = { ...tableEntry };
          Object.keys(tableEntryPrepared).forEach((tableEntryKey) => {
            tableEntryPrepared[tableEntryKey] = processOneArg(
              tableEntryPrepared[tableEntryKey],
              0,
              1,
              maxStringLength,
              maxArrayLength,
              spaces,
              table,
              depth,
              allColorsDisabled,
              colorOverridePredefined,
              colorOverride,
              autoColorizeObject
            );
            return tableEntryPrepared[tableEntryKey];
          });
          return tableEntryPrepared;
        });
        const readymadeTableString = `\n${stringTable.create(
          tableDataPrepared,
          tableOptions
        )}\n`;

        return textColorFn(readymadeTableString);
      }

      return processOneArg(
        arg,
        index,
        args.length,
        maxStringLength,
        maxArrayLength,
        spaces,
        table,
        depth,
        allColorsDisabled,
        colorOverridePredefined,
        colorOverride,
        autoColorizeObject
      );
    })
    .join(joiner);
};
