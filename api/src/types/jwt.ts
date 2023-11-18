import { djwt } from "../deps.ts";

interface JwtPayload extends djwt.Payload {
  username: string;
}

export type { JwtPayload };
