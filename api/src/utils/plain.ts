function ignoreError<T>(func: () => T) {
  try {
    return func();
  } catch (_err) {
    return undefined;
  }
}

async function asyncIgnoreError<T>(func: () => Promise<T>) {
  try {
    return await func();
  } catch (_err) {
    return undefined;
  }
}

/**
 * Returns an ISO 8601 datetime string with timezone offset.
 * @param timestamp Timestamp in milliseconds.
 * @param offset Timezone offset in minutes.
 * @returns ISO 8601 datetime string.
 */
function iso8601WithOffset(timestamp: number, offset: number) {
  if (Number.isNaN(offset)) {
    throw new Error("Offset is NaN.");
  }
  const date = new Date(timestamp + offset * 60 * 1000);
  if (offset === 0) {
    return date.toISOString();
  }
  const offsetSymbol = offset > 0 ? "+" : "-";
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;
  return date.toISOString().replace(
    "Z",
    `${offsetSymbol}${offsetHours < 10 ? "0" : ""}${offsetHours}:${
      offsetMinutes < 10 ? "0" : ""
    }${offsetMinutes}`,
  );
}

export { asyncIgnoreError, ignoreError, iso8601WithOffset };
