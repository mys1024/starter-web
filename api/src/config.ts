import { decodeBase64, loadDotEnv } from "./deps.ts";

// load .env
await loadDotEnv({ export: true });

const _TIMEZONE_OFFSET = getEnvVar("TIMEZONE_OFFSET", false);
const _JWT_KEY_PUBLIC = getEnvVar("JWT_KEY_PUBLIC", false);
const _JWT_KEY_PRIVATE = getEnvVar("JWT_KEY_PRIVATE", false);

/**
 * Timezone offset in minutes compared to UTC time.
 */
const TIMEZONE_OFFSET = Number.parseInt(
  _TIMEZONE_OFFSET || "0",
);

/**
 * The ES256 public key for JWT.
 */
const JWT_KEY_PUBLIC = _JWT_KEY_PUBLIC
  ? await crypto.subtle.importKey(
    "spki",
    decodeBase64(_JWT_KEY_PUBLIC),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["verify"],
  )
  : undefined;

/**
 * The ES256 private key for JWT.
 */
const JWT_KEY_PRIVATE = _JWT_KEY_PRIVATE
  ? await crypto.subtle.importKey(
    "pkcs8",
    decodeBase64(_JWT_KEY_PRIVATE),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"],
  )
  : undefined;

/**
 * A helper for getting environment variable.
 */
function getEnvVar<REQUIRED extends boolean>(
  key: string,
  required: REQUIRED,
) {
  const envVar = Deno.env.get(key);
  if (required && envVar === undefined) {
    throw new Error(`Environment variable "${key}" is required.`);
  }
  return envVar as REQUIRED extends true ? string : string | undefined;
}

export { JWT_KEY_PRIVATE, JWT_KEY_PUBLIC, TIMEZONE_OFFSET };
