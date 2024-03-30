export const getStackTrace = () => {
  let stack: string = "";

  try {
    throw new Error("");
  } catch (error) {
    stack = error.stack || "";
  }

  const s: string[] = stack.split("\n").map(function (line) {
    return line.trim();
  });
  return s
    .splice(stack[0] == "Error" ? 2 : 1)
    .filter(
      (l) => !l.includes("cheese-log/") && !l.includes("cheese-log@"),
    )?.[0];
};
