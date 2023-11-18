import { oak } from "../deps.ts";
import jwt from "../middleware/jwt.ts";
import { getCount, increaseCount } from "../dao/count.ts";

const router = new oak.Router();

router.get("/", async (ctx) => {
  const count = await getCount();
  ctx.response.body = `Hello, the count is ${count}.`;
  increaseCount();
});

router.get("/me", jwt(), (ctx) => {
  ctx.response.body = `Hi, ${ctx.state.jwt.payload.username}!`;
});

export default router;
