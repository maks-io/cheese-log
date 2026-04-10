const INTERNAL_FRAME_MARKERS = ["cheese-log/", "cheese-log@"];

export const extractFirstRelevantStackFrame = (
  stack: string | undefined,
): string | undefined => {
  if (!stack) {
    return undefined;
  }

  const lines = stack
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const stackFrames =
    lines[0]?.startsWith("Error") || lines[0]?.startsWith("TypeError")
      ? lines.slice(1)
      : lines;

  return stackFrames.find(
    (line) => !INTERNAL_FRAME_MARKERS.some((marker) => line.includes(marker)),
  );
};

export const getStackTrace = () => {
  try {
    throw new Error();
  } catch (error) {
    return extractFirstRelevantStackFrame(
      error instanceof Error ? error.stack : undefined,
    );
  }
};
