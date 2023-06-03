import util from "util";
import { bgCyan, bgGreen, bgLightRed, white } from "ansicolor";
import { getTextColorFn } from "./getTextColorFn";
import { getBgColorFn } from "./getBgColorFn";
import { shortenStringsInObject } from "../helpers/shortenStringsInObject";
import { shortenArraysInObject } from "../helpers/shortenArraysInObject";
import { CheeseColors } from "../types/CheeseColors";

export const processOneArg = (
  arg: any,
  index: number,
  nrOfArgs: number,
  maxStringLength: number,
  maxArrayLength: number,
  spaces: boolean,
  table: boolean,
  depth: number,
  allColorsDisabled: boolean,
  colorOverridePredefined: CheeseColors,
  colorOverride: CheeseColors,
  autoColorizeObject: boolean,
  escapeWhitespaces: boolean
): string => {
  const argWithShortenedStrings =
    maxStringLength !== undefined
      ? shortenStringsInObject(arg, maxStringLength)
      : arg;

  const argWithShortenedArrays =
    maxArrayLength !== undefined
      ? shortenArraysInObject(argWithShortenedStrings, maxArrayLength)
      : arg;

  const isFirst = index === 0;
  const isLast = index === nrOfArgs - 1;
  const isString = typeof arg === "string";
  const isObject = typeof arg === "object";
  const isArray = Array.isArray(arg);

  let inspectedObject: string = util.inspect(argWithShortenedArrays, {
    colors:
      allColorsDisabled || colorOverridePredefined || colorOverride
        ? false
        : isObject && autoColorizeObject,
    depth,
    compact: true,
  });

  if (!escapeWhitespaces) {
    inspectedObject = inspectedObject
      .replace(/\\n/g, "\n")
      .replace(/\\f/g, "\f")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t");
  }

  const highlightingOpeningChar = allColorsDisabled ? "[" : "";
  const highlightingClosingChar = allColorsDisabled ? "]" : "";

  if (maxStringLength !== undefined) {
    const colorFn = allColorsDisabled
      ? (s) => s
      : colorOverride || colorOverridePredefined
      ? (s) => {
          return getBgColorFn(colorOverride || colorOverridePredefined)(
            white(s)
          );
        }
      : (s) => bgGreen(white(s));

    if (maxStringLength === 0) {
      inspectedObject = inspectedObject.replace(
        /\[String\((\d+?)\)]/g,
        colorFn(`[String($1)]`)
      );
    } else {
      inspectedObject = inspectedObject.replace(
        /\[...and (\d+?) more characters]/g,
        colorFn(
          `${highlightingOpeningChar}...and $1 more characters${highlightingClosingChar}`
        )
      );
    }
  }

  if (maxArrayLength !== undefined) {
    const colorFn = allColorsDisabled
      ? (s) => s
      : colorOverride || colorOverridePredefined
      ? (s) => {
          return getBgColorFn(colorOverride || colorOverridePredefined)(
            white(s)
          );
        }
      : (s) => bgLightRed(white(s));

    if (maxArrayLength === 0) {
      inspectedObject = inspectedObject.replace(
        /'\[Array\((\d+?)\)]'/g,
        colorFn(`[Array($1)]`)
      );
    } else {
      inspectedObject = inspectedObject.replace(
        /'\[...and (\d+?) more elements]'/g,
        colorFn(
          `${highlightingOpeningChar}...and $1 more elements${highlightingClosingChar}`
        )
      );
    }
  }

  const objectColorFn = allColorsDisabled ? (s) => s : (s) => bgCyan(white(s));
  inspectedObject = inspectedObject.replace(
    /\[Object]/g,
    objectColorFn("[Object]")
  );

  const textColorFn = getTextColorFn(
    allColorsDisabled || (isObject && !autoColorizeObject)
      ? undefined
      : colorOverridePredefined ?? colorOverride
  );
  return (
    ((isObject || isArray) && !isFirst ? "\n" : isFirst ? "" : " ") +
    textColorFn(
      isString
        ? inspectedObject.substring(1, inspectedObject.length - 1)
        : inspectedObject
    ) +
    (isLast ? "\n" : "")
  );
};
