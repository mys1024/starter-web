import { colors } from "../deps.ts";
import { iso8601WithOffset } from "./plain.ts";
import { TIMEZONE_OFFSET } from "../config.ts";

function info(message: string) {
  console.info(
    colors.white(colors.bgBlue(" INFO ")),
    colors.gray(iso8601WithOffset(Date.now(), TIMEZONE_OFFSET)),
    message,
  );
}

function warn(message: string) {
  console.warn(
    colors.black(colors.bgYellow(" WARN ")),
    colors.gray(iso8601WithOffset(Date.now(), TIMEZONE_OFFSET)),
    message,
  );
}

function error(message: string) {
  console.error(
    colors.white(colors.bgRed(" ERR  ")),
    colors.gray(iso8601WithOffset(Date.now(), TIMEZONE_OFFSET)),
    message,
  );
}

function log(message: string) {
  console.log(
    colors.black(colors.bgWhite(" LOG  ")),
    colors.gray(iso8601WithOffset(Date.now(), TIMEZONE_OFFSET)),
    message,
  );
}

const output = {
  info,
  warn,
  error,
  log,
};

export default output;
