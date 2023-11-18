import type { JwtPayload } from "../types/jwt.ts";
import { oak } from "../deps.ts";
import { verifyJwt } from "../utils/auth.ts";

interface JwtState {
  jwt: {
    token: string;
    payload: JwtPayload;
  };
}

function jwt(): oak.Middleware<JwtState> {
  return async (ctx, next) => {
    // get token from headers or search params
    const token = ctx.request.headers.get("x-auth-token") ||
      ctx.request.url.searchParams.get("auth_token");
    if (!token) {
      ctx.response.status = 401;
      return;
    }
    // verify token
    const payload = await verifyJwt(token);
    if (!payload) {
      ctx.response.status = 403;
      return;
    }
    // set ctx.state
    ctx.state.jwt = {
      token,
      payload,
    };
    // next
    await next();
  };
}

export default jwt;
