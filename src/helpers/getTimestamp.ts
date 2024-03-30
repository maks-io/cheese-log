import dayjs from "dayjs";

export const getTimestamp = (
  dateFormat: string,
  millisecondsSince1970?: number,
): string =>
  (millisecondsSince1970 === undefined
    ? dayjs()
    : dayjs(millisecondsSince1970, "x")
  ).format(dateFormat);
