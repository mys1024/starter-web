import { djwt } from "../deps.ts";
import { JWT_KEY_PRIVATE, JWT_KEY_PUBLIC } from "../config.ts";
import { asyncIgnoreError } from "./plain.ts";
import type { JwtPayload } from "../types/jwt.ts";

async function signJwt(
  ttl: number,
  payload: JwtPayload,
) {
  if (!JWT_KEY_PRIVATE) {
    throw new Error("environment variable JWT_KEY_PRIVATE is undefined.");
  }
  const now = Math.floor(Date.now() / 1000);
  return await djwt.create(
    { alg: "ES256", typ: "JWT" },
    {
      ...payload,
      nbf: now,
      exp: now + Math.floor(ttl),
    },
    JWT_KEY_PRIVATE,
  );
}

async function verifyJwt(jwt: string) {
  return await (asyncIgnoreError(async () => {
    if (!JWT_KEY_PUBLIC) {
      throw new Error("environment variable JWT_KEY_PUBLIC is undefined.");
    }
    return await djwt.verify(jwt, JWT_KEY_PUBLIC) as JwtPayload;
  }));
}

export { signJwt, verifyJwt };
