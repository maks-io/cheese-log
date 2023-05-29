import { Who } from "who-am-i-now";
import { CHEESE_ICON } from "../log/cheeseIcon";

const prefix = `[${CHEESE_ICON} cheese-log]`;

export const reportInitialization = (who: Who): void => {
  console.log(prefix, "Properly initialized.");
  console.log(
    prefix,
    "This logger can be configured differently based on where it is running.\n                The following properties about the current environment were found:\n",
    who
  );
};
